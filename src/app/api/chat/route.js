import Settings from "@/app/models/Settings";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { connectDB } from "@/app/lib/DB";

export async function POST(req) {
  try {
    const { message, ownerId } = await req.json();
    if (!message || !ownerId) {
      return NextResponse.json({
        message: "OwnerId and Message is required",
      }).status(400);
    }

    await connectDB();
    const settings = await Settings.findOne({ ownerId });
    if (!settings) {
      return NextResponse.json({
        message: "ChatBot is not confighured yet",
      }).status(400);
    }

    // Knowledge of business
    const KNOWLEDGE =  
    `business name- ${settings.businessName || "not provided"}
    support email- ${settings.supportEmail || "not provided"}
    knowledge- ${settings.knowledge || "not provided"}
    `;

    // Prompt of AI
    const prompt = `You are a professional customer support assistant for this business.

Use ONLY the information provided below to answer the customer's question.
You may rephrase, summarize, or interpret the information if needed.
Do NOT invent new policies, prices, or promises.

If the customer's question is completely unrelated to the information,
or cannot be reasonably answered from it, reply exactly with:
"Please contact support."

------------------------
BUSINESS INFORMATION
------------------------
${KNOWLEDGE}

------------------------
CUSTOMER QUESTION
------------------------
${message}

------------------------
ANSWER
------------------------`;

// GEMINI API KEY
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

// Response By Gemini
const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  
  return NextResponse.json({response:response.text})

  } catch (error) {
        return NextResponse.json({
        message: `Chat Error ${error}`,
      }).status(500);
  }
}
