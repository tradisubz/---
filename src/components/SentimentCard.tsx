import React from 'react';

interface SentimentData {
  score: number;
  label: string;
  confidence: number;
}

interface Blog {
  title: string;
  content: string;
  url?: string;
  date?: string;
  sentiment?: SentimentData;
}

interface SentimentCardProps {
  blog: Blog;
}

export default function SentimentCard({ blog }: SentimentCardProps) {
  const getSentimentIcon = (label: string) => {
    switch (label) {
      case 'positive': return '💖';
      case 'negative': return '💔';
      default: return '💭';
    }
  };

  const getSentimentColor = (label: string) => {
    switch (label) {
      case 'positive': return '#ec4899';
      case 'negative': return '#ef4444';
      default: return '#a855f7';
    }
  };

  const getSentimentBadgeClass = (label: string) => {
    switch (label) {
      case 'positive': return 'positive';
      case 'negative': return 'negative';
      default: return 'neutral';
    }
  };

  const getSentimentText = (label: string) => {
    switch (label) {
      case 'positive': return '긍정적';
      case 'negative': return '부정적';
      default: return '중립적';
    }
  };

  // Extract keywords from content (simple implementation)
  const extractKeywords = (content: string) => {
    const commonWords = ['아이', '키즈', '카페', '좋다', '깨끗', '안전', '친절', '재미', '놀이', '예쁘다', '맛있다'];
    const words = content.split(/\s+/).slice(0, 15);
    return words.filter(word => 
      word.length > 1 && commonWords.some(common => word.includes(common))
    ).slice(0, 4);
  };

  const keywords = extractKeywords(blog.content);
  const sentimentLabel = blog.sentiment?.label || 'neutral';
  const sentimentScore = blog.sentiment?.score || 0;
  const confidence = blog.sentiment?.confidence || 0;

  return (
    <div className="sentiment-card">
      <div className="card-header">
        <div className="sentiment-section">
          <span className="sentiment-icon">
            {getSentimentIcon(sentimentLabel)}
          </span>
          <div className="sentiment-info">
            <span className={`sentiment-badge ${getSentimentBadgeClass(sentimentLabel)}`}>
              {getSentimentText(sentimentLabel)}
            </span>
            <div className="sentiment-score">
              신뢰도: {Math.round(confidence * 100)}% • 점수: {sentimentScore.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="date-info">
          {blog.date && (
            <span className="review-date">{blog.date}</span>
          )}
        </div>
      </div>

      <div className="card-content">
        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-content">
          {blog.content.length > 200 
            ? `${blog.content.substring(0, 200)}...` 
            : blog.content
          }
        </p>
      </div>

      {keywords.length > 0 && (
        <div className="keywords-section">
          {keywords.map((keyword, idx) => (
            <span key={idx} className="keyword-tag">
              🌸 {keyword}
            </span>
          ))}
        </div>
      )}

      {blog.url && (
        <div className="card-footer">
          <a 
            href={blog.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="source-link"
          >
            💕 원문 보기 →
          </a>
        </div>
      )}

      <style jsx>{`
        .sentiment-card {
          background: white;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(236, 72, 153, 0.1);
          border: 2px solid rgba(252, 231, 243, 0.5);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .sentiment-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: ${getSentimentColor(sentimentLabel)};
          border-radius: 20px 20px 0 0;
        }

        .sentiment-card:hover {
          box-shadow: 0 8px 32px rgba(236, 72, 153, 0.2);
          transform: translateY(-4px);
          border-color: rgba(236, 72, 153, 0.3);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .sentiment-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .sentiment-icon {
          font-size: 2.5rem;
          line-height: 1;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        .sentiment-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .sentiment-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.4rem 0.8rem;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .sentiment-badge.positive {
          background: linear-gradient(135deg, #fce7f3, #fbcfe8);
          color: #be185d;
          border: 1px solid rgba(236, 72, 153, 0.2);
        }

        .sentiment-badge.negative {
          background: linear-gradient(135deg, #fee2e2, #fecaca);
          color: #dc2626;
          border: 1px solid rgba(220, 38, 38, 0.2);
        }

        .sentiment-badge.neutral {
          background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
          color: #9333ea;
          border: 1px solid rgba(147, 51, 234, 0.2);
        }

        .sentiment-score {
          font-size: 0.75rem;
          color: #be185d;
          font-weight: 600;
        }

        .date-info {
          text-align: right;
        }

        .review-date {
          font-size: 0.875rem;
          color: #be185d;
          background: linear-gradient(135deg, #fdf2f8, #fce7f3);
          padding: 0.4rem 0.8rem;
          border-radius: 50px;
          font-weight: 600;
          border: 1px solid rgba(252, 231, 243, 0.8);
        }

        .card-content {
          margin-bottom: 1rem;
        }

        .blog-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #be185d;
          margin: 0 0 0.75rem 0;
          line-height: 1.4;
          text-shadow: 0 1px 2px rgba(190, 24, 93, 0.1);
        }

        .blog-content {
          color: #7c2d12;
          line-height: 1.6;
          margin: 0;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .keywords-section {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .keyword-tag {
          background: linear-gradient(135deg, #fdf2f8, #fce7f3);
          color: #be185d;
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          border: 1px solid rgba(252, 231, 243, 0.8);
          transition: all 0.2s ease;
        }

        .keyword-tag:hover {
          background: linear-gradient(135deg, #fce7f3, #fbcfe8);
          transform: translateY(-1px);
        }

        .card-footer {
          border-top: 2px solid #fce7f3;
          padding-top: 1rem;
          margin-top: 1rem;
        }

        .source-link {
          color: #ec4899;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 700;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #fdf2f8, #fce7f3);
          border-radius: 50px;
          border: 1px solid rgba(236, 72, 153, 0.2);
        }

        .source-link:hover {
          color: #be185d;
          background: linear-gradient(135deg, #fce7f3, #fbcfe8);
          transform: translateX(4px);
          border-color: rgba(236, 72, 153, 0.4);
        }

        @media (max-width: 768px) {
          .card-header {
            flex-direction: column;
            gap: 0.75rem;
            align-items: flex-start;
          }

          .date-info {
            text-align: left;
          }

          .sentiment-icon {
            font-size: 2rem;
          }

          .keywords-section {
            gap: 0.4rem;
          }

          .keyword-tag {
            font-size: 0.7rem;
            padding: 0.25rem 0.6rem;
          }
        }
      `}</style>
    </div>
  );
}
