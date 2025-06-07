import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchBlogContent(url: string): Promise<string> {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(data);
    const iframeUrl = $("iframe#mainFrame").attr("src");
    if (!iframeUrl) return "[본문 없음]";

    const fullUrl = `https://blog.naver.com${iframeUrl}`;
    const { data: iframeData } = await axios.get(fullUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $$ = cheerio.load(iframeData);
    const text = $$(".se-main-container").text().trim() || $$("#postViewArea").text().trim();

    return text || "[본문 없음]";
  } catch (e) {
    console.error("본문 크롤링 실패:", e);
    return "[본문 없음]";
  }
}

export async function fetchNaverBlogs(keyword: string, since: string): Promise<any[]> {
  const query = encodeURIComponent(keyword);
  const url = `https://search.naver.com/search.naver?where=view&query=${query}&sm=tab_opt&date_from=20250601&date_to=20250607&date_option=8`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(data);
    const blogs: any[] = [];

    const list = $("li.bx").slice(0, 5); // 최대 5개만 테스트용

    for (const el of list.toArray()) {
      const title = $(el).find("a.api_txt_lines").text().trim();
      const href = $(el).find("a.api_txt_lines").attr("href") || "";
      const date = $(el).find(".sub_time").text().trim();

      const content = await fetchBlogContent(href);

      blogs.push({ title, content, date });
    }

    return blogs;
  } catch (e) {
    console.error("블로그 크롤링 실패:", e);
    return [];
  }
}
