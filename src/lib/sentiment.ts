export async function analyzeSentiment(text: string): Promise<"positive" | "negative"> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `다음 블로그 글의 감정을 분석해줘. 긍정이면 'positive', 부정이면 'negative'라고만 말해줘:\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const sentiment = response.text().trim().toLowerCase();

    console.log("Gemini 감정 분석 결과:", sentiment);

    if (sentiment.includes("positive")) return "positive";
    if (sentiment.includes("negative")) return "negative";
    return "negative"; // 분석 실패 시 기본값
  } catch (err) {
    console.error("Gemini 분석 에러:", err);
    return "negative"; // 실패 시 기본
  }
}
