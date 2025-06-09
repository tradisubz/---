import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SentimentCard from "../components/SentimentCard";
import MarketingStrategyCard from "../components/MarketingStrategyCard";
import { fetchNaverBlogs } from "../lib/crawler";
import { analyzeSentiment } from "../lib/sentiment";
import { generateStrategyFromBlogs } from "../lib/strategy";

interface Blog {
  id?: string;
  title: string;
  content: string;
  url?: string;
  date?: string;
  sentiment?: {
    score: number;
    label: string;
    confidence: number;
  };
}

interface Strategy {
  summary: string;
  keyPoints: string[];
  improvements: string[];
  warnings: string[];
}

interface HomeProps {
  blogs: Blog[];
  strategy: Strategy | string;
}

export default function Home({ blogs, strategy }: HomeProps) {
  // Calculate statistics
  const totalReviews = blogs.length;
  const positiveReviews = blogs.filter(blog => 
    blog.sentiment && blog.sentiment.label === 'positive'
  ).length;
  const averageScore = blogs.length > 0 
    ? blogs.reduce((sum, blog) => sum + (blog.sentiment?.score || 0), 0) / blogs.length 
    : 0;
  const weeklyGrowth = 12; // Mock data - replace with actual calculation

  return (
    <>
      <Head>
        <title>우리끼리 키즈카페 대전문화점 - 마케팅 대시보드</title>
        <meta name="description" content="우리끼리 키즈카페 대전문화점의 리뷰 분석 및 마케팅 전략 대시보드" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div className="brand-section">
              <h1 className="brand-title">
                <span className="brand-emoji">🏰</span>
                우리끼리 키즈카페
                <span className="brand-subtitle">대전문화점</span>
              </h1>
              <p className="brand-description">실시간 리뷰 분석 & 마케팅 전략 대시보드</p>
            </div>
            <div className="update-info">
              <div className="update-badge">
                <span className="update-dot"></span>
                실시간 업데이트
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card primary">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-number">{totalReviews}</div>
                <div className="stat-label">총 리뷰 수</div>
              </div>
            </div>
            
            <div className="stat-card success">
              <div className="stat-icon">😊</div>
              <div className="stat-content">
                <div className="stat-number">{positiveReviews}</div>
                <div className="stat-label">긍정적 리뷰</div>
              </div>
            </div>
            
            <div className="stat-card warning">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <div className="stat-number">{averageScore.toFixed(1)}</div>
                <div className="stat-label">평균 점수</div>
              </div>
            </div>
            
            <div className="stat-card info">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <div className="stat-number">+{weeklyGrowth}%</div>
                <div className="stat-label">주간 성장률</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="main-content">
          {/* Reviews Section */}
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">💬</span>
                최근 리뷰 분석
              </h2>
              <Link href="/reviews" className="view-all-btn">
                전체 보기 →
              </Link>
            </div>
            
            <div className="reviews-content">
              {blogs.length > 0 ? (
                <div className="reviews-grid">
                  {blogs.map((blog, idx) => (
                    <div key={idx} className="review-wrapper">
                      <SentimentCard blog={blog} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data">
                  <div className="no-data-icon">📝</div>
                  <p>아직 분석된 리뷰가 없습니다.</p>
                  <p className="no-data-sub">곧 새로운 리뷰가 업데이트될 예정입니다.</p>
                </div>
              )}
            </div>
          </section>

          {/* Strategy Section */}
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">🎯</span>
                마케팅 전략
              </h2>
              <Link href="/strategy" className="view-all-btn strategy">
                자세히 보기 →
              </Link>
            </div>
            
            <div className="strategy-content">
              <MarketingStrategyCard strategy={strategy} />
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="dashboard-footer">
          <div className="footer-content">
            <div className="footer-info">
              <p>
                <span className="footer-icon">🔄</span>
                매주 월요일 오전 9시 자동 갱신
              </p>
              <p>
                <span className="footer-icon">📱</span>
                모바일에서도 사용 가능
              </p>
            </div>
            <div className="footer-badge">
              네이버 블로그 실시간 분석
            </div>
          </div>
        </footer>

        <style jsx>{`
          .dashboard-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .dashboard-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem 0;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }

          .header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .brand-section .brand-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .brand-emoji {
            font-size: 3rem;
          }

          .brand-subtitle {
            font-size: 1.2rem;
            font-weight: 400;
            opacity: 0.9;
            margin-left: 1rem;
          }

          .brand-description {
            margin: 0.5rem 0 0 0;
            opacity: 0.8;
            font-size: 1.1rem;
          }

          .update-info {
            text-align: right;
          }

          .update-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255,255,255,0.2);
            padding: 0.5rem 1rem;
            border-radius: 50px;
            backdrop-filter: blur(10px);
          }

          .update-dot {
            width: 8px;
            height: 8px;
            background: #4ade80;
            border-radius: 50%;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          .stats-section {
            max-width: 1200px;
            margin: -2rem auto 0;
            padding: 0 2rem;
            position: relative;
            z-index: 1;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          .stat-card {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 1rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .stat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.15);
          }

          .stat-icon {
            font-size: 2.5rem;
            padding: 1rem;
            border-radius: 12px;
          }

          .stat-card.primary .stat-icon {
            background: linear-gradient(135deg, #667eea, #764ba2);
          }

          .stat-card.success .stat-icon {
            background: linear-gradient(135deg, #4ade80, #22c55e);
          }

          .stat-card.warning .stat-icon {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
          }

          .stat-card.info .stat-icon {
            background: linear-gradient(135deg, #06b6d4, #0891b2);
          }

          .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            color: #1f2937;
            line-height: 1;
          }

          .stat-label {
            color: #6b7280;
            font-size: 0.9rem;
            font-weight: 500;
            margin-top: 0.25rem;
          }

          .main-content {
            max-width: 1200px;
            margin: 3rem auto 0;
            padding: 0 2rem;
            display: grid;
            gap: 3rem;
          }

          .content-section {
            background: white;
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.08);
            overflow: hidden;
          }

          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid #f1f5f9;
          }

          .section-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1f2937;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .section-icon {
            font-size: 1.5rem;
          }

          .view-all-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: #f8fafc;
            color: #475569;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.2s ease;
          }

          .view-all-btn:hover {
            background: #e2e8f0;
            transform: translateX(4px);
          }

          .view-all-btn.strategy {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: white;
          }

          .view-all-btn.strategy:hover {
            background: linear-gradient(135deg, #f59e0b, #d97706);
          }

          .reviews-content, .strategy-content {
            padding: 2rem;
          }

          .reviews-grid {
            display: grid;
            gap: 1.5rem;
          }

          .review-wrapper {
            transition: transform 0.2s ease;
          }

          .review-wrapper:hover {
            transform: translateY(-2px);
          }

          .no-data {
            text-align: center;
            padding: 4rem 2rem;
            color: #6b7280;
          }

          .no-data-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }

          .no-data p {
            font-size: 1.1rem;
            margin: 0.5rem 0;
          }

          .no-data-sub {
            font-size: 0.9rem;
            opacity: 0.7;
          }

          .dashboard-footer {
            margin-top: 4rem;
            background: #1f2937;
            color: white;
            padding: 2rem 0;
          }

          .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .footer-info p {
            margin: 0.5rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .footer-icon {
            font-size: 1rem;
          }

          .footer-badge {
            background: rgba(255,255,255,0.1);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            backdrop-filter: blur(10px);
          }

          @media (max-width: 768px) {
            .header-content {
              flex-direction: column;
              text-align: center;
              gap: 1rem;
            }

            .brand-title {
              font-size: 2rem !important;
            }

            .brand-subtitle {
              margin-left: 0 !important;
              display: block;
              margin-top: 0.5rem;
            }

            .stats-grid {
              grid-template-columns: 1fr;
            }

            .section-header {
              flex-direction: column;
              gap: 1rem;
              align-items: flex-start;
            }

            .footer-content {
              flex-direction: column;
              gap: 1rem;
              text-align: center;
            }

            .main-content {
              padding: 0 1rem;
            }

            .stats-section {
              padding: 0 1rem;
            }
          }

          /* Global styles to reset any existing pink theme */
          :global(.bg-pink-50) {
            background: transparent !important;
          }

          :global(.text-pink-700, .text-pink-600) {
            color: inherit !important;
          }
        `}</style>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const blogPosts = await fetchNaverBlogs("우리끼리 대전문화점", "2025-06-01");
    const analyzed = await Promise.all(
      blogPosts.map(async (post: any) => {
        const sentiment = await analyzeSentiment(post.content || "");
        return { ...post, sentiment };
      })
    );
    const strategy = await generateStrategyFromBlogs(analyzed);
    return {
      props: {
        blogs: analyzed,
        strategy,
      },
    };
  } catch (err) {
    console.error("SSR 전체 실패:", err);
    return {
      props: {
        blogs: [],
        strategy: "전략을 생성하지 못했습니다.",
      },
    };
  }
}
