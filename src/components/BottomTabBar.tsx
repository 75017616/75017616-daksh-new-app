import React from 'react';
import { TabType } from '../types';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenAIChat?: (prompt?: string) => void;
  accentColor?: string;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  onOpenAIChat,
  accentColor = '#4F46E5',
}) => {
  return (
    <div className="sticky bottom-0 w-full bg-white/95 backdrop-blur-lg border-t border-slate-200/80 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] shrink-0 select-none">
      <nav className="px-2 pt-1.5 pb-1 flex justify-around items-center">
        {/* Tab 1: Home */}
        <button
          type="button"
          onClick={() => onTabChange('home')}
          className="flex flex-col items-center flex-1 py-1 cursor-pointer transition-transform active:scale-95 group focus:outline-none relative"
        >
          {activeTab === 'home' && (
            <span
              className="absolute -top-1.5 w-6 h-0.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          )}
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
              activeTab === 'home' ? 'bg-indigo-50/80 text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
            }`}
            style={{ color: activeTab === 'home' ? accentColor : undefined }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <span
            className="text-[10px] tracking-tight transition-colors font-semibold mt-0.5"
            style={{ color: activeTab === 'home' ? accentColor : '#64748B' }}
          >
            Home
          </span>
        </button>

        {/* Tab 2: Assessment */}
        <button
          type="button"
          onClick={() => onTabChange('assessment')}
          className="flex flex-col items-center flex-1 py-1 cursor-pointer transition-transform active:scale-95 group focus:outline-none relative"
        >
          {activeTab === 'assessment' && (
            <span
              className="absolute -top-1.5 w-6 h-0.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          )}
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors relative ${
              activeTab === 'assessment' ? 'bg-indigo-50/80 text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
            }`}
            style={{ color: activeTab === 'assessment' ? accentColor : undefined }}
          >
            <svg className="w-5 h-5 stroke-[1.9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" width="18" x="3" y="4" />
              <line strokeLinecap="round" x1="16" x2="16" y1="2" y2="6" />
              <line strokeLinecap="round" x1="8" x2="8" y1="2" y2="6" />
              <line strokeLinecap="round" x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
          </div>
          <span
            className="text-[10px] tracking-tight transition-colors font-semibold mt-0.5"
            style={{ color: activeTab === 'assessment' ? accentColor : '#64748B' }}
          >
            Assessment
          </span>
        </button>

        {/* Elevated Center Button: Vayo AI */}
        {onOpenAIChat && (
          <div className="flex flex-col items-center flex-1 -mt-4 cursor-pointer">
            <button
              type="button"
              onClick={() => onOpenAIChat()}
              className="group relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1e1363] via-[#4338ca] to-[#7c3aed] text-white flex items-center justify-center shadow-lg shadow-indigo-600/35 border-2 border-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              title="Ask Vayo AI"
            >
              {/* Pulse glow */}
              <span className="absolute -inset-0.5 rounded-2xl bg-cyan-400 opacity-40 blur-xs group-hover:opacity-80 transition animate-pulse" />
              
              {/* Robot Mini Face */}
              <div className="relative flex flex-col items-center">
                <span className="w-1 h-1 bg-cyan-400 rounded-full mb-0.5 shadow-[0_0_3px_#22d3ee]" />
                <div className="w-4 h-2 bg-slate-950 rounded-xs flex items-center justify-around px-0.5 border border-cyan-400/40">
                  <span className="w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse" />
                </div>
                <span className="text-[6px] font-black text-cyan-300 mt-0.5 tracking-tighter">AI</span>
              </div>
            </button>
            <span className="text-[9px] font-black text-indigo-700 tracking-tight mt-0.5 flex items-center space-x-0.5">
              <span>vayo</span>
              <span className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
            </span>
          </div>
        )}

        {/* Tab 3: Report */}
        <button
          type="button"
          onClick={() => onTabChange('report')}
          className="flex flex-col items-center flex-1 py-1 cursor-pointer transition-transform active:scale-95 group focus:outline-none relative"
        >
          {activeTab === 'report' && (
            <span
              className="absolute -top-1.5 w-6 h-0.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          )}
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
              activeTab === 'report' ? 'bg-indigo-50/80 text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
            }`}
            style={{ color: activeTab === 'report' ? accentColor : undefined }}
          >
            <svg className="w-5 h-5 stroke-[1.9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="text-[10px] tracking-tight transition-colors font-semibold mt-0.5"
            style={{ color: activeTab === 'report' ? accentColor : '#64748B' }}
          >
            Report
          </span>
        </button>

        {/* Tab 4: Profile */}
        <button
          type="button"
          onClick={() => onTabChange('profile')}
          className="flex flex-col items-center flex-1 py-1 cursor-pointer transition-transform active:scale-95 group focus:outline-none relative"
        >
          {activeTab === 'profile' && (
            <span
              className="absolute -top-1.5 w-6 h-0.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          )}
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
              activeTab === 'profile' ? 'bg-indigo-50/80 text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
            }`}
            style={{ color: activeTab === 'profile' ? accentColor : undefined }}
          >
            <svg className="w-5 h-5 stroke-[1.9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="text-[10px] tracking-tight transition-colors font-semibold mt-0.5"
            style={{ color: activeTab === 'profile' ? accentColor : '#64748B' }}
          >
            Profile
          </span>
        </button>
      </nav>

      {/* iOS Home Indicator Bar */}
      <div className="w-full flex justify-center pb-1 pt-0.5 pointer-events-none">
        <div className="w-28 h-1 bg-slate-900/80 rounded-full" />
      </div>
    </div>
  );
};
