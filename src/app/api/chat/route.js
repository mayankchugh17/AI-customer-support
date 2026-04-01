import Settings from "@/app/models/Settings";
import { connectDB } from "@/app/lib/DB";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ ONLY ONE OPTIONS HANDLER
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req) {
  try {
    await connectDB();

    const { message, ownerId } = await req.json();

    if (!message || !ownerId) {
      return NextResponse.json(
        { message: "Message and ownerId is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const setting = await Settings.findOne({ ownerId });

    if (!setting) {
      return NextResponse.json(
        { message: "ChatBot is not configured yet." },
        { status: 400, headers: corsHeaders }
      );
    }

    const KNOWLEDGE = `business name-${setting.businessName || "not provided"}
support email-${setting.supportEmail || "not provided"}
knowledge-${setting.knowledge || "not provided"}`;

    const prompt = `You are a professional customer support assistant for this business.

Use ONLY the information provided below to answer the customer's question.

${KNOWLEDGE}

Question: ${message}
Answer:`;

    const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json(
      { response: res.text },
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error("/api/chat failed:", error);

    return NextResponse.json(
      { message: "Chat API error" },
      { status: 500, headers: corsHeaders }
    );
  }
}