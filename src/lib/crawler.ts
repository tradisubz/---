import axios from "axios";
import * as cheerio from "cheerio";

// 개별 블로그 글 본문 가져오기
export async function fetchBlogContent(url: string): Promise<string> {
  try {
    // 블로그 검색결과 페이지 접속
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    // iframe의 src를 가져옴
    const $ = cheerio.load(data);
    const iframeUrl = $("iframe#mainFrame").attr("src");

    if (!iframeUrl) return "[본문 없음]";

    // 본문이 있는 iframe 내부 페이지 요청
    const fullUrl = `https://blog.naver.com${iframeUrl}`;
    const { data: iframeData } = await axios.get(fullUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    // 본문 텍스트 추출 (에디터마다 구조가 다를 수 있음)
    const $$ = cheerio.load(iframeData);
    const text =
      $$(".se-main-container").text().trim() || $$("#postViewArea").text().trim();

    return text || "[본문 없음]";
  } catch (e) {
    return "[불러오기 실패]";
  }
}

// 블로그 검색 결과에서 글 목록 크롤링
export async function fetchNaverBlogs(keyword: string, since: string): Promise<any[]> {
  const query = encodeURIComponent(keyword);
  const url = `https://search.naver.com/search.naver?where=view&query=${query}&sm=tab_opt&date_from=20250601&date_to=20250607&date_option=8`;

  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const $ = cheerio.load(data);
  const blogs: any[] = [];

  const list = $("li.bx").slice(0, 5); // 속도 문제로 5개만 우선

  for (const el of list.toArray()) {
    const title = $(el).find("a.api_txt_lines").text().trim();
    const href = $(el).find("a.api_txt_lines").attr("href") || "";
    const date = $(el).find(".sub_time").text().trim();

    const content = await fetchBlogContent(href); // 본문 가져오기

    blogs.push({ title, content, date });
  }

  return blogs;
}
