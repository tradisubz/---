export default function SentimentCard({ blog }: { blog: any }) {
  const isPositive = blog.sentiment === "positive";

  return (
    <div className="bg-white border border-pink-200 rounded-2xl shadow p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg text-pink-700">{blog.title}</h2>
        <span className="text-xs text-gray-400">{blog.date}</span>
      </div>

      <p className="text-sm text-gray-700 line-clamp-4">{blog.content}</p>

      <div className="mt-3 text-sm font-bold text-right">
        <span className={isPositive ? "text-pink-600" : "text-red-500"}>
          감정 분석 결과: {isPositive ? "긍정" : "부정"}
        </span>
      </div>
    </div>
  );
}
