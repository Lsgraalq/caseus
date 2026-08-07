import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf-8');
const match = envContent.match(/GEMINI_API_KEY=(.*)/);
if (match) process.env.GEMINI_API_KEY = match[1].trim();

const ai = new GoogleGenAI({});

async function test() {
  const model = 'gemini-3.5-flash-lite';
  try {
    const chat = ai.chats.create({
      model: model,
      config: { temperature: 0.7 }
    });
    console.log('Sending message with { message: "Hello" } ...');
    const responseStream = await chat.sendMessageStream({ message: "Hello" } as any);
    for await (const chunk of responseStream) {
      console.log(chunk.text);
    }
  } catch (e: any) {
    console.error(`Failed string chat without history:`, e.message);
  }

  try {
    const chat = ai.chats.create({ model });
    console.log('Sending tool response...');
    const responseStream = await chat.sendMessageStream({
      message: [{
        functionResponse: {
          name: "dummy_tool",
          response: { success: true },
        }
      }]
    } as any);
    for await (const chunk of responseStream) {
      console.log(chunk.text);
    }
  } catch (e: any) {
    console.error(`Failed array chat:`, e.message);
  }
}

test();
