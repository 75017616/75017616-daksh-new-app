import React from 'react';
import { HeaderStatusBar } from './HeaderStatusBar';
import { swotData } from '../data/intelligenceData';

interface SwotScreenProps {
  onBack: () => void;
  onViewRecommendations: () => void;
}

export const SwotScreen: React.FC<SwotScreenProps> = ({
  onBack,
  onViewRecommendations
}) => {
  return (
    <div className="w-full max-w-[420px] mx-auto min-h-full bg-white pb-6 select-none flex flex-col relative">
      {/* Unified Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100/90 shrink-0">
        {/* iOS Status Bar */}
        <HeaderStatusBar darkText={true} />

        {/* Navigation Header */}
        <nav className="relative flex items-center justify-center px-4 py-2.5">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="absolute left-4 p-1 text-gray-800 hover:text-black cursor-pointer active:scale-95 transition"
            type="button"
          >
            <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-[17px] font-bold text-gray-900 tracking-tight">SWOT Analysis</h1>
        </nav>
      </header>

      {/* Main Body Container */}
      <main className="px-5 pt-3.5 pb-4 flex flex-col gap-3 flex-1 overflow-y-auto no-scrollbar">
        {/* SWOT Grid */}
        <section className="grid grid-cols-2 gap-3">
          {/* 1. STRENGTHS Card */}
          <article className="bg-[#EAF9EE] border border-[#BCECC8] rounded-2xl p-3 flex flex-col items-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#D4F4DD] flex items-center justify-center mb-1.5 shadow-sm">
              <svg className="w-6 h-6 text-[#16A34A] fill-current" viewBox="0 0 24 24">
                <path d="M20.5 9h-1.5V7c0-.55-.45-1-1-1s-1 .45-1 1v10c0 .55.45 1 1 1s1-.45 1-1v-2h1.5c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5zM3.5 9H5v6H3.5C2.67 15 2 14.33 2 13.5v-3C2 9.67 2.67 9 3.5 9zM7 7c0-.55-.45-1-1-1s-1 .45-1 1v10c0 .55.45 1 1 1s1-.45 1-1V7zm10 4h-6v2h6v-2z" />
              </svg>
            </div>
            <h2 className="text-[12px] font-bold text-[#16A34A] uppercase tracking-wider mb-2.5">
              STRENGTHS
            </h2>
            <ul className="w-full text-left space-y-1.5 pl-1.5">
              {swotData[0].items.map((item, idx) => (
                <li key={idx} className="flex items-center text-[10.5px] font-medium text-gray-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] mr-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* 2. WEAKNESSES Card */}
          <article className="bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl p-3 flex flex-col items-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#FFE8D6] flex items-center justify-center mb-1.5 shadow-sm">
              <svg className="w-6 h-6 text-[#EA580C] stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-[12px] font-bold text-[#EA580C] uppercase tracking-wider mb-2.5">
              WEAKNESSES
            </h2>
            <ul className="w-full text-left space-y-1.5 pl-1.5">
              {swotData[1].items.map((item, idx) => (
                <li key={idx} className="flex items-center text-[10.5px] font-medium text-gray-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] mr-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* 3. OPPORTUNITIES Card */}
          <article className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-3 flex flex-col items-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center mb-1.5 shadow-sm">
              <svg className="w-6 h-6 text-[#2563EB] fill-current" viewBox="0 0 24 24">
                <path d="M13.13 2.14a1.5 1.5 0 00-2.26 0l-.88.94c-.45.48-.7 1.11-.7 1.77v2.54l-2.4 2.4a1 1 0 00-.29.71v3.08a1 1 0 00.4.8l2.29 1.72v2.4a1 1 0 001 1h.5a1 1 0 00.71-.29l6.5-6.5a1 1 0 00.29-.71V9.24a1 1 0 00-.29-.71l-4.14-4.14-.72-.75z" />
                <path d="M14.5 10a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
            <h2 className="text-[12px] font-bold text-[#2563EB] uppercase tracking-wider mb-2.5">
              OPPORTUNITIES
            </h2>
            <ul className="w-full text-left space-y-1.5 pl-1.5">
              {swotData[2].items.map((item, idx) => (
                <li key={idx} className="flex items-center text-[10.5px] font-medium text-gray-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* 4. THREATS Card */}
          <article className="bg-[#FFF1F2] border border-[#FECDD3] rounded-2xl p-3 flex flex-col items-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#FFE4E6] flex items-center justify-center mb-1.5 shadow-sm">
              <svg className="w-6 h-6 text-[#E11D48] stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-[12px] font-bold text-[#E11D48] uppercase tracking-wider mb-2.5">
              THREATS
            </h2>
            <ul className="w-full text-left space-y-1.5 pl-1.5">
              {swotData[3].items.map((item, idx) => (
                <li key={idx} className="flex items-center text-[10.5px] font-medium text-gray-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] mr-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        {/* AI Insight Card */}
        <section className="bg-white rounded-2xl p-4 shadow-soft-card border border-gray-100/90 mt-1">
          <div className="flex items-center space-x-1.5 mb-1.5">
            <span className="text-base">✨</span>
            <h3 className="text-[#6366F1] font-bold text-[14px] tracking-tight">AI Insight</h3>
          </div>
          <p className="text-[12px] leading-[18px] text-gray-800 font-normal">
            You have a strong leadership potential. Focus on improving patience and delegation skills to achieve even greater success in life.
          </p>
        </section>

        {/* Button to Recommendations */}
        <section className="mt-2">
          <button
            onClick={onViewRecommendations}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 transition active:scale-[0.99] cursor-pointer"
            type="button"
          >
            <span>View Personalized Recommendations</span>
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </section>
      </main>
    </div>
  );
};
