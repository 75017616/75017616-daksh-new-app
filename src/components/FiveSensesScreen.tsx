import React from 'react';
import { HeaderStatusBar } from './HeaderStatusBar';
import { senseList } from '../data/intelligenceData';

interface FiveSensesScreenProps {
  onBack: () => void;
  onSelectSense: (senseId: string) => void;
  isPremium?: boolean;
  onOpenUpgrade?: () => void;
}

export const FiveSensesScreen: React.FC<FiveSensesScreenProps> = ({
  onBack,
  onSelectSense,
  isPremium = false,
  onOpenUpgrade
}) => {
  const handleSenseClick = (senseId: string) => {
    if (!isPremium) {
      if (onOpenUpgrade) onOpenUpgrade();
      return;
    }
    onSelectSense(senseId);
  };

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-full bg-[#FAFBFD] pb-6 select-none flex flex-col relative">
      {/* Unified Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100/90 shrink-0">
        {/* iOS Status Bar */}
        <HeaderStatusBar darkText={true} />

        {/* Top App Header */}
        <div className="w-full px-5 py-2.5 flex items-center justify-between">
          <button
            onClick={onBack}
            aria-label="Go Back"
            className="p-1 -ml-1 text-gray-800 hover:text-gray-500 transition-colors active:scale-95 cursor-pointer"
            type="button"
          >
            <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-base font-bold tracking-tight text-gray-900 pr-2">5 Senses Analysis</h1>
          <div>
            {!isPremium ? (
              <button
                onClick={onOpenUpgrade}
                className="text-[9.5px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full flex items-center space-x-1 cursor-pointer"
              >
                <span>🔒 Preview</span>
              </button>
            ) : (
              <span className="text-[9.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                👑 Unlocked
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto px-4 pt-3 pb-6 no-scrollbar space-y-3">
        {/* Freemium Notice for 5 Senses */}
        {!isPremium && (
          <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl flex items-center justify-between shadow-2xs">
            <div className="flex items-center space-x-2.5 pr-2">
              <span className="text-lg">🔒</span>
              <div>
                <p className="text-[11px] font-bold text-amber-950">Free Tier: Status Teaser</p>
                <p className="text-[10px] text-amber-800 leading-tight">
                  Sensory percentages shown below. Detailed multi-modal study drills & tactile career links lock until Premium.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenUpgrade}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-xl shrink-0 transition active:scale-95 cursor-pointer shadow-xs"
            >
              Unlock
            </button>
          </div>
        )}

        {/* Top Summary Card */}
        <section
          onClick={() => handleSenseClick('vision')}
          className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100/50 flex items-center justify-between relative overflow-hidden cursor-pointer hover:border-purple-300 transition"
        >
          <div className="flex items-center space-x-3.5 pr-2">
            <div className="w-12 h-12 rounded-2xl bg-[#FFEBEA] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#F87171]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3zm4 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h2 className="text-sm font-bold text-gray-900 leading-snug">Vision (Visual)</h2>
                {!isPremium && (
                  <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full">
                    Top Sense
                  </span>
                )}
              </div>
              <p className="text-[11px] font-medium text-[#7C3AED] leading-snug mt-0.5">
                You prefer visual learning through images, diagrams and videos
              </p>
            </div>
          </div>

          {/* Circular Score Indicator (76%) */}
          <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" fill="none" r="28" stroke="#E2E8F0" strokeWidth="4.5" />
              <defs>
                <linearGradient id="sensesGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
              <circle
                cx="32"
                cy="32"
                fill="none"
                r="28"
                stroke="url(#sensesGrad)"
                strokeDasharray="175.9"
                strokeDashoffset="42.2"
                strokeLinecap="round"
                strokeWidth="4.5"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-gray-900 tracking-tight">76%</span>
            </div>
          </div>
        </section>

        {/* 5 Sense Cards */}
        {senseList.map((sense) => (
          <article
            key={sense.id}
            onClick={() => handleSenseClick(sense.id)}
            className="rounded-2xl p-3.5 border shadow-xs flex items-center justify-between transition cursor-pointer hover:shadow-md hover:scale-[1.01]"
            style={{
              borderColor: sense.borderColor,
              background: `linear-gradient(to right, ${sense.bgColor} 0%, #FFFFFF 50%, ${sense.bgColor} 100%)`
            }}
          >
            <div className="flex items-start space-x-3">
              {/* Sense Icon Avatar */}
              <div
                className="w-12 h-12 rounded-full bg-white shadow-xs border flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ borderColor: sense.borderColor, color: sense.color }}
              >
                {sense.id === 'vision' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                )}
                {sense.id === 'hearing' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                )}
                {sense.id === 'touch' && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 11.5a1.5 1.5 0 00-3 0v-4a1.5 1.5 0 00-3 0v4a1.5 1.5 0 00-3 0v-6a1.5 1.5 0 00-3 0v8.5a6 6 0 1012 0v-2.5z" />
                  </svg>
                )}
                {sense.id === 'smell' && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 3.2 2 6 2 9.5 0 2.2-1.8 3-2.5 3H7a1 1 0 100 2h10a1 1 0 100-2h-.5c-.7 0-2.5-.8-2.5-3 0-3.5 2-6.3 2-9.5C16.5 4 14.5 2 12 2zm-1.5 15a1 1 0 110-2 1 1 0 010 2zm3 0a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                )}
                {sense.id === 'taste' && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8 2 5 5 5 9v3c0 3.86 3.14 7 7 7s7-3.14 7-7V9c0-4-3-7-7-7zm0 15c-2.76 0-5-2.24-5-5v-1h10v1c0 2.76-2.24 5-5 5zm-1-4h2v3h-2v-3z" />
                  </svg>
                )}
              </div>

              {/* Details */}
              <div className="space-y-1">
                <h3 className="text-[13px] font-bold text-gray-900 leading-tight">
                  {sense.name} <span className="text-[11px] font-medium text-gray-600">({sense.typeName})</span>
                </h3>
                <p className="text-[10px] text-gray-600 leading-tight max-w-[170px]">
                  {sense.description}
                </p>
                <div className="pt-0.5 flex items-center space-x-1.5">
                  <span
                    className="inline-block px-2.5 py-0.5 text-[9.5px] font-semibold text-white rounded-full shadow-2xs"
                    style={{ backgroundColor: sense.color }}
                  >
                    {sense.ratingText}
                  </span>
                  {!isPremium && (
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full flex items-center space-x-0.5">
                      <span>🔒</span>
                      <span>Deep details</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Stat & Arrow */}
            <div className="flex flex-col items-end justify-between h-12 pl-2">
              <span className="text-sm font-extrabold" style={{ color: sense.color }}>
                {sense.score}%
              </span>
              {!isPremium ? (
                <span className="text-xs text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200">
                  🔒
                </span>
              ) : (
                <svg className="w-4 h-4 stroke-[2.5]" style={{ color: sense.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </article>
        ))}

        {/* AI Insight Banner Card */}
        <section className="rounded-2xl p-4 bg-gradient-to-r from-[#4E39E0] via-[#5F45EA] to-[#7B46F6] text-white relative overflow-hidden shadow-lg mt-1">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-purple-400/20 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-1.5 max-w-[200px]">
              <div className="flex items-center space-x-1.5">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h4 className="text-xs font-bold tracking-tight">Sensory AI Insight</h4>
              </div>
              <p className="text-[10px] text-white/95 leading-relaxed font-normal">
                You are a <strong className="font-bold text-white">Visual & Practical</strong> learner. Multi-sensory memory retention is strongest with spatial schematics.
              </p>
            </div>

            {/* Stylized Brain Artwork */}
            <div className="w-20 h-16 relative flex items-center justify-center flex-shrink-0">
              <svg className="w-16 h-16 text-pink-300 drop-shadow-md filter" fill="none" viewBox="0 0 64 64">
                <defs>
                  <linearGradient id="brainGradSenses" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#F472B6" />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
                <path d="M22 18c-4.4 0-8 3.6-8 8 0 1.2.3 2.4.8 3.4C12.3 30.5 10 33 10 36c0 3.9 3.1 7 7 7h1c.5 4 4 7 8 7 3.5 0 6.4-2.2 7.5-5.3 1.1 3.1 4 5.3 7.5 5.3 4 0 7.5-3 8-7h1c3.9 0 7-3.1 7-7 0-3-2.3-5.5-4.8-6.6.5-1 .8-2.2.8-3.4 0-4.4-3.6-8-8-8-1.5 0-2.8.4-4 1.1C42.2 19.3 39.4 18 36 18c-2.4 0-4.5.7-6.2 2-1.7-1.3-3.8-2-6.2-2h-1.6z" fill="url(#brainGradSenses)" opacity="0.95" />
                <path d="M32 18v32M24 24c3 2 5 5 5 9m11-9c-3 2-5 5-5 9m-14 3c4 1 6 3 6 6m16-6c-4 1-6 3-6 6" opacity="0.75" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
              </svg>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
