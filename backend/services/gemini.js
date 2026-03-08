import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function processStory(storyText) {

    const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" } 
  });

  const prompt = `
    Split this story into 4-6 scenes. For each scene return a JSON object with:
    - scene_text: the actual story text [cite: 13]
    - setting_description: visual location [cite: 14]
    - character_emotions: mood of the characters [cite: 15]
    - animation_prompt: a detailed prompt for image generation [cite: 16]
    
    Story: ${storyText}
  `;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text()); // Gemini returns clean structured JSON [cite: 17]
}