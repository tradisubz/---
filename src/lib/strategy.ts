export function generateStrategy(sentimentSummary: { positive: number, negative: number }): string {
  const { positive, negative } = sentimentSummary;

  if (positive > negative) {
    return "긍정적인 반응이 많습니다. 오프라인 프로모션을 강화해보세요.";
  } else if (negative > positive) {
    return "부정적인 반응이 많습니다. 고객 피드백을 바탕으로 개선점을 파악하세요.";
  } else {
    return "반응이 균형잡혀 있습니다. 계속해서 모니터링을 유지하세요.";
  }
}
