import React, { useState } from 'react';
import { HeaderStatusBar } from './HeaderStatusBar';
import { ScreenType, StudentProfile } from '../types';
import { intelligenceList } from '../data/intelligenceData';

interface ReportScreenProps {
  activeProfile: StudentProfile;
  onNavigate: (screen: ScreenType, payload?: any) => void;
  isPremium?: boolean;
  onOpenUpgrade?: () => void;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({
  activeProfile,
  onNavigate,
  isPremium = false,
  onOpenUpgrade
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    if (!isPremium) {
      if (onOpenUpgrade) onOpenUpgrade();
      return;
    }
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleActionRecommendations = () => {
    if (!isPremium) {
      if (onOpenUpgrade) onOpenUpgrade();
      return;
    }
    onNavigate('recommendations');
  };

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-full bg-[#F8FAFC] pb-6 select-none flex flex-col relative">
      {/* Unified Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100/90 shrink-0">
        <HeaderStatusBar darkText={true} />
        <div className="px-5 pt-0.5 pb-2.5 flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Holistic Report</h1>
            <p className="text-[11px] text-slate-500 font-medium">Certified Assessment dossier for {activeProfile.name}</p>
          </div>
          <button
            onClick={handleDownload}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition active:scale-95 cursor-pointer flex items-center space-x-1 ${
              !isPremium
                ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <span>{!isPremium ? '🔒' : '📥'}</span>
            <span>{downloadSuccess ? 'Downloaded!' : !isPremium ? 'Export (Locked)' : 'Export PDF'}</span>
          </button>
        </div>
      </header>

      {/* Freemium Notice */}
      {!isPremium && (
        <div className="mx-4 mt-2.5 p-3 bg-gradient-to-r from-purple-50 via-indigo-50 to-amber-50 border border-indigo-200/90 rounded-2xl flex items-center justify-between shadow-2xs">
          <div className="flex items-center space-x-2.5 pr-2">
            <span className="text-lg">👑</span>
            <div>
              <p className="text-[11px] font-bold text-indigo-950">Free Tier Preview Active</p>
              <p className="text-[10px] text-indigo-800 leading-tight">
                Personality Type is 100% unlocked. Full PDF export & multi-intelligence drilldowns lock until Premium.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenUpgrade}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-xl shrink-0 transition active:scale-95 cursor-pointer shadow-xs"
          >
            Unlock All
          </button>
        </div>
      )}

      {/* Download toast notification */}
      {downloadSuccess && (
        <div className="mx-4 mt-2 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center space-x-2 animate-in fade-in">
          <span>✓</span>
          <span>Comprehensive PDF Report for {activeProfile.name} generated successfully.</span>
        </div>
      )}

      {/* Main Report Body */}
      <main className="px-4 pt-3.5 space-y-3.5 flex-1 overflow-y-auto no-scrollbar">
        {/* Executive Summary Card */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Student Profile</span>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Full Spectrum Validated
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl">
              {activeProfile.avatar}
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">{activeProfile.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Grade: {activeProfile.role} • Age 13-14</p>
              <p className="text-[11px] text-indigo-700 font-semibold mt-0.5">
                Archetype: Visual-Kinesthetic Leader (High Logical Fluency)
              </p>
            </div>
          </div>
        </section>

        {/* 8 Multiple Intelligences Section */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-base">💠</span>
              <h3 className="text-xs font-bold text-slate-900">8 Multiple Intelligences (76% Avg)</h3>
            </div>
            <button
              onClick={() => onNavigate('eight_intelligence')}
              className="text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer flex items-center space-x-1"
            >
              <span>{!isPremium ? 'Preview Wheel 🔒' : 'View Wheel →'}</span>
            </button>
          </div>

          <div className="space-y-2">
            {intelligenceList.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('eight_intelligence')}
                className="flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 p-1 rounded-lg"
              >
                <span className="text-slate-700 font-medium text-[11px] truncate w-40">{item.name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.score}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <span className="font-bold text-[11px] text-slate-800 w-8 text-right">{item.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brain Dominance Card */}
        <section
          onClick={() => onNavigate('brain_dominance')}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-indigo-200 transition"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg">
              🔮
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="text-xs font-bold text-slate-900">Brain Dominance</h3>
                {!isPremium && <span className="text-[9px] text-amber-700 bg-amber-50 px-1 rounded-full font-bold">🔒 Locked</span>}
              </div>
              <p className="text-[11px] text-indigo-600 font-semibold">Right Brain Dominant (65%)</p>
              <p className="text-[10px] text-slate-400">Left Brain: 35% Analytical</p>
            </div>
          </div>
          <span className="text-slate-400 text-sm">→</span>
        </section>

        {/* 5 Senses Summary */}
        <section
          onClick={() => onNavigate('five_senses')}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-teal-200 transition"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-lg">
              👁️
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="text-xs font-bold text-slate-900">5 Senses Learning Style</h3>
                {!isPremium && <span className="text-[9px] text-amber-700 bg-amber-50 px-1 rounded-full font-bold">🔒 Locked</span>}
              </div>
              <p className="text-[11px] text-teal-700 font-semibold">Vision (88%) & Touch (82%)</p>
              <p className="text-[10px] text-slate-400">High hands-on tactile & spatial absorption</p>
            </div>
          </div>
          <span className="text-slate-400 text-sm">→</span>
        </section>

        {/* Personality & SWOT Summary */}
        <section className="grid grid-cols-2 gap-2.5">
          <div
            onClick={() => onNavigate('personality')}
            className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-3 border-2 border-purple-200 shadow-sm cursor-pointer hover:border-purple-300 transition relative"
          >
            <span className="absolute top-2 right-2 text-[9px] font-extrabold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
              FREE PASS ✨
            </span>
            <div className="flex items-center space-x-1.5 mb-1 text-purple-600 font-bold text-xs">
              <span>🎯</span>
              <span>Personality</span>
            </div>
            <p className="text-[10.5px] font-extrabold text-slate-800">Dominate (65%)</p>
            <p className="text-[9.5px] text-slate-500">Influential (35%)</p>
          </div>

          <div
            onClick={() => onNavigate('swot')}
            className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm cursor-pointer hover:border-amber-200 transition"
          >
            <div className="flex items-center space-x-1.5 mb-1 text-amber-600 font-bold text-xs">
              <span>🛡️</span>
              <span>SWOT Matrix</span>
            </div>
            <p className="text-[10.5px] font-extrabold text-slate-800">12 Strengths</p>
            <p className="text-[9.5px] text-slate-500">8 Key Opportunities</p>
          </div>
        </section>

        {/* Primary CTA */}
        <div className="pt-2">
          <button
            onClick={handleActionRecommendations}
            className={`w-full py-3.5 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition active:scale-[0.99] flex items-center justify-center space-x-1.5 ${
              !isPremium
                ? 'bg-gradient-to-r from-amber-600 to-indigo-600'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600'
            }`}
          >
            <span>{!isPremium ? '🔒 Unlock Personalized Recommendations' : 'View Personalized Action Recommendations ✨'}</span>
            {!isPremium && <span>👑</span>}
          </button>
        </div>
      </main>
    </div>
  );
};
