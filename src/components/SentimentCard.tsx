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
      case 'positive': return '😊';
      case 'negative': return '😞';
      default: return '😐';
    }
  };

  const getSentimentColor = (label: string) => {
    switch (label) {
      case 'positive': return '#10b981';
      case 'negative': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getSentimentBadgeClass = (label: string) => {
    switch (label) {
      case 'positive': return 'positive';
      case 'negative': return 'negative';
      default: return 'neutral';
    }
  };

  // Extract keywords from content (simple implementation)
  const extractKeywords = (content: string) => {
    const commonWords = ['아이', '키즈', '카페', '좋다', '깨끗', '안전', '친절', '재미', '놀이'];
    const words = content.split(/\s+/).slice(0, 10);
    return words.filter(word => 
      word.length > 1 && commonWords.some(common => word.includes(common))
    ).slice(0, 3);
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
              {sentimentLabel === 'positive' ? '긍정' : 
               sentimentLabel === 'negative' ? '부정' : '중립'}
            </span>
            <div className="sentiment-score">
              점수: {sentimentScore.toFixed(2)} ({Math.round(confidence * 100)}%)
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
              #{keyword}
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
            원문 보기 →
          </a>
        </div>
      )}

      <style jsx>{`
        .sentiment-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 1px solid #e2e8f0;
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
        }

        .sentiment-card:hover {
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          transform: translateY(-2px);
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
          font-size: 2rem;
          line-height: 1;
        }

        .sentiment-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .sentiment-badge {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .sentiment-badge.positive {
          background: #d1fae5;
          color: #065f46;
        }

        .sentiment-badge.negative {
          background: #fee2e2;
          color: #991b1b;
        }

        .sentiment-badge.neutral {
          background: #f3f4f6;
          color: #374151;
        }

        .sentiment-score {
          font-size: 0.75rem;
          color: #6b7280;
          font-weight: 500;
        }

        .date-info {
          text-align: right;
        }

        .review-date {
          font-size: 0.875rem;
          color: #6b7280;
          background: #f8fafc;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
        }

        .card-content {
          margin-bottom: 1rem;
        }

        .blog-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
        }

        .blog-content {
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
          font-size: 0.95rem;
        }

        .keywords-section {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .keyword-tag {
          background: #f1f5f9;
          color: #475569;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .card-footer {
          border-top: 1px solid #f1f5f9;
          padding-top: 1rem;
          margin-top: 1rem;
        }

        .source-link {
          color: #667eea;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .source-link:hover {
          color: #4c51bf;
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
        }
      `}</style>
    </div>
  );
}
