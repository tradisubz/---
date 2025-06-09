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
          <h3>🎯 AI 마케팅 전략</h3>
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
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(236, 72, 153, 0.1);
            overflow: hidden;
            border: 2px solid rgba(252, 231, 243, 0.5);
          }

          .strategy-header {
            background: linear-gradient(135deg, #ec4899 0%, #be185d 50%, #9d174d 100%);
            color: white;
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .strategy-header h3 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 700;
            text-shadow: 0 1px 2px rgba(0,0,0,0.1);
          }

          .strategy-date {
            font-size: 0.875rem;
            opacity: 0.9;
            font-weight: 600;
          }

          .strategy-content {
            padding: 2rem;
          }

          .strategy-text p {
            color: #7c2d12;
            line-height: 1.6;
            margin: 0;
            font-weight: 500;
            font-size: 1rem;
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
        <h3>🎯 AI 마케팅 전략 분석</h3>
        <span className="strategy-date">✨ 실시간 AI 분석 결과 ✨</span>
      </div>
      
      <div className="strategy-content">
        {strategyObj.summary && (
          <div className="strategy-summary">
            <h4>💎 전략 요약</h4>
            <p>{strategyObj.summary}</p>
          </div>
        )}

        <div className="strategy-sections">
          {strategyObj.keyPoints && strategyObj.keyPoints.length > 0 && (
            <div className="strategy-section key-points">
              <h4>
                <span className="section-icon">🌸</span>
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
                <span className="section-icon">💖</span>
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
                <span className="section-icon">🎀</span>
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
            <div className="no-strategy-icon">🌸</div>
            <p>AI가 리뷰를 분석하여 맞춤형 전략을 생성 중입니다.</p>
            <p className="no-strategy-sub">더 많은 리뷰가 수집되면 더 정확한 전략을 제공할 수 있습니다.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .strategy-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(236, 72, 153, 0.1);
          overflow: hidden;
          border: 2px solid rgba(252, 231, 243, 0.5);
        }

        .strategy-header {
          background: linear-gradient(135deg, #ec4899 0%, #be185d 50%, #9d174d 100%);
          color: white;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .strategy-header h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .strategy-date {
          font-size: 0.875rem;
          opacity: 0.9;
          font-weight: 600;
        }

        .strategy-content {
          padding: 2rem;
        }

        .strategy-summary {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, #fdf2f8, #fce7f3);
          border-radius: 16px;
          border-left: 4px solid #ec4899;
          border: 2px solid rgba(252, 231, 243, 0.8);
        }

        .strategy-summary h4 {
          color: #be185d;
          margin: 0 0 0.75rem 0;
          font-size: 1.1rem;
          font-weight: 700;
          text-shadow: 0 1px 2px rgba(190, 24, 93, 0.1);
        }

        .strategy-summary p {
          color: #7c2d12;
          line-height: 1.6;
          margin: 0;
          font-weight: 500;
        }

        .strategy-sections {
          display: grid;
          gap: 1.5rem;
        }

        .strategy-section {
          padding: 1.5rem;
          border-radius: 16px;
          border: 2px solid rgba(252, 231, 243, 0.5);
          transition: all 0.3s ease;
        }

        .strategy-section:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(236, 72, 153, 0.1);
          border-color: rgba(236, 72, 153, 0.3);
        }

        .strategy-section.key-points {
          background: linear-gradient(135deg, #fdf2f8, #fce7f3);
        }

        .strategy-section.improvements {
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
        }

        .strategy-section.warnings {
          background: linear-gradient(135deg, #fffbeb, #fef3c7);
        }

        .strategy-section h4 {
          color: #be185d;
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-shadow: 0 1px 2px rgba(190, 24, 93, 0.1);
        }

        .section-icon {
          font-size: 1.2rem;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        .strategy-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .strategy-section li {
          padding: 0.75rem 0;
          padding-left: 1.5rem;
          position: relative;
          color: #7c2d12;
          line-height: 1.5;
          font-weight: 500;
        }

        .strategy-section li:before {
          content: "🌸";
          font-size: 0.8rem;
          position: absolute;
          left: 0;
          top: 0.75rem;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
        }

        .strategy-section.improvements li:before {
          content: "💖";
        }

        .strategy-section.warnings li:before {
          content: "🎀";
        }

        .no-strategy {
          text-align: center;
          padding: 3rem 2rem;
          color: #be185d;
        }

        .no-strategy-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
        }

        .no-strategy p {
          font-size: 1.1rem;
          margin: 0.5rem 0;
          line-height: 1.6;
          font-weight: 600;
        }

        .no-strategy-sub {
          font-size: 0.9rem !important;
          opacity: 0.8;
          font-weight: 400 !important;
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

          .strategy-summary {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
