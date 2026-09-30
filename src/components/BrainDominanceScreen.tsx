import React from 'react';
import { HeaderStatusBar } from './HeaderStatusBar';
import { brainDominanceData } from '../data/intelligenceData';

interface BrainDominanceScreenProps {
  onBack: () => void;
  onViewFullReport: () => void;
  isPremium?: boolean;
  onOpenUpgrade?: () => void;
}

export const BrainDominanceScreen: React.FC<BrainDominanceScreenProps> = ({
  onBack,
  onViewFullReport,
  isPremium = false,
  onOpenUpgrade
}) => {
  const handleReportClick = () => {
    if (!isPremium) {
      if (onOpenUpgrade) onOpenUpgrade();
      return;
    }
    onViewFullReport();
  };

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-full bg-white pb-6 select-none flex flex-col relative">
      {/* Unified Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100/90 shrink-0">
        {/* iOS Status Bar */}
        <HeaderStatusBar darkText={true} />

        {/* Navigation Bar */}
        <nav className="w-full px-5 py-2 flex items-center justify-between relative select-none">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="p-1 -ml-1 text-slate-900 active:opacity-60 transition cursor-pointer"
            type="button"
          >
            <svg className="w-6 h-6 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15.75 19.5L8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="font-bold text-[18px] text-slate-900 tracking-tight">
            Brain Dominance
          </h1>
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
        </nav>
      </header>

      {/* Freemium Notice */}
      {!isPremium && (
        <div className="mx-5 mt-2 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl flex items-center justify-between shadow-2xs">
          <div className="flex items-center space-x-2.5 pr-2">
            <span className="text-lg">🔒</span>
            <div>
              <p className="text-[11px] font-bold text-amber-950">Free Tier: Status Teaser</p>
              <p className="text-[10px] text-amber-800 leading-tight">
                Hemispheric balance shown below. Deep analytical vs creative cognitive drills lock until Premium.
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

      {/* Subtitle Header */}
      <div className="px-8 pt-2 pb-3 text-center">
        <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
          Understand which side of your brain you naturally use more.
        </p>
      </div>

      {/* Main Content */}
      <main className="px-5 space-y-4 flex-1">
        {/* Overall Summary Card */}
        <section className="bg-white rounded-2xl p-4 card-soft-shadow border border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-rose-500 flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="16" rx="3" width="18" x="3" y="4" />
                <circle cx="9" cy="12" fill="#fecdd3" r="2.5" stroke="currentColor" />
                <path d="M15 9.5v5" />
                <circle cx="15" cy="9.5" fill="currentColor" r="1.5" />
              </svg>
            </div>
            <div>
              <span className="block text-[14px] font-bold text-slate-800 leading-snug">Overall Brain Balance</span>
              <span className="block text-[14px] font-bold text-indigo-600 mt-0.5">{brainDominanceData.dominantSide}</span>
            </div>
          </div>

          {/* Circular Gauge 65% */}
          <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
            <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-blue-50"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-blue-500"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="65, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="absolute text-[13px] font-bold text-slate-800">65%</span>
          </div>
        </section>

        {/* Brain Visualization Section */}
        <section className="py-2 relative flex items-center justify-between">
          {/* Left Brain Info */}
          <div className="flex flex-col items-center text-center space-y-1 w-20 z-10">
            <span className="text-xs font-semibold text-slate-800">Left Brain</span>
            <span className="text-2xl font-extrabold text-blue-500 leading-tight">35%</span>
            <span className="text-xs font-medium text-slate-600">Analytical</span>
            <div className="mt-2 w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
          </div>

          {/* Central Brain Illustration */}
          <div className="relative flex-1 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-100 to-pink-100 flex items-center justify-center shadow-inner">
              <span className="text-5xl">🧠</span>
            </div>
          </div>

          {/* Right Brain Info */}
          <div className="flex flex-col items-center text-center space-y-1 w-20 z-10">
            <span className="text-xs font-semibold text-slate-800">Right Brain</span>
            <span className="text-2xl font-extrabold text-pink-500 leading-tight">65%</span>
            <span className="text-xs font-medium text-slate-600">Creative</span>
            <div className="mt-2 w-11 h-11 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
              </svg>
            </div>
          </div>
        </section>

        {/* Insight Banner */}
        <section className="bg-blue-50/70 rounded-2xl py-3 px-4 text-center border border-blue-100/50">
          <p className="text-[13px] font-bold text-slate-800 leading-tight">
            You use your Right Brain more naturally.
          </p>
          <p className="text-[12px] text-slate-600 font-medium mt-1 leading-normal">
            You are imaginative, intuitive and creative.
          </p>
        </section>

        {/* Trait Breakdown List */}
        <section className="space-y-3 pt-1">
          {brainDominanceData.traits.map((trait, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: trait.bg, color: trait.text }}
              >
                {trait.name === 'Imagination' && <span className="text-sm">💡</span>}
                {trait.name === 'Intuition' && <span className="text-sm">❤️</span>}
                {trait.name === 'Creativity' && <span className="text-sm">🎨</span>}
                {trait.name === 'Logic' && <span className="text-sm">⚙️</span>}
                {trait.name === 'Analysis' && <span className="text-sm">📊</span>}
              </div>
              <span className="text-[13px] font-bold text-slate-800 w-24">{trait.name}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${trait.score}%`, backgroundColor: trait.color }}
                />
              </div>
              <span className="text-[12px] font-extrabold text-slate-800 w-9 text-right">{trait.score}%</span>
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <div className="pt-3 pb-2">
          <button
            onClick={handleReportClick}
            className={`w-full py-3.5 text-white font-bold text-[15px] rounded-xl transition active:scale-[0.98] cursor-pointer flex items-center justify-center space-x-2 ${
              !isPremium
                ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-600 shadow-md shadow-amber-500/25'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 button-glow'
            }`}
            type="button"
          >
            <span>{!isPremium ? '🔒 Unlock Full Brain Report & Dossier' : 'View Full Report'}</span>
            {!isPremium && <span>👑</span>}
          </button>
        </div>
      </main>
    </div>
  );
};
