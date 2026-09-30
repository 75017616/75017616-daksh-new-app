import React from 'react';
import { HeaderStatusBar } from './HeaderStatusBar';
import { IntelligenceItem } from '../types';

interface IntelligenceDetailScreenProps {
  item: IntelligenceItem;
  onBack: () => void;
  onViewDetailedAnalysis: () => void;
}

export const IntelligenceDetailScreen: React.FC<IntelligenceDetailScreenProps> = ({
  item,
  onBack,
  onViewDetailedAnalysis,
}) => {
  // Theme color variables based on item
  const isTeal = item.id === 'interpersonal';
  const isGreen = item.id === 'logical-mathematical';
  const isPurple = item.id === 'linguistic';

  const primaryColor = item.color;
  const brandDark = isTeal ? '#0F766E' : isGreen ? '#166534' : isPurple ? '#6D28D9' : item.color;
  const brandBg = item.bgColor;

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-full bg-[#FBFDFD] pb-6 select-none flex flex-col relative">
      {/* Unified Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-[#FBFDFD]/95 backdrop-blur-md border-b border-slate-100/90 shrink-0">
        {/* iOS Status Bar */}
        <HeaderStatusBar darkText={true} />

        {/* Top Navigation Bar */}
        <nav className="flex items-center px-4 py-2.5">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="p-1.5 -ml-1 text-slate-800 hover:text-slate-600 transition active:scale-95 cursor-pointer"
            type="button"
          >
            <svg className="w-6 h-6 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15.75 19.5L8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-base font-bold text-slate-900 ml-2 tracking-tight flex-1 text-center pr-8 truncate">
            {item.name}
          </h1>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-4 py-3 space-y-3.5 flex-1">
        {/* Score Summary Card */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3.5">
              {/* Icon Avatar */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-inner flex-shrink-0"
                style={{ backgroundColor: brandDark }}
              >
                {item.id === 'logical-mathematical' && (
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 4v2H9v2H7V9H5V7h2V5h2v2h2zm7 9h-6v-2h6v2zm0-4h-6v-2h6v2zm0-4h-2V7h-2V5h2v2h2v1zM6.5 17.5l1.4-1.4 1.4 1.4 1.4-1.4-1.4-1.4 1.4-1.4-1.4-1.4-1.4 1.4-1.4-1.4-1.4 1.4 1.4 1.4-1.4 1.4 1.4 1.4z" />
                  </svg>
                )}
                {item.id === 'linguistic' && (
                  <svg className="w-7 h-7 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {item.id === 'interpersonal' && (
                  <svg className="w-7 h-7 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {item.id !== 'logical-mathematical' && item.id !== 'linguistic' && item.id !== 'interpersonal' && (
                  <span className="text-2xl font-bold">✨</span>
                )}
              </div>

              {/* Score & Badge */}
              <div>
                <p className="text-xs text-slate-400 font-medium">Your Score</p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-extrabold tracking-tight" style={{ color: brandDark }}>
                    {item.score}
                  </span>
                  <span className="text-xl font-bold" style={{ color: brandDark }}>
                    %
                  </span>
                </div>
                <span
                  className="inline-block mt-0.5 px-3 py-0.5 text-[11px] font-semibold tracking-wide text-white rounded-full shadow-xs"
                  style={{ backgroundColor: brandDark }}
                >
                  {item.ratingText}
                </span>
              </div>
            </div>

            {/* Ascending Bar Chart Graphic */}
            <div className="flex flex-col items-end">
              <div
                className="mb-1 text-[10px] font-bold text-white px-1.5 py-0.5 rounded shadow-xs"
                style={{ backgroundColor: primaryColor }}
              >
                {item.score}%
              </div>
              <div className="flex items-end space-x-1.5 h-16 px-1">
                <span className="w-2 rounded-t-sm h-[20%]" style={{ backgroundColor: primaryColor }} />
                <span className="w-2 rounded-t-sm h-[38%]" style={{ backgroundColor: primaryColor }} />
                <span className="w-2 rounded-t-sm h-[52%]" style={{ backgroundColor: primaryColor }} />
                <span className="w-2 rounded-t-sm h-[68%]" style={{ backgroundColor: primaryColor }} />
                <span className="w-2 rounded-t-sm h-[82%]" style={{ backgroundColor: primaryColor }} />
                <span className="w-2 rounded-t-sm h-[98%]" style={{ backgroundColor: primaryColor, opacity: 0.85 }} />
              </div>
              <div className="flex justify-between w-full text-[9px] text-slate-400 mt-1 font-medium">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 mt-4 leading-relaxed font-normal">
            {item.description}
          </p>
        </section>

        {/* Strengths Section ("You are good at") */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <h2 className="text-xs font-bold mb-3" style={{ color: brandDark }}>
            You are good at
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            {item.goodAt.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2.5 p-2 rounded-xl bg-slate-50/80 border border-slate-100"
              >
                <div className="shrink-0" style={{ color: primaryColor }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[11px] font-medium text-slate-700 leading-tight">
                  {skill.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Best Career Matches */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <h2 className="text-xs font-bold mb-3" style={{ color: brandDark }}>
            Best Career Matches
          </h2>
          <div className="grid grid-cols-6 gap-1.5 text-center">
            {item.careers.map((career, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-1"
                  style={{ color: brandDark }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[9px] font-medium text-slate-700 leading-tight truncate w-full">
                  {career.title}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3.5 pt-2 text-center">
            <button
              onClick={onViewDetailedAnalysis}
              className="inline-flex items-center text-xs font-semibold hover:underline cursor-pointer"
              style={{ color: brandDark }}
            >
              View All Careers
              <svg className="w-3.5 h-3.5 ml-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M8.25 4.5l7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </section>

        {/* How to Improve */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <h2 className="text-xs font-bold mb-3" style={{ color: brandDark }}>
            How to Improve
          </h2>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            {item.improvements.map((tip, idx) => (
              <div key={idx} className="flex items-start space-x-1.5">
                <svg
                  className="w-3.5 h-3.5 mt-0.5 shrink-0"
                  style={{ color: brandDark }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd" />
                </svg>
                <span className="text-[10px] text-slate-700 leading-snug font-medium">
                  {tip}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Score Breakdown */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <h2 className="text-xs font-bold mb-3" style={{ color: brandDark }}>
            Score Breakdown
          </h2>
          <div className="flex items-center space-x-4">
            {/* Circular Progress */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={brandDark}
                  strokeDasharray={`${item.score}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-base font-extrabold leading-none" style={{ color: brandDark }}>
                  {item.score}%
                </span>
                <span className="text-[9px] text-slate-400 mt-0.5 font-medium">Overall</span>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="flex-1 space-y-2">
              {item.breakdown.map((b, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center text-[10px] mb-1">
                    <span className="flex items-center text-slate-700 font-medium">
                      <span className="mr-1.5" style={{ color: brandDark }}>•</span>
                      {b.name}
                    </span>
                    <span className="font-bold" style={{ color: brandDark }}>
                      {b.score}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${b.score}%`, backgroundColor: brandDark }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Style & Famous People Dual Cards */}
        <section className="grid grid-cols-2 gap-3">
          {/* Learning Style Card */}
          <article className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold mb-2.5" style={{ color: brandDark }}>
                Learning Style
              </h2>
              <div className="space-y-2.5">
                <div className="flex items-start space-x-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: brandBg, color: brandDark }}
                  >
                    <span className="text-[10px]">📖</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-800 leading-tight">Best learns with</p>
                    <p className="text-[9px] text-slate-500 leading-tight mt-0.5">{item.learningStyle.bestLearnsWith}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: brandBg, color: brandDark }}
                  >
                    <span className="text-[10px]">🎯</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-800 leading-tight">Learns best through</p>
                    <p className="text-[9px] text-slate-500 leading-tight mt-0.5">{item.learningStyle.learnsBestThrough}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: brandBg, color: brandDark }}
                  >
                    <span className="text-[10px]">⚙️</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-800 leading-tight">Prefers</p>
                    <p className="text-[9px] text-slate-500 leading-tight mt-0.5">{item.learningStyle.prefers}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Famous People Card */}
          <article className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold mb-2.5" style={{ color: brandDark }}>
                Famous People
              </h2>
              <div className="space-y-2.5">
                {item.famousPeople.map((person, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: brandBg, color: brandDark }}
                    >
                      <span className="text-[10px]">★</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-800 leading-tight">{person.name}</p>
                      <p className="text-[9px] text-slate-500 leading-tight mt-0.5">{person.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>

        {/* Call To Action Button */}
        <section className="pt-1 pb-2">
          <button
            onClick={onViewDetailedAnalysis}
            className="w-full active:scale-[0.99] text-white py-3 px-4 rounded-xl font-medium text-xs flex items-center justify-between shadow-sm transition cursor-pointer"
            style={{ backgroundColor: brandDark }}
            type="button"
          >
            <span className="w-full text-center font-semibold">View Detailed Analysis</span>
            <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M8.25 4.5l7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </section>
      </main>
    </div>
  );
};
