import { fetchNaverBlogs } from "../src/lib/crawler";
import { analyzeSentiment } from "../src/lib/sentiment";
import { generateStrategy } from "../src/lib/strategy";

(async () => {
  const blogs = await fetchNaverBlogs("우리끼리 대전문화점", "2025-06-01");
  const results = await Promise.all(blogs.map(async (post) => ({
    ...post,
    sentiment: await analyzeSentiment(post.content)
  })));

  const positive = results.filter(r => r.sentiment === 'positive').length;
  const negative = results.filter(r => r.sentiment === 'negative').length;

  const strategy = generateStrategy({ positive, negative });
  console.log("마케팅 전략:", strategy);
})();
