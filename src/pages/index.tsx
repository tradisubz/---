import { useEffect, useState } from "react";
import { fetchNaverBlogs } from "../lib/crawler";
import { analyzeSentiment } from "../lib/sentiment";
import { generateStrategy } from "../lib/strategy";
import SentimentCard from "../components/SentimentCard";

export default function Home() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [strategy, setStrategy] = useState<string>("");

  useEffect(() => {
    const run = async () => {
      const blogPosts = await fetchNaverBlogs("우리끼리 대전문화점", "2025-06-01");
      const analyzed = await Promise.all(
        blogPosts.map(async (post: any) => {
          const sentiment = await analyzeSentiment(post.content);
          return { ...post, sentiment };
        })
      );
      setBlogs(analyzed);

      const positive = analyzed.filter((b) => b.sentiment === "positive").length;
      const negative = analyzed.filter((b) => b.sentiment === "negative").length;
      setStrategy(generateStrategy({ positive, negative }));
    };
    run();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">우리끼리 대전문화점 반응 모니터링</h1>
      <p className="mb-4 text-gray-600">마케팅 전략: {strategy}</p>
      <div className="space-y-4">
        {blogs.map((blog, idx) => (
          <SentimentCard key={idx} blog={blog} />
        ))}
      </div>
    </div>
  );
}
