import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeSentiment(text: string): Promise<"positive" | "negative"> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `다음 블로그 글의 감정을 분석해줘. 긍정이면 'positive', 부정이면 'negative'로만 대답해:\n${text}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const sentiment = response.text().trim().toLowerCase();

  return sentiment.includes("positive") ? "positive" : "negative";
}
