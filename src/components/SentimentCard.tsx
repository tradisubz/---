export default function SentimentCard({ blog }: { blog: any }) {
  const isPositive = blog.sentiment === "positive";

  return (
    <div className="bg-white border-2 border-pink-200 rounded-xl px-4 py-3 shadow-sm">
      <p className="text-sm text-gray-400 mb-1">{blog.date}</p>
      <p className="text-base text-gray-800 mb-2 whitespace-pre-wrap leading-relaxed">
        {blog.content}
      </p>
      <p className={`font-bold text-sm ${isPositive ? "text-pink-600" : "text-red-500"}`}>
        {isPositive ? "😊 긍정" : "😢 부정"}
      </p>
    </div>
  );
}
