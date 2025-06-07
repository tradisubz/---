import { fetchNaverBlogs } from "../src/lib/crawler";
import { analyzeSentiment } from "../src/lib/sentiment";
import { generateStrategyFromBlogs } from "../src/lib/strategy"; // ← 수정됨

(async () => {
  const blogs = await fetchNaverBlogs("우리끼리 대전문화점", "2025-06-01");
  const results = await Promise.all(
    blogs.map(async (post) => ({
      ...post,
      sentiment: await analyzeSentiment(post.content),
    }))
  );

  const strategy = await generateStrategyFromBlogs(results); // ← 여기도 수정

  console.log("마케팅 전략:\n", strategy);
})();
