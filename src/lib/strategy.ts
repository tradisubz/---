import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateStrategyFromBlogs(
  blogs: { title: string; content: string; sentiment: string }[]
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
다음은 고객들이 블로그에 남긴 후기들입니다. 어떤 점이 부정적으로 평가되었는지 요약하고, 이를 바탕으로 마케팅 전략을 제시해주세요.

형식:
- 부정적으로 지적된 주요 내용 요약 (3줄 이내)
- 이를 반영한 마케팅 전략 제안 (실행 가능한 형태)

후기 목록:
${blogs.map((b, i) => `${i + 1}. ${b.title}\n${b.content}`).join("\n\n")}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (err) {
    console.error("마케팅 전략 생성 실패:", err);
    return "전략을 생성하지 못했습니다.";
  }
}
