import { GoogleGenAI } from '@google/genai';

// Initialize the Google GenAI SDK
// It automatically picks up GEMINI_API_KEY from process.env
export const geminiClient = new GoogleGenAI({});
