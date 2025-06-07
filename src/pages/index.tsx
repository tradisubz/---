import SentimentCard from "../components/SentimentCard";
import { fetchNaverBlogs } from "../lib/crawler";
import { analyzeSentiment } from "../lib/sentiment";
import { generateStrategy } from "../lib/strategy";

export default function Home({ blogs, strategy }: any) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">우리끼리 대전문화점 반응 모니터링</h1>
      <p className="mb-4 text-gray-600">마케팅 전략: {strategy}</p>
      <div className="space-y-4">
        {blogs.map((blog: any, idx: number) => (
          <SentimentCard key={idx} blog={blog} />
        ))}
      </div>
    </div>
  );
}

// ✅ 서버에서 실행
export async function getServerSideProps() {
  const blogPosts = await fetchNaverBlogs("우리끼리 대전문화점", "2025-06-01");
  const analyzed = await Promise.all(
    blogPosts.map(async (post: any) => {
      const sentiment = await analyzeSentiment(post.content);
      return { ...post, sentiment };
    })
  );

  const positive = analyzed.filter((b) => b.sentiment === "positive").length;
  const negative = analyzed.filter((b) => b.sentiment === "negative").length;
  const strategy = generateStrategy({ positive, negative });

  return {
    props: {
      blogs: analyzed,
      strategy,
    },
  };
}
