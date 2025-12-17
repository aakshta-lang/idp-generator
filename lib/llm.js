import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the SDK with your API Key from .env.local
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateIDPAnalysis(prompt) {
  try {
    // 1.5 Flash is incredibly fast for generating text-based IDPs
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // The prompt structure you built in AssessmentForm.js flows in here
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;

  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Check for common API Key issues
    if (error.message.includes('API_KEY_INVALID')) {
      throw new Error("Invalid Gemini API Key. Please check your .env.local file.");
    }
    
    throw new Error(`Failed to generate IDP: ${error.message}`);
  }
}