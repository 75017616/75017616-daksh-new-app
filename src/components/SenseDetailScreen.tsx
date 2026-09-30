import React from 'react';
import { HeaderStatusBar } from './HeaderStatusBar';
import { SenseItem } from '../types';

interface SenseDetailScreenProps {
  sense: SenseItem;
  onBack: () => void;
  onViewDetailedAnalysis: () => void;
}

export const SenseDetailScreen: React.FC<SenseDetailScreenProps> = ({
  sense,
  onBack,
  onViewDetailedAnalysis
}) => {
  const isTouch = sense.id === 'touch';
  const isTaste = sense.id === 'taste';

  const primaryColor = sense.accentColor || sense.color;
  const brandDark = sense.color;

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-full bg-white pb-6 select-none flex flex-col relative">
      {/* Unified Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100/90 shrink-0">
        {/* iOS Status Bar */}
        <HeaderStatusBar darkText={true} />

        {/* Top Navigation Bar */}
        <nav className="flex items-center px-4 py-2 shrink-0">
          <button
            onClick={onBack}
            aria-label="Go Back"
            className="p-2 -ml-2 rounded-full active:bg-slate-100 transition-colors cursor-pointer"
            type="button"
          >
            <svg className="w-5 h-5 text-slate-800 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="flex-1 text-center font-bold text-lg text-slate-900 tracking-tight pr-6 truncate">
            {sense.name} ({sense.typeName})
          </h1>
        </nav>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto px-4 py-3.5 space-y-4 no-scrollbar">
        {/* Hero Score Card */}
        <section
          className="rounded-3xl p-4 card-shadow relative overflow-hidden flex items-center justify-between border"
          style={{
            borderColor: sense.borderColor,
            background: `linear-gradient(to bottom right, ${sense.bgColor}, #FFFFFF, ${sense.bgColor})`
          }}
        >
          {/* Sense Icon Circle */}
          <div className="flex items-center space-x-3.5">
            <div
              className="w-16 h-16 rounded-full bg-white border shadow-inner flex items-center justify-center shrink-0"
              style={{ borderColor: sense.borderColor, color: brandDark }}
            >
              {isTouch && (
                <svg className="w-9 h-9 fill-current" viewBox="0 0 24 24">
                  <path d="M13 1.07V9h1V2.5C14 1.67 14.67 1 15.5 1S17 1.67 17 2.5V9h1V4.5C18 3.67 18.67 3 19.5 3S21 3.67 21 4.5V14.5c0 4.69-3.81 8.5-8.5 8.5-3.41 0-6.38-2.02-7.73-4.94l-2.48-5.36c-.34-.73-.08-1.6.61-2.02.73-.44 1.69-.26 2.19.41L7 13.5V3.5C7 2.67 7.67 2 8.5 2S10 2.67 10 3.5V9h1V1.07C11 .48 11.45 0 12.03 0c.55 0 1 .47.97 1.07z" />
                </svg>
              )}
              {isTaste && (
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8 2 5 5 5 9v3c0 3.86 3.14 7 7 7s7-3.14 7-7V9c0-4-3-7-7-7zm0 15c-2.76 0-5-2.24-5-5v-1h10v1c0 2.76-2.24 5-5 5zm-1-4h2v3h-2v-3z" />
                </svg>
              )}
              {!isTouch && !isTaste && <span className="text-2xl">✨</span>}
            </div>

            {/* Score & Indicator */}
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                {sense.name} Score
              </span>
              <span className="text-3xl font-extrabold leading-none my-1" style={{ color: brandDark }}>
                {sense.score}%
              </span>
              <span
                className="inline-flex items-center justify-center px-3 py-0.5 mt-0.5 rounded-full text-xs font-bold text-white w-max shadow-xs"
                style={{ backgroundColor: brandDark }}
              >
                {sense.ratingText}
              </span>
            </div>
          </div>

          {/* Metric Trend Chart Visualization */}
          <div className="w-24 h-16 flex items-end justify-end space-x-1.5 pr-1 relative">
            <div className="w-2.5 h-4 rounded-t-sm opacity-40" style={{ backgroundColor: primaryColor }} />
            <div className="w-2.5 h-6 rounded-t-sm opacity-60" style={{ backgroundColor: primaryColor }} />
            <div className="w-2.5 h-8 rounded-t-sm opacity-80" style={{ backgroundColor: primaryColor }} />
            <div className="w-2.5 h-11 rounded-t-sm" style={{ backgroundColor: primaryColor }} />
            <div className="w-2.5 h-14 rounded-t-sm" style={{ backgroundColor: brandDark }} />

            {/* Dynamic Growth Arrow Path */}
            <svg className="absolute top-0 right-0 w-24 h-16 pointer-events-none" fill="none" viewBox="0 0 100 60">
              <path d="M 5 52 Q 40 45 75 16 L 90 8" stroke={brandDark} strokeLinecap="round" strokeWidth="2.5" />
              <polyline points="80,7 93,7 93,20" stroke={brandDark} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
          </div>
        </section>

        {/* Insight Summary Banner */}
        <section
          className="border rounded-2xl p-3.5 flex items-start space-x-3"
          style={{ backgroundColor: `${sense.bgColor}80`, borderColor: sense.borderColor }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            style={{ backgroundColor: sense.bgColor, color: brandDark }}
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-xs leading-relaxed text-slate-700 font-medium">
            {sense.description}
          </p>
        </section>

        {/* Strengths Section */}
        <section className="space-y-2.5">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Strengths</h2>
          <div className="grid grid-cols-4 gap-2">
            {sense.strengths.map((str, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div
                  className="w-12 h-12 rounded-full border flex items-center justify-center mb-1.5 shadow-2xs"
                  style={{ backgroundColor: sense.bgColor, borderColor: sense.borderColor, color: brandDark }}
                >
                  <span className="text-sm font-bold">★</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                  {str.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* You Learn Best With Section */}
        <section className="space-y-2.5">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">You Learn Best With</h2>
          <div className="grid grid-cols-2 gap-2">
            {sense.learnBestWith.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2.5 border rounded-xl px-3 py-2.5"
                style={{ backgroundColor: `${sense.bgColor}60`, borderColor: sense.borderColor }}
              >
                <div style={{ color: brandDark }}>
                  <svg className="w-4 h-4 stroke-[2] fill-none stroke-current" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-800">{item.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Best Career Matches Section */}
        <section className="space-y-2.5">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Best Career Matches</h2>
          <div className="flex space-x-2.5 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1">
            {sense.careers.map((career, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center min-w-[76px] h-[80px] bg-white border rounded-2xl p-2 text-center shrink-0 shadow-2xs"
                style={{ borderColor: sense.borderColor }}
              >
                <div className="mb-1" style={{ color: brandDark }}>
                  <svg className="w-5 h-5 stroke-[1.8] fill-none stroke-current" viewBox="0 0 24 24">
                    <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[10px] font-semibold text-slate-700 leading-tight truncate w-full">
                  {career.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Action CTA Button */}
        <section className="pt-2 pb-1">
          <button
            onClick={onViewDetailedAnalysis}
            className="w-full text-white font-bold py-3.5 px-5 rounded-2xl shadow-md flex items-center justify-between transition-all active:scale-[0.99] cursor-pointer"
            style={{ backgroundColor: brandDark }}
            type="button"
          >
            <span className="text-sm font-semibold tracking-wide">View Detailed Analysis</span>
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </section>
      </main>
    </div>
  );
};
