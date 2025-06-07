export default function SentimentCard({ blog }: { blog: any }) {
  return (
    <div className="p-4 rounded-xl shadow bg-white border">
      <h2 className="font-semibold text-lg">{blog.title}</h2>
      <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
      <p className="text-sm">{blog.content}</p>
      <p className={`mt-2 font-bold ${blog.sentiment === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
        감정 분석 결과: {blog.sentiment === 'positive' ? '긍정' : '부정'}
      </p>
    </div>
  );
}
