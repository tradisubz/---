import SentimentCard from "../components/SentimentCard";
import MarketingStrategyCard from "../components/MarketingStrategyCard";
import { fetchNaverBlogs } from "../lib/crawler";
import { analyzeSentiment } from "../lib/sentiment";
import { generateStrategyFromBlogs } from "../lib/strategy";

export default function Home({ blogs, strategy }: any) {
  return (
    <div className="min-h-screen bg-pink-50 px-4 py-6">
      <h1 className="text-center text-2xl font-bold text-pink-700 mb-6">
        🎀 우리끼리 키즈카페 대전문화점<br />
        마케팅 대시보드
      </h1>

      <section className="max-w-2xl mx-auto mb-10">
        <h2 className="text-lg font-semibold text-pink-600 mb-3">리뷰 요약</h2>
        <div className="space-y-4">
          {blogs.map((blog: any, idx: number) => (
            <SentimentCard key={idx} blog={blog} />
          ))}
        </div>
      </section>

      <section className="max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold text-pink-600 mb-3">마케팅 전략</h2>
        <MarketingStrategyCard strategy={strategy} />
      </section>
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
        strategy: "전략을 생성하지 못했습니다.",
      },
    };
  }
}
