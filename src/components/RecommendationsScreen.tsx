import React from 'react';
import { HeaderStatusBar } from './HeaderStatusBar';
import { recommendationsData } from '../data/intelligenceData';

interface RecommendationsScreenProps {
  onBack: () => void;
}

export const RecommendationsScreen: React.FC<RecommendationsScreenProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-[420px] mx-auto min-h-full bg-white pb-6 select-none flex flex-col relative">
      {/* Unified Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100/90 shrink-0">
        {/* iOS Status Bar */}
        <HeaderStatusBar darkText={true} />

        {/* Navigation Header */}
        <nav className="relative flex items-center justify-center px-5 py-2">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="absolute left-4 p-1 -ml-1 text-slate-900 active:opacity-60 transition cursor-pointer"
            type="button"
          >
            <svg className="w-5 h-5 stroke-[2.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-[19px] font-bold text-slate-900 tracking-tight text-center">
            Recommendations
          </h1>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-6 space-y-4 no-scrollbar">
        {/* Card 1: Improve Weaknesses */}
        <article className="bg-[#FFF9F2] border-[1.5px] border-[#F97316] rounded-2xl p-4 shadow-sm relative">
          <header className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-[#FFEBD8] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#F97316] transform -rotate-45 stroke-current stroke-[2.2]" fill="none" viewBox="0 0 24 24">
                <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-[17px] font-bold text-[#EA580C] tracking-tight">
              Improve Weaknesses
            </h2>
          </header>
          <ul className="space-y-2 pl-6 text-[12px] font-medium text-slate-800 leading-snug">
            {recommendationsData.weaknesses.map((item, idx) => (
              <li
                key={idx}
                className="relative before:content-[''] before:absolute before:-left-3.5 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#F97316] before:rounded-full"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>

        {/* Card 2: Utilize Opportunities */}
        <article className="bg-[#EFF6FF] border-[1.5px] border-[#3B82F6] rounded-2xl p-4 pt-5 shadow-sm relative">
          <header className="text-center mb-4">
            <h2 className="text-[17px] font-bold text-[#2563EB] tracking-tight">
              Utilize Opportunities
            </h2>
          </header>
          <ul className="space-y-2 pl-6 text-[12px] font-medium text-slate-800 leading-snug pb-1">
            {recommendationsData.opportunities.map((item, idx) => (
              <li
                key={idx}
                className="relative before:content-[''] before:absolute before:-left-3.5 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#2563EB] before:rounded-full"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>

        {/* Card 3: Reduce Threats */}
        <article className="bg-[#FFF1F2] border-[1.5px] border-[#EF4444] rounded-2xl p-4 shadow-sm relative">
          <header className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-[#FFE4E6] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#EF4444] stroke-current stroke-[2.2]" fill="none" viewBox="0 0 24 24">
                <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M3 3l18 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-[17px] font-bold text-[#DC2626] tracking-tight">
              Reduce Threats
            </h2>
          </header>
          <ul className="space-y-2 pl-6 text-[12px] font-medium text-slate-800 leading-snug">
            {recommendationsData.threats.map((item, idx) => (
              <li
                key={idx}
                className="relative before:content-[''] before:absolute before:-left-3.5 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#DC2626] before:rounded-full"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
};
