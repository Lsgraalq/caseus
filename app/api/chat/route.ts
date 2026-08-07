import { geminiClient as ai } from '@/lib/gemini/client';
import { MODELS } from '@/lib/gemini/config';
import { createClient } from '@/lib/supabase/server';
import { geminiTools, handleToolCall } from '@/lib/gemini/tools';
import { systemPrompt } from '@/lib/gemini/systemPrompt';

export async function POST(req: Request) {
  try {
    const { messages, projectId } = await req.json();
    const supabase = await createClient();

    // 1. Save the latest user message to Supabase
    const lastMsg = messages[messages.length - 1];
    const prevMsg = messages.length >= 2 ? messages[messages.length - 2] : null;
    
    let contentToSave = lastMsg?.content || '';
    
    // Mask password if the previous message from assistant asked for one
    if (prevMsg && prevMsg.role === 'assistant' && (prevMsg.content.toLowerCase().includes('пароль') || prevMsg.content.toLowerCase().includes('password'))) {
      contentToSave = '*** [Пароль скрыт в целях безопасности] ***';
    }

    if (lastMsg && lastMsg.role === 'user') {
      await supabase.from('chat_messages').insert({
        project_id: projectId,
        role: 'user',
        content: contentToSave,
      });
    }

    // 2. Convert history to Gemini format
    const geminiHistory = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : m.role, // normalize to user/model
      parts: [{ text: m.content }],
    }));

    const currentMessage = lastMsg.content;

    // 3. Setup Streaming Response with Router -> Worker Architecture
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // --- Phase 1: Router (MODELS.ROUTER / gemini-flash-lite) ---
          let targetModel = MODELS.FLASH; // Default worker target
          try {
            console.log(`[Router] Evaluating prompt intent with: ${MODELS.ROUTER}`);
            const routerPrompt = `Analyze the user's latest message and select the best model to process it.
Respond ONLY with one word: "PRO" or "FLASH".
- Choose "PRO" if the user is asking for complex contract analysis, legal calculations, or deep strategic video planning.
- Choose "FLASH" for standard brief updating, duration/options selection, quick QA, or general assistant chat.

User message: "${currentMessage}"`;

            const routerResult = await ai.models.generateContent({
              model: MODELS.ROUTER,
              contents: routerPrompt,
            });

            const verdict = routerResult.text?.trim().toUpperCase();
            if (verdict?.includes('PRO')) {
              targetModel = MODELS.PRO;
            }
            console.log(`[Router] Decision: Route to ${targetModel}`);
          } catch (routerErr) {
            console.warn(`[Router] Failed (${MODELS.ROUTER}), defaulting to ${MODELS.FLASH}:`, routerErr);
            targetModel = MODELS.FLASH;
          }

          // --- Phase 2: Execution Worker (Chosen Model with Fallback) ---
          const workerConfig = {
            systemInstruction: systemPrompt,
            tools: geminiTools,
            temperature: 0.7,
          };

          // Fallback queue using exact available Gemini 3 model strings
          const fallbackModels = [
            targetModel,
            MODELS.FLASH,
            MODELS.ROUTER,
            'gemini-3.6-flash',
            'gemini-3.1-pro-preview',
            'gemini-3.5-flash',
            'gemini-3.5-flash-lite',
            'gemini-3.1-flash-lite',
          ].filter((val, idx, self) => self.indexOf(val) === idx);

          let fullAssistantMessage = "";
          let success = false;
          let lastError = null;

          for (const modelName of fallbackModels) {
            fullAssistantMessage = ""; // reset for each retry
            
            try {
              console.log(`[Worker] Starting chat stream with model: ${modelName}`);
              const chat = ai.chats.create({
                model: modelName,
                config: workerConfig,
                history: geminiHistory,
              });
              
              const responseStream = await chat.sendMessageStream({ message: currentMessage });
              const streamIterator = responseStream[Symbol.asyncIterator]();
              const firstChunkResult = await streamIterator.next();
              
              const processStream = async (iterator: any, initialChunk: any = null) => {
                async function* combinedGenerator() {
                  if (initialChunk && !initialChunk.done) {
                    yield initialChunk.value;
                  }
                  for await (const chunk of iterator) {
                    yield chunk;
                  }
                }

                for await (const chunk of combinedGenerator()) {
                  if (chunk.functionCalls && chunk.functionCalls.length > 0) {
                    for (const call of chunk.functionCalls) {
                      console.log(`[Worker Tool Call] ${call.name}`, call.args);
                      const result = await handleToolCall(call.name, call.args, projectId);

                      const toolEvent = `event: tool_call\ndata: ${JSON.stringify({ name: call.name, result })}\n\n`;
                      controller.enqueue(new TextEncoder().encode(toolEvent));

                      const nextStream = await chat.sendMessageStream({
                        message: [{ functionResponse: { name: call.name, response: result } }]
                      });

                      await processStream(nextStream[Symbol.asyncIterator]());
                      return; 
                    }
                  } else if (chunk.text) {
                    fullAssistantMessage += chunk.text;
                    const data = JSON.stringify({ text: chunk.text });
                    controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
                  }
                }
              };
              
              await processStream(streamIterator, firstChunkResult);
              
              success = true;
              console.log(`[Worker] Successfully completed processing with model: ${modelName}`);
              break; // Success! Exit the fallback loop.
            } catch (workerErr: any) {
              console.warn(`[Worker] Model ${modelName} failed during processing:`, workerErr.message || workerErr);
              lastError = workerErr;
            }
          }

          if (!success) {
            throw lastError || new Error("All worker models failed to process the chat stream.");
          }

          // 4. Save final assistant message to DB
          if (fullAssistantMessage.trim().length > 0) {
            await supabase.from('chat_messages').insert({
              project_id: projectId,
              role: 'model',
              content: fullAssistantMessage,
            });
          }

          controller.enqueue(new TextEncoder().encode("event: done\ndata: {}\n\n"));
          controller.close();
        } catch (e: any) {
          console.error("Gemini API Stream Error:", e);
          let cleanError = e.message || "Failed to process chat";
          if (cleanError.includes("429") || cleanError.includes("Quota")) {
            cleanError = "Quota exceeded (Too Many Requests). Please try again later or check your API key limits.";
          }
          const errorMsg = JSON.stringify({ error: cleanError });
          controller.enqueue(new TextEncoder().encode(`event: error\ndata: ${errorMsg}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
