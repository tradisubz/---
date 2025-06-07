export default function MarketingStrategyCard({ strategy }: { strategy: string }) {
  return (
    <div className="bg-pink-100 border border-pink-300 text-pink-800 rounded-xl p-5 leading-relaxed text-sm whitespace-pre-wrap shadow-sm">
      <h2 className="text-md font-semibold mb-2 text-pink-700">📊 마케팅 전략 요약</h2>
      {strategy}
    </div>
  );
}
