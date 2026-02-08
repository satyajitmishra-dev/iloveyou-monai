import { GoogleGenAI } from "@google/genai";
import { PoemParams } from '../types';

export const generateRomanticPoem = async (params: PoemParams): Promise<string> => {
  try {
    // Ideally process.env.API_KEY is available. 
    // If running in a sandbox without env, this might fail, handled in UI.
    const apiKey = process.env.API_KEY || '';
    
    if (!apiKey) {
      throw new Error("API Key not found");
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      Write a short, romantic, and sweet poem in Bengali (max 8 lines) for my girlfriend named ${params.name}.
      Mention our favorite memory: "${params.favoriteMemory}" and what I love about her: "${params.trait}".
      Make it rhyme and sound heartfelt. Do not include a title. 
      Please provide ONLY the Bengali text.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Simple creative task
      }
    });

    return response.text || "Tomay bhalobashi, aj ar kal, shara jibon thakbo pashe chirokal.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Tomay bhalobashi, aj ar kal, shara jibon thakbo pashe chirokal. (AI unavailable)";
  }
};