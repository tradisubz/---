export async function fetchNaverBlogs(keyword: string, since: string): Promise<any[]> {
  // 실제 서비스에서는 네이버 검색 API 또는 백엔드에서 직접 크롤링 필요
  // 여기서는 임시 샘플 데이터로 대체
  return [
    {
      title: "우리끼리 대전문화점 분위기 최고!",
      content: "대전문화점에서 친구들과 정말 즐거운 시간을 보냈어요. 분위기 너무 좋아요.",
      date: "2025-06-03"
    },
    {
      title: "조금 아쉬웠던 대전문화점",
      content: "서비스는 괜찮았지만 대기 시간이 길어서 아쉬웠어요.",
      date: "2025-06-05"
    }
  ];
}
