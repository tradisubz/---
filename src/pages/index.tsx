// src/pages/index.tsx (최종버전)

import SentimentCard from "../components/SentimentCard";
import { fetchNaverBlogs } from "../lib/crawler";
import { analyzeSentiment } from "../lib/sentiment";
import { generateStrategyFromBlogs } from "../lib/strategy";

export default function Home({ blogs, strategy }: any) {
  return (
    <div className="min-h-screen bg-pink-50 p-4">
      <h1 className="text-2xl font-bold mb-4 text-pink-700 text-center">
        🎀 우리끼리 대전문화점 반응 모니터링
      </h1>
      <div className="bg-white p-4 rounded-xl shadow text-gray-700 mb-6 max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold mb-2 text-pink-600">마케팅 전략 제안</h2>
        <p className="text-sm whitespace-pre-wrap">{strategy}</p>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {blogs.map((blog: any, idx: number) => (
          <SentimentCard key={idx} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const blogPosts = await fetchNaverBlogs("우리끼리 대전문화점", "2025-06-01");

    const analyzed = await Promise.all(
      blogPosts.map(async (post: any) => {
        const sentiment = await analyzeSentiment(post.content || "");
        return { ...post, sentiment };
      })
    );

    const strategy = await generateStrategyFromBlogs(analyzed);

    return {
      props: {
        blogs: analyzed,
        strategy,
      },
    };
  } catch (err) {
    console.error("SSR 전체 실패:", err);
    return {
      props: {
        blogs: [],
        strategy: "데이터를 불러오지 못했습니다.",
      },
    };
  }
}
