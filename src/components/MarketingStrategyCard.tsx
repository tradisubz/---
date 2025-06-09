import React from 'react';

interface Strategy {
  summary?: string;
  keyPoints?: string[];
  improvements?: string[];
  warnings?: string[];
}

interface MarketingStrategyCardProps {
  strategy: Strategy | string;
}

export default function MarketingStrategyCard({ strategy }: MarketingStrategyCardProps) {
  // Handle string strategy (fallback)
  if (typeof strategy === 'string') {
    return (
      <div className="strategy-card">
        <div className="strategy-header">
          <h3>🎯 마케팅 전략</h3>
          <span className="strategy-date">최근 업데이트</span>
        </div>
        
        <div className="strategy-content">
          <div className="strategy-text">
            <p>{strategy}</p>
          </div>
        </div>

        <style jsx>{`
          .strategy-card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            overflow: hidden;
          }

          .strategy-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .strategy-header h3 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 600;
          }

          .strategy-date {
            font-size: 0.875rem;
            opacity: 0.9;
          }

          .strategy-content {
            padding: 2rem;
          }

          .strategy-text p {
            color: #4b5563;
            line-height: 1.6;
            margin: 0;
          }
        `}</style>
      </div>
    );
  }

  // Handle object strategy
  const strategyObj = strategy as Strategy;

  return (
    <div className="strategy-card">
      <div className="strategy-header">
        <h3>🎯 마케팅 전략 분석</h3>
        <span className="strategy-date">AI 분석 결과</span>
      </div>
      
      <div className="strategy-content">
        {strategyObj.summary && (
          <div className="strategy-summary">
            <h4>📋 전략 요약</h4>
            <p>{strategyObj.summary}</p>
          </div>
        )}

        <div className="strategy-sections">
          {strategyObj.keyPoints && strategyObj.keyPoints.length > 0 && (
            <div className="strategy-section key-points">
              <h4>
                <span className="section-icon">🔑</span>
                핵심 포인트
              </h4>
              <ul>
                {strategyObj.keyPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {strategyObj.improvements && strategyObj.improvements.length > 0 && (
            <div className="strategy-section improvements">
              <h4>
                <span className="section-icon">📈</span>
                개선 방안
              </h4>
              <ul>
                {strategyObj.improvements.map((improvement, idx) => (
                  <li key={idx}>{improvement}</li>
                ))}
              </ul>
            </div>
          )}

          {strategyObj.warnings && strategyObj.warnings.length > 0 && (
            <div className="strategy-section warnings">
              <h4>
                <span className="section-icon">⚠️</span>
                주의사항
              </h4>
              <ul>
                {strategyObj.warnings.map((warning, idx) => (
                  <li key={idx}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {(!strategyObj.keyPoints?.length && !strategyObj.improvements?.length && !strategyObj.warnings?.length) && (
          <div className="no-strategy">
            <div className="no-strategy-icon">🤖</div>
            <p>AI가 리뷰를 분석하여 맞춤형 전략을 생성 중입니다.</p>
            <p className="no-strategy-sub">더 많은 리뷰가 수집되면 더 정확한 전략을 제공할 수 있습니다.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .strategy-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          overflow: hidden;
        }

        .strategy-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .strategy-header h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .strategy-date {
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .strategy-content {
          padding: 2rem;
        }

        .strategy-summary {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: #f8fafc;
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }

        .strategy-summary h4 {
          color: #1f2937;
          margin: 0 0 0.75rem 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .strategy-summary p {
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
        }

        .strategy-sections {
          display: grid;
          gap: 1.5rem;
        }

        .strategy-section {
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .strategy-section.key-points {
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border-color: #0284c7;
        }

        .strategy-section.improvements {
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border-color: #16a34a;
        }

        .strategy-section.warnings {
          background: linear-gradient(135deg, #fffbeb, #fef3c7);
          border-color: #d97706;
        }

        .strategy-section h4 {
          color: #1f2937;
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .section-icon {
          font-size: 1.2rem;
        }

        .strategy-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .strategy-section li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
          color: #374151;
          line-height: 1.5;
        }

        .strategy-section li:before {
          content: "▶";
          color: #667eea;
          font-size: 0.75rem;
          position: absolute;
          left: 0;
          top: 0.6rem;
        }

        .strategy-section.improvements li:before {
          color: #16a34a;
        }

        .strategy-section.warnings li:before {
          color: #d97706;
        }

        .no-strategy {
          text-align: center;
          padding: 3rem 2rem;
          color: #6b7280;
        }

        .no-strategy-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .no-strategy p {
          font-size: 1.1rem;
          margin: 0.5rem 0;
          line-height: 1.6;
        }

        .no-strategy-sub {
          font-size: 0.9rem !important;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .strategy-header {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }

          .strategy-content {
            padding: 1.5rem;
          }

          .strategy-sections {
            gap: 1rem;
          }

          .strategy-section {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
