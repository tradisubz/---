export default function SentimentCard({ blog }: { blog: any }) {
  const isPositive = blog.sentiment === "positive";

  return (
    <div className="bg-white rounded-2xl shadow-md border border-pink-200 p-5 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-pink-700">{blog.title}</h2>
        <span className="text-xs text-gray-400">{blog.date}</span>
      </div>

      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed mb-4 line-clamp-6">
        {blog.content}
      </p>

      <div className="text-sm font-semibold text-right">
        <span className={isPositive ? "text-pink-600" : "text-red-500"}>
          감정 분석 결과: {isPositive ? "💗 긍정" : "💢 부정"}
        </span>
      </div>
    </div>
  );
}
