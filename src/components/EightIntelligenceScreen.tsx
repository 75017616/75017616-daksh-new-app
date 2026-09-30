import React, { useState } from 'react';
import { HeaderStatusBar } from './HeaderStatusBar';
import { intelligenceList } from '../data/intelligenceData';
import { IntelligenceItem } from '../types';

interface EightIntelligenceScreenProps {
  onBack: () => void;
  onSelectIntelligence: (intelligenceId: string) => void;
  onViewFullReport: () => void;
  isPremium?: boolean;
  onOpenUpgrade?: () => void;
}

export const EightIntelligenceScreen: React.FC<EightIntelligenceScreenProps> = ({
  onBack,
  onSelectIntelligence,
  onViewFullReport,
  isPremium = false,
  onOpenUpgrade
}) => {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  const handleItemClick = (id: string) => {
    if (!isPremium) {
      if (onOpenUpgrade) onOpenUpgrade();
      return;
    }
    onSelectIntelligence(id);
  };

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

        {/* Top Navigation Bar */}
        <nav className="relative flex items-center justify-between px-4 py-2.5">
          <button
            onClick={onBack}
            aria-label="Back"
            className="p-1 text-slate-800 hover:text-slate-600 transition cursor-pointer active:scale-95"
            type="button"
          >
            <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15.75 19.5L8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-[17px] font-bold text-slate-900 tracking-tight">8 Multi Intelligence</h1>
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

      {/* Main Content */}
      <main className="px-5 pt-2 flex-1">
        {/* Freemium Status Notice */}
        {!isPremium && (
          <div className="mb-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl flex items-center justify-between shadow-2xs">
            <div className="flex items-center space-x-2.5 pr-2">
              <span className="text-lg">🔒</span>
              <div>
                <p className="text-[11px] font-bold text-amber-950">Free Tier: Status Teaser</p>
                <p className="text-[10px] text-amber-800 leading-tight">
                  Overall status shown. Deep analytics, careers & learning plans lock until Premium.
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

        {/* Overall Score Card */}
        <section
          onClick={handleReportClick}
          className="bg-white rounded-2xl p-4 shadow-soft-card border border-slate-100 flex items-center justify-between mt-1 mb-6 cursor-pointer hover:border-indigo-200 transition"
        >
          <div className="flex items-center space-x-3.5">
            {/* House Outline Icon Box */}
            <div className="w-12 h-12 rounded-xl bg-[#FEECEC] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#F25A62]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M3 10.25L12 3l9 7.25v9.5A1.25 1.25 0 0119.75 21H4.25A1.25 1.25 0 013 19.75v-9.5z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="16" cy="7.5" fill="currentColor" r="1.5" stroke="none" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-800 leading-tight">Overall Intelligence Profile</p>
              <p className="text-[14px] font-bold text-[#5735EB] mt-0.5 tracking-tight">Strong in multiple areas</p>
            </div>
          </div>

          {/* 76% Circular Progress Ring */}
          <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 44 44">
              <circle cx="22" cy="22" fill="none" r="18.5" stroke="#E2E8F0" strokeWidth="3.5" />
              <defs>
                <linearGradient id="ringGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              <circle
                cx="22"
                cy="22"
                fill="none"
                r="18.5"
                stroke="url(#ringGradient)"
                strokeDasharray="116.24"
                strokeDashoffset="27.89"
                strokeLinecap="round"
                strokeWidth="3.8"
              />
            </svg>
            <span className="absolute text-[13px] font-bold text-slate-800 tracking-tight">76%</span>
          </div>
        </section>

        {/* Intelligence Scores Wheel Section */}
        <section className="mb-7">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Your 8 Intelligence Scores</h2>
            <span className="text-[11px] text-indigo-600 font-semibold">Tap any slice</span>
          </div>

          {/* Radial Wheel Graphic */}
          <div className="relative w-full max-w-[310px] mx-auto aspect-square flex items-center justify-center">
            <svg className="w-full h-full filter drop-shadow-sm select-none cursor-pointer" viewBox="-210 -210 420 420">
              <defs>
                <filter height="140%" id="centerShadow" width="140%" x="-20%" y="-20%">
                  <feDropShadow dx="0" dy="2" floodColor="#000" floodOpacity="0.08" stdDeviation="4" />
                </filter>
              </defs>

              {/* 8 Pie Segments */}
              {/* 1. Linguistic (80%) - Top */}
              <g
                onClick={() => handleItemClick('linguistic')}
                onMouseEnter={() => setHoveredSlice('linguistic')}
                onMouseLeave={() => setHoveredSlice(null)}
                className="transition-transform duration-150 hover:scale-102 origin-center"
              >
                <path
                  d="M -75.95 -185.3 A 200 200 0 0 1 73.18 -186.41 L 30.01 -76.33 A 82 82 0 0 0 -31.14 -75.87 Z"
                  fill="#884CED"
                  className={hoveredSlice === 'linguistic' ? 'brightness-110' : ''}
                />
                <g className="text-white fill-white text-center pointer-events-none" transform="translate(0, -138)">
                  <path d="M-9 -10 C-5 -11 -2 -11 0 -9 C2 -11 5 -11 9 -10 L9 4 C5 3 2 3 0 5 C-2 3 -5 3 -9 4 Z" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                  <line stroke="#FFFFFF" strokeWidth="1.6" x1="0" x2="0" y1="-9" y2="5" />
                  <text fill="#FFFFFF" fontSize="11" fontWeight="600" textAnchor="middle" y="17">Linguistic</text>
                  <text fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle" y="30">80%</text>
                </g>
              </g>

              {/* 2. Logical Mathematical (75%) - Top-Right */}
              <g
                onClick={() => handleItemClick('logical-mathematical')}
                onMouseEnter={() => setHoveredSlice('logical-mathematical')}
                onMouseLeave={() => setHoveredSlice(null)}
                className="transition-transform duration-150 hover:scale-102 origin-center"
              >
                <path
                  d="M 79.75 -183.47 A 200 200 0 0 1 183.47 -79.75 L 75.22 -32.70 A 82 82 0 0 0 32.70 -75.22 Z"
                  fill="#F45A7E"
                  className={hoveredSlice === 'logical-mathematical' ? 'brightness-110' : ''}
                />
                <g className="text-white fill-white text-center pointer-events-none" transform="translate(98, -98)">
                  <rect fill="none" height="18" rx="2" stroke="#FFFFFF" strokeWidth="1.6" width="16" x="-8" y="-12" />
                  <line stroke="#FFFFFF" strokeWidth="1.4" x1="-5" x2="5" y1="-7" y2="-7" />
                  <line stroke="#FFFFFF" strokeWidth="1.4" x1="-5" x2="5" y1="-2" y2="-2" />
                  <line stroke="#FFFFFF" strokeWidth="1.4" x1="0" x2="0" y1="-2" y2="3" />
                  <text fill="#FFFFFF" fontSize="9.5" fontWeight="600" textAnchor="middle" y="16">Logical</text>
                  <text fill="#FFFFFF" fontSize="8.5" fontWeight="600" textAnchor="middle" y="26">Mathematical</text>
                  <text fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle" y="38">75%</text>
                </g>
              </g>

              {/* 3. Spatial (70%) - Right */}
              <g
                onClick={() => handleItemClick('spatial')}
                onMouseEnter={() => setHoveredSlice('spatial')}
                onMouseLeave={() => setHoveredSlice(null)}
                className="transition-transform duration-150 hover:scale-102 origin-center"
              >
                <path
                  d="M 186.08 -73.34 A 200 200 0 0 1 186.08 73.34 L 76.29 30.07 A 82 82 0 0 0 76.29 -30.07 Z"
                  fill="#F47B25"
                  className={hoveredSlice === 'spatial' ? 'brightness-110' : ''}
                />
                <g className="text-white fill-white text-center pointer-events-none" transform="translate(138, 0)">
                  <path d="M0 -12 L10 -6 L10 6 L0 12 L-10 6 L-10 -6 Z" fill="none" stroke="#FFFFFF" strokeLinejoin="round" strokeWidth="1.6" />
                  <path d="M0 -12 L0 0 L10 6 M0 0 L-10 6" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text fill="#FFFFFF" fontSize="11" fontWeight="600" textAnchor="middle" y="19">Spatial</text>
                  <text fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle" y="32">70%</text>
                </g>
              </g>

              {/* 4. Bodily Kinesthetic (85%) - Bottom-Right */}
              <g
                onClick={() => handleItemClick('bodily-kinesthetic')}
                onMouseEnter={() => setHoveredSlice('bodily-kinesthetic')}
                onMouseLeave={() => setHoveredSlice(null)}
                className="transition-transform duration-150 hover:scale-102 origin-center"
              >
                <path
                  d="M 183.47 79.75 A 200 200 0 0 1 79.75 183.47 L 32.70 75.22 A 82 82 0 0 0 75.22 32.70 Z"
                  fill="#FDB022"
                  className={hoveredSlice === 'bodily-kinesthetic' ? 'brightness-110' : ''}
                />
                <g className="text-white fill-white text-center pointer-events-none" transform="translate(96, 96)">
                  <circle cx="-1" cy="-10" fill="#FFFFFF" r="2.5" />
                  <path d="M-3 -6 L1 -3 L5 -5 M-1 -3 L-4 2 L-1 5 M-4 2 L-7 3 M1 -3 L3 4 L6 5" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                  <text fill="#FFFFFF" fontSize="9.5" fontWeight="600" textAnchor="middle" y="15">Bodily</text>
                  <text fill="#FFFFFF" fontSize="8.5" fontWeight="600" textAnchor="middle" y="25">Kinesthetic</text>
                  <text fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle" y="38">85%</text>
                </g>
              </g>

              {/* 5. Musical (75%) - Bottom */}
              <g
                onClick={() => handleItemClick('musical')}
                onMouseEnter={() => setHoveredSlice('musical')}
                onMouseLeave={() => setHoveredSlice(null)}
                className="transition-transform duration-150 hover:scale-102 origin-center"
              >
                <path
                  d="M 73.18 186.41 A 200 200 0 0 1 -75.95 185.3 L -31.14 75.87 A 82 82 0 0 0 30.01 76.33 Z"
                  fill="#48BB78"
                  className={hoveredSlice === 'musical' ? 'brightness-110' : ''}
                />
                <g className="text-white fill-white text-center pointer-events-none" transform="translate(0, 138)">
                  <path d="M-4 -3 L-4 -11 L6 -8 L6 0 M-4 -5 L6 -2" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
                  <ellipse cx="-6" cy="-2" fill="#FFFFFF" rx="3" ry="2.2" />
                  <ellipse cx="4" cy="1" fill="#FFFFFF" rx="3" ry="2.2" />
                  <text fill="#FFFFFF" fontSize="11" fontWeight="600" textAnchor="middle" y="16">Musical</text>
                  <text fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle" y="29">75%</text>
                </g>
              </g>

              {/* 6. Interpersonal (80%) - Bottom-Left */}
              <g
                onClick={() => handleItemClick('interpersonal')}
                onMouseEnter={() => setHoveredSlice('interpersonal')}
                onMouseLeave={() => setHoveredSlice(null)}
                className="transition-transform duration-150 hover:scale-102 origin-center"
              >
                <path
                  d="M -79.75 183.47 A 200 200 0 0 1 -183.47 79.75 L -75.22 32.70 A 82 82 0 0 0 -32.70 75.22 Z"
                  fill="#20B2AA"
                  className={hoveredSlice === 'interpersonal' ? 'brightness-110' : ''}
                />
                <g className="text-white fill-white text-center pointer-events-none" transform="translate(-96, 96)">
                  <circle cx="0" cy="-9" fill="#FFFFFF" r="2.8" />
                  <path d="M-6 -2 C-6 -5 -3 -6 0 -6 C3 -6 6 -5 6 -2" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="1.5" />
                  <circle cx="-6.5" cy="-8" fill="#FFFFFF" r="2" />
                  <circle cx="6.5" cy="-8" fill="#FFFFFF" r="2" />
                  <path d="M-10 -2 C-10 -4 -8 -5 -5.5 -5 M5.5 -5 C8 -5 10 -4 10 -2" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="1.3" />
                  <text fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle" y="18">Interpersonal</text>
                  <text fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle" y="31">80%</text>
                </g>
              </g>

              {/* 7. Intrapersonal (70%) - Left */}
              <g
                onClick={() => handleItemClick('intrapersonal')}
                onMouseEnter={() => setHoveredSlice('intrapersonal')}
                onMouseLeave={() => setHoveredSlice(null)}
                className="transition-transform duration-150 hover:scale-102 origin-center"
              >
                <path
                  d="M -186.08 73.34 A 200 200 0 0 1 -186.08 -73.34 L -76.29 -30.07 A 82 82 0 0 0 -76.29 30.07 Z"
                  fill="#2D7FF9"
                  className={hoveredSlice === 'intrapersonal' ? 'brightness-110' : ''}
                />
                <g className="text-white fill-white text-center pointer-events-none" transform="translate(-138, 0)">
                  <circle cx="0" cy="-8" fill="none" r="3.5" stroke="#FFFFFF" strokeWidth="1.8" />
                  <path d="M-7 4 C-7 -1 -4 -3 0 -3 C4 -3 7 -1 7 4" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="1.8" />
                  <text fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle" y="18">Intrapersonal</text>
                  <text fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle" y="31">70%</text>
                </g>
              </g>

              {/* 8. Naturalistic (65%) - Top-Left */}
              <g
                onClick={() => handleItemClick('naturalistic')}
                onMouseEnter={() => setHoveredSlice('naturalistic')}
                onMouseLeave={() => setHoveredSlice(null)}
                className="transition-transform duration-150 hover:scale-102 origin-center"
              >
                <path
                  d="M -183.47 -79.75 A 200 200 0 0 1 -79.75 -183.47 L -32.70 -75.22 A 82 82 0 0 0 -75.22 -32.70 Z"
                  fill="#586EE0"
                  className={hoveredSlice === 'naturalistic' ? 'brightness-110' : ''}
                />
                <g className="text-white fill-white text-center pointer-events-none" transform="translate(-96, -96)">
                  <path d="M-6 4 C-8 -4 0 -11 7 -10 C8 -3 1 5 -6 4 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.7" />
                  <path d="M-5 3 L3 -5" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="1.5" />
                  <text fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle" y="17">Naturalistic</text>
                  <text fill="#FFFFFF" fontSize="12" fontWeight="700" textAnchor="middle" y="30">65%</text>
                </g>
              </g>

              {/* Center White Badge Circle */}
              <circle cx="0" cy="0" fill="#FFFFFF" filter="url(#centerShadow)" r="72" />

              {/* Center Content: Brain Icon & Text */}
              <g transform="translate(0, -18)">
                <path d="M-3 -10 C-7 -14 -16 -12 -17 -3 C-20 -2 -20 6 -16 9 C-15 13 -9 15 -3 13 C-2 13 -2 14 -2 16" fill="none" stroke="#7948EA" strokeLinecap="round" strokeWidth="2" />
                <path d="M3 -10 C7 -14 16 -12 17 -3 C20 -2 20 6 16 9 C15 13 9 15 3 13 C2 13 2 14 2 16" fill="none" stroke="#7948EA" strokeLinecap="round" strokeWidth="2" />
                <path d="M-2 -8 C-8 -8 -11 -3 -9 2 C-7 7 -2 7 -2 5" fill="none" stroke="#7948EA" strokeLinecap="round" strokeWidth="1.8" />
                <path d="M2 -8 C8 -8 11 -3 9 2 C7 7 2 7 2 5" fill="none" stroke="#7948EA" strokeLinecap="round" strokeWidth="1.8" />
              </g>
              <text fill="#1E293B" fontSize="12" fontWeight="700" textAnchor="middle" x="0" y="14">8 Multiple</text>
              <text fill="#1E293B" fontSize="12" fontWeight="700" textAnchor="middle" x="0" y="29">Intelligences</text>
            </svg>
          </div>
        </section>

        {/* All Scores List Section */}
        <section className="mt-8 mb-6">
          <h2 className="text-[15px] font-bold text-slate-900 tracking-tight mb-4">All 8 Intelligence Scores</h2>
          <div className="space-y-4">
            {intelligenceList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 p-1.5 -mx-1.5 rounded-xl transition"
              >
                <div className="flex items-center space-x-3 w-[45%] flex-shrink-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    {/* Unique Icon Per Intelligence */}
                    {item.id === 'bodily-kinesthetic' && (
                      <svg className="w-4 h-4 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                        <path clipRule="evenodd" d="M10 2a2 2 0 100-4 2 2 0 000 4zm-1.8 4.2c-.3-.2-.7-.2-1 .1L4.4 9.1a1 1 0 101.4 1.4l1.9-1.9v4.2l-2.1 2.8a1 1 0 001.6 1.2l2.6-3.4c.2-.3.3-.6.3-.9v-3.8l1.4 1.1a1 1 0 001.3-.1l2.4-2.4a1 1 0 10-1.4-1.4l-1.7 1.7-2.6-2z" fillRule="evenodd" />
                      </svg>
                    )}
                    {item.id === 'linguistic' && (
                      <svg className="w-4 h-4 text-[#884CED]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {item.id === 'interpersonal' && (
                      <svg className="w-4 h-4 text-[#1FB2AA]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 16v-1a4.002 4.002 0 00-2.584-3.738A5.986 5.986 0 0115 15v1h1zM5.584 11.262A4.002 4.002 0 003 15v1h1v-1a5.986 5.986 0 011.584-3.738z" />
                      </svg>
                    )}
                    {item.id === 'logical-mathematical' && (
                      <svg className="w-4 h-4 text-[#F45A7E]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect height="20" rx="3" width="16" x="4" y="2" />
                        <line strokeLinecap="round" x1="8" x2="16" y1="6" y2="6" />
                        <circle cx="8" cy="11" fill="currentColor" r="1" />
                        <circle cx="12" cy="11" fill="currentColor" r="1" />
                        <circle cx="16" cy="11" fill="currentColor" r="1" />
                        <circle cx="8" cy="16" fill="currentColor" r="1" />
                      </svg>
                    )}
                    {item.id === 'musical' && (
                      <svg className="w-4 h-4 text-[#48BB78]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                      </svg>
                    )}
                    {item.id === 'intrapersonal' && (
                      <svg className="w-4 h-4 text-[#2D7FF9]" fill="currentColor" viewBox="0 0 20 20">
                        <path clipRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" fillRule="evenodd" />
                      </svg>
                    )}
                    {item.id === 'spatial' && (
                      <svg className="w-4 h-4 text-[#F47B25]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {item.id === 'naturalistic' && (
                      <svg className="w-4 h-4 text-[#586EE0]" fill="currentColor" viewBox="0 0 20 20">
                        <path clipRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" fillRule="evenodd" />
                      </svg>
                    )}
                  </div>

                  <div className="w-full pr-1">
                    <span className="text-[11.5px] font-bold text-slate-800 block truncate">
                      {item.name}
                    </span>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.score}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className="text-[12px] font-bold text-slate-800 w-8 text-right">
                    {item.score}%
                  </span>
                  <span
                    className="px-2 py-0.5 text-[10px] font-semibold rounded-full min-w-[70px] text-center flex items-center justify-center space-x-1"
                    style={{ backgroundColor: item.badgeBg, color: item.badgeText }}
                  >
                    {!isPremium && <span className="text-[9px]">🔒</span>}
                    <span>{item.ratingText}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Button */}
        <section className="mt-8 mb-4">
          <button
            onClick={handleReportClick}
            className={`w-full py-3.5 text-white font-semibold text-[15px] rounded-xl shadow-md active:scale-[0.99] transition duration-150 cursor-pointer flex items-center justify-center space-x-2 ${
              !isPremium
                ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-600 shadow-amber-500/25'
                : 'bg-gradient-to-r from-[#4E3BF5] to-[#6035F7] shadow-indigo-500/25'
            }`}
            type="button"
          >
            <span>{!isPremium ? '🔒 Unlock In-Depth Report & Exercises' : 'View Full Report'}</span>
            {!isPremium && <span>👑</span>}
          </button>
        </section>
      </main>
    </div>
  );
};
