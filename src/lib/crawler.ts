import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchNaverBlogs(keyword: string, since: string): Promise<any[]> {
  const query = encodeURIComponent(keyword);
  const url = `https://search.naver.com/search.naver?where=view&query=${query}&sm=tab_opt&date_from=20250601&date_to=20250607&date_option=8`;

  const { data } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    },
  });

  const $ = cheerio.load(data);
  const blogs: any[] = [];

  $("li.bx").each((_, el) => {
    const title = $(el).find("a.api_txt_lines").text().trim();
    const content = $(el).find("a.api_txt_lines").attr("href") || "";
    const date = $(el).find(".sub_time").text().trim();

    blogs.push({
      title,
      content,
      date,
    });
  });

  return blogs;
}
