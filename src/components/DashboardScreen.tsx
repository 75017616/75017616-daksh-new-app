import React, { useState } from 'react';
import { ScreenType, StudentProfile } from '../types';
import { HeaderStatusBar } from './HeaderStatusBar';
import { FocusTimerModal } from './FocusTimerModal';
import { StreamSelectorModal } from './StreamSelectorModal';
import { CognitiveBadgesModal } from './CognitiveBadgesModal';
import { DailyDrillsModal } from './DailyDrillsModal';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenType, payload?: any) => void;
  activeProfile: StudentProfile;
  profiles: StudentProfile[];
  onSelectProfile: (profile: StudentProfile) => void;
  onOpenAIChat: (initialPrompt?: string) => void;
  onOpenUpgrade: () => void;
  onAddMember: () => void;
  isPremium?: boolean;
  onOpenLiveCounselor?: () => void;
  onTogglePlan?: () => void;
  onOpenAndroidModal?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  activeProfile,
  profiles,
  onSelectProfile,
  onOpenAIChat,
  onOpenUpgrade,
  onAddMember,
  isPremium = false,
  onOpenLiveCounselor,
  onTogglePlan,
  onOpenAndroidModal,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showFocusTimer, setShowFocusTimer] = useState(false);
  const [showStreamSelector, setShowStreamSelector] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showDailyDrills, setShowDailyDrills] = useState(false);
  const [focusModeActive, setFocusModeActive] = useState(false);
  const [remindersActive, setRemindersActive] = useState(true);

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-full bg-[#F8FAFC] pb-6 select-none flex flex-col relative">
      {/* Unified Sticky Top App Bar & Menu */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs shrink-0">
        {/* iOS Status Bar */}
        <HeaderStatusBar darkText={true} />

        {/* Main Clean Header Bar */}
        <div className="px-3.5 pt-1 pb-2 flex items-center justify-between">
          {/* User Info & Hamburger Menu Trigger */}
          <div className="flex items-center space-x-2">
            {/* Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setShowDrawer(true)}
              aria-label="Open navigation menu"
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 flex items-center justify-center transition active:scale-95 cursor-pointer border border-slate-200/70 shadow-2xs group relative"
            >
              <svg className="w-5 h-5 stroke-[2.2] transition-transform group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {/* Dot badge on menu icon indicating rich drawer */}
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-indigo-600" />
            </button>

            {/* Avatar & Profile Switcher Trigger */}
            <div
              onClick={() => setShowDrawer(true)}
              className="flex items-center space-x-2 py-1 px-1.5 rounded-full hover:bg-slate-100/80 transition cursor-pointer group"
            >
              <div className="relative w-8 h-8 rounded-full border border-indigo-200 p-0.5 bg-gradient-to-tr from-indigo-500 to-purple-400 shadow-2xs shrink-0">
                <div className="w-full h-full rounded-full bg-amber-100 flex items-center justify-center overflow-hidden text-base">
                  {activeProfile.avatar}
                </div>
                {/* Active online pip */}
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-slate-900 text-xs tracking-tight leading-none group-hover:text-indigo-600 transition">
                    {activeProfile.name}
                  </span>
                  <svg className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                  </svg>
                </div>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="text-[9.5px] font-semibold text-slate-500">
                    {activeProfile.grade || activeProfile.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Header Actions: Clean, uncluttered essentials */}
          <div className="flex items-center space-x-1.5">
            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center transition active:scale-95 cursor-pointer relative ${
                notificationsOpen
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                  : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200/60 text-slate-600'
              }`}
              title="Notifications & Insights"
              aria-label="Notifications"
            >
              <svg className="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 ring-1 ring-white" />
            </button>

            {/* Plan / Upgrade Chip */}
            <button
              type="button"
              onClick={onOpenUpgrade}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-xl text-[10.5px] font-bold border transition active:scale-95 cursor-pointer shadow-2xs ${
                !isPremium
                  ? 'bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border-amber-300 text-amber-900'
                  : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800'
              }`}
              title={!isPremium ? "Upgrade Plan" : "Family Plan Active"}
            >
              <span>👑</span>
              <span>{!isPremium ? 'Upgrade' : 'Pro'}</span>
            </button>
          </div>
        </div>

        {/* Quick notification popover */}
        {notificationsOpen && (
          <div className="mx-4 mb-2 p-3.5 bg-white border border-indigo-100 rounded-2xl shadow-xl text-xs space-y-2 animate-in fade-in">
            <div className="flex justify-between items-center font-bold text-slate-800">
              <span className="flex items-center space-x-1.5">
                <span>🔔</span>
                <span>Student Intelligence Alerts</span>
              </span>
              <button onClick={() => setNotificationsOpen(false)} className="text-slate-400 hover:text-slate-700 text-xs">✕</button>
            </div>
            <div className="p-2 bg-emerald-50 rounded-xl text-[11px] text-emerald-900 border border-emerald-100">
              🎉 <strong>{activeProfile.name}</strong> completed the comprehensive cognitive battery (96% accuracy).
            </div>
            <div className="p-2 bg-indigo-50 rounded-xl text-[11px] text-indigo-900 border border-indigo-100">
              💡 <strong>Vayo Insight:</strong> Your high visual dominance (88%) suggests creating 3D diagram notes for Class 8 exams.
            </div>
          </div>
        )}
      </header>

      {/* Main Content Body */}
      <main className="px-4 space-y-4 flex-grow pt-2">
        {/* Switch Profile Section */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-bold text-slate-900 tracking-wide">Switch Profile</h2>
            <button
              onClick={onAddMember}
              className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700 text-xs font-semibold cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span className="text-[11px]">Manage Family</span>
            </button>
          </div>

          {/* Horizontal Family Avatars */}
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar pt-1 pb-1 gap-2">
            {profiles.map((p) => {
              const isActive = p.id === activeProfile.id;
              return (
                <div
                  key={p.id}
                  onClick={() => onSelectProfile(p)}
                  className="flex flex-col items-center flex-shrink-0 cursor-pointer transition transform active:scale-95"
                >
                  <div className="relative">
                    <div
                      className={`w-13 h-13 p-0.5 rounded-full border-2 transition ${
                        isActive ? 'border-indigo-600 scale-105' : 'border-slate-200 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center text-xl overflow-hidden shadow-inner">
                        {p.avatar}
                      </div>
                    </div>
                    {isActive && (
                      <div className="absolute -top-0.5 -right-0.5 bg-indigo-600 rounded-full w-4 h-4 flex items-center justify-center border-2 border-white text-white">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className={`text-xs mt-1.5 leading-tight ${isActive ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                    {p.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium leading-tight">
                    {p.role}
                  </span>
                </div>
              );
            })}

            {/* Add Member Button */}
            <div
              onClick={onAddMember}
              className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-indigo-200 bg-indigo-50/50 flex items-center justify-center text-indigo-600 transition group-hover:bg-indigo-100 group-hover:scale-105">
                <svg className="w-5 h-5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xs font-medium text-slate-600 mt-1.5 leading-tight">Add</span>
              <span className="text-[10px] text-slate-400 leading-tight">Member</span>
            </div>
          </div>
        </section>

        {/* AI Counselor Banner */}
        <section className="rounded-3xl p-5 text-white relative overflow-hidden shadow-lg bg-gradient-to-br from-[#1e1363] via-[#321f9c] to-[#241372]">
          {/* Decorative Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-4 right-1/3 text-yellow-300 text-xs opacity-60">✦</div>
          <div className="absolute bottom-8 left-1/4 text-indigo-300 text-sm opacity-40">✧</div>

          {/* Top Badge */}
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-white/10 rounded-full text-[10px] tracking-wider uppercase font-semibold text-indigo-200 backdrop-blur-sm border border-white/10 mb-2">
            <span>✨</span>
            <span>VAYO • AI COUNSELOR</span>
          </div>

          <div className="grid grid-cols-12 gap-2 relative z-10">
            {/* Left Area */}
            <div className="col-span-7">
              <h3 className="text-lg font-bold tracking-tight mb-1 text-white">Hi {activeProfile.name}! 👋</h3>
              <p className="text-[11px] text-indigo-100/90 leading-relaxed mb-3">
                I'm <strong className="text-cyan-300">Vayo</strong>. I've analyzed your DISC, Personality and SWOT profile. Ask me anything, I'm here to guide your best future.
              </p>

              {/* Action Buttons */}
              <div className="space-y-1.5">
                <button
                  onClick={() => onOpenAIChat()}
                  className="w-full bg-white text-indigo-950 font-bold py-2 px-3 rounded-xl shadow-md flex items-center justify-center space-x-1.5 text-xs hover:bg-slate-50 transition active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-indigo-600 fill-current" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                  </svg>
                  <span>Chat with Vayo</span>
                </button>

                {onOpenLiveCounselor && (
                  <button
                    onClick={onOpenLiveCounselor}
                    className="w-full bg-emerald-500/30 hover:bg-emerald-500/40 border border-emerald-400/50 text-emerald-200 font-bold py-1.5 px-3 rounded-xl flex items-center justify-center space-x-1 text-[10.5px] transition active:scale-95 cursor-pointer"
                  >
                    <span>🧑‍⚕️</span>
                    <span>Connect with Live Counselor</span>
                  </button>
                )}
              </div>

              <div className="text-[10px] text-indigo-200 font-medium mt-2">
                {!isPremium ? (
                  <span>Free Basic AI: <strong className="text-white">3 queries</strong> • Then Live Counselor</span>
                ) : (
                  <span className="text-emerald-300 font-bold">👑 Unlimited AI Counselor Active</span>
                )}
              </div>
            </div>

            {/* Right Column: Chips & 3D Robot */}
            <div className="col-span-5 flex flex-col items-center justify-between relative pl-1">
              {/* Upper Floating Chips */}
              <div className="w-full space-y-1.5 text-[9px] font-semibold text-indigo-100 flex flex-col items-end">
                <button
                  onClick={() => onOpenAIChat('Tell me my best career matches')}
                  className="bg-indigo-900/60 hover:bg-indigo-900/90 backdrop-blur-md px-2 py-1 rounded-md border border-indigo-400/30 flex items-center space-x-1 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <span>🎯</span> <span>Best Career</span>
                </button>
                <button
                  onClick={() => onOpenAIChat('What are my top strengths?')}
                  className="bg-indigo-900/60 hover:bg-indigo-900/90 backdrop-blur-md px-2 py-1 rounded-md border border-indigo-400/30 flex items-center space-x-1 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <span>⭐</span> <span>My Strengths</span>
                </button>
              </div>

              {/* 3D Robot Graphic Representation */}
              <div
                onClick={() => onOpenAIChat()}
                className="relative my-1 cursor-pointer transition transform hover:scale-105 active:scale-95"
              >
                <div className="w-20 h-20 bg-gradient-to-tr from-indigo-300/40 to-white/40 rounded-full absolute -inset-1 blur-md animate-pulse" />
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-white to-slate-200 shadow-xl border border-white/50 flex flex-col items-center justify-center p-1.5">
                  <div className="w-14 h-8 bg-slate-900 rounded-lg flex items-center justify-center space-x-2 border border-slate-700 shadow-inner">
                    <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                    <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                  </div>
                  <div className="mt-1 flex items-center justify-center px-1.5 py-0.5 rounded-full bg-indigo-600 text-[7px] font-black text-white tracking-wider">
                    VAYO
                  </div>
                </div>
              </div>

              {/* Lower Floating Chips */}
              <div className="w-full space-y-1.5 text-[9px] font-semibold text-indigo-100 flex flex-col items-end">
                <button
                  onClick={() => onOpenAIChat('How can I improve my weak areas?')}
                  className="bg-indigo-900/60 hover:bg-indigo-900/90 backdrop-blur-md px-2 py-1 rounded-md border border-indigo-400/30 flex items-center space-x-1 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <span>📈</span> <span>How can I improve?</span>
                </button>
                <button
                  onClick={() => onOpenAIChat('Create a personalized growth plan')}
                  className="bg-indigo-900/60 hover:bg-indigo-900/90 backdrop-blur-md px-2 py-1 rounded-md border border-indigo-400/30 flex items-center space-x-1 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <span>📋</span> <span>Create Growth Plan</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Report Analysis Cards Section */}
        <section className="space-y-3.5">
          {/* FEATURED CARD: Personality Type (100% Free Forever) */}
          <article className="bg-gradient-to-br from-purple-50/60 via-white to-emerald-50/40 rounded-2xl p-4 shadow-sm border-2 border-purple-300 hover:border-purple-400 transition relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg shadow-2xs">
                  🎯
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="text-xs font-bold text-slate-900 tracking-tight">PERSONALITY BLEND</h4>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] px-2 py-0.5 rounded-full font-extrabold border border-emerald-300">
                      ✨ 100% FREE
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Dominate (65%) & Influential (35%) • Full Report Unlocked
                  </p>
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-[9px] px-2 py-0.5 rounded-full font-bold">
                ✓ Free Pass
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex-1 pr-3 flex items-center space-x-2">
                <span className="text-[10px] font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-lg">
                  Primary: Dominate 65%
                </span>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-lg">
                  Secondary: Influential 35%
                </span>
              </div>

              <button
                onClick={() => onNavigate('personality')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-xl flex flex-col items-center justify-center transition ml-2 shadow-xs cursor-pointer active:scale-95"
              >
                <span className="text-xs mb-0.5">👁️</span>
                <span className="text-[9px] font-bold leading-tight text-center">
                  View Free<br />Report
                </span>
              </button>
            </div>
          </article>

          {/* Freemium Notice Box */}
          {!isPremium && (
            <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl flex items-center justify-between shadow-2xs">
              <div className="flex items-center space-x-2.5 pr-2">
                <span className="text-lg">🔒</span>
                <div>
                  <p className="text-[11px] font-bold text-amber-950">Remaining Elements Locked in Free Tier</p>
                  <p className="text-[10px] text-amber-800 leading-tight">
                    Status indicators shown below. Deep assessments unlock once paid.
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenUpgrade}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-xl shrink-0 transition active:scale-95 cursor-pointer shadow-xs"
              >
                Unlock 👑
              </button>
            </div>
          )}

          {/* Card 2: 8 Multiple Intelligence */}
          <article className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:border-blue-200 transition">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                💠
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-slate-800 tracking-tight">8 MULTIPLE INTELLIGENCE</h4>
                  {!isPremium ? (
                    <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center space-x-0.5">
                      <span>🔒</span>
                      <span>Status Only</span>
                    </span>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] px-2 py-0.5 rounded-full font-bold">
                      ✓ Unlocked
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 leading-tight truncate">
                  8 key intelligences with learning styles & career alignments.
                </p>
              </div>
            </div>

            <div className="flex items-end justify-between pt-1">
              {/* Simulated 8 Intelligence Bar Chart */}
              <div className="flex items-end space-x-2 flex-1 h-14 px-2 pb-1">
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-2.5 bg-blue-300 rounded-t-sm h-7" />
                  <span className="text-[8px] text-slate-400">📖</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-2.5 bg-cyan-400 rounded-t-sm h-10" />
                  <span className="text-[8px] text-slate-400">🔢</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-2.5 bg-emerald-300 rounded-t-sm h-11" />
                  <span className="text-[8px] text-slate-400">🎨</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-2.5 bg-amber-300 rounded-t-sm h-9" />
                  <span className="text-[8px] text-slate-400">👥</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-2.5 bg-rose-300 rounded-t-sm h-12" />
                  <span className="text-[8px] text-slate-400">🎵</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-2.5 bg-sky-300 rounded-t-sm h-13" />
                  <span className="text-[8px] text-slate-400">🏃</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-2.5 bg-indigo-300 rounded-t-sm h-8" />
                  <span className="text-[8px] text-slate-400">🧘</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-2.5 bg-teal-300 rounded-t-sm h-10" />
                  <span className="text-[8px] text-slate-400">🌿</span>
                </div>
              </div>

              <button
                onClick={() => (!isPremium ? onOpenUpgrade() : onNavigate('eight_intelligence'))}
                className={`px-3 py-2 rounded-xl flex flex-col items-center justify-center transition ml-2 cursor-pointer ${
                  !isPremium
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'
                }`}
              >
                <span className="text-xs mb-0.5">{!isPremium ? '🔒' : '🔓'}</span>
                <span className="text-[9px] font-bold leading-tight text-center">
                  {!isPremium ? 'Unlock\nMatrix' : 'View\nFull Report'}
                </span>
              </button>
            </div>
          </article>

          {/* Card 3: 5 Senses Analysis */}
          <article className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:border-teal-200 transition">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-lg">
                👁️
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-slate-800 tracking-tight">5 SENSES ANALYSIS</h4>
                  {!isPremium ? (
                    <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center space-x-0.5">
                      <span>🔒</span>
                      <span>Status Only</span>
                    </span>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] px-2 py-0.5 rounded-full font-bold">
                      ✓ Unlocked
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Vision, Hearing, Touch, Smell & Taste status preview.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2 flex-1 justify-around pr-2">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-cyan-50 flex items-center justify-center text-xs">👁️</div>
                  <span className="text-[9px] font-bold text-slate-700 mt-1">88%</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-xs">👂</div>
                  <span className="text-[9px] font-bold text-slate-700 mt-1">72%</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-xs">🖐️</div>
                  <span className="text-[9px] font-bold text-slate-700 mt-1">65%</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center text-xs">👃</div>
                  <span className="text-[9px] font-bold text-slate-700 mt-1">55%</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center text-xs">👅</div>
                  <span className="text-[9px] font-bold text-slate-700 mt-1">60%</span>
                </div>
              </div>

              <button
                onClick={() => (!isPremium ? onOpenUpgrade() : onNavigate('five_senses'))}
                className={`px-3 py-2 rounded-xl flex flex-col items-center justify-center transition ml-2 cursor-pointer ${
                  !isPremium
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                }`}
              >
                <span className="text-xs mb-0.5">{!isPremium ? '🔒' : '🔓'}</span>
                <span className="text-[9px] font-bold leading-tight text-center">
                  {!isPremium ? 'Unlock\nSenses' : 'View\nFull Report'}
                </span>
              </button>
            </div>
          </article>

          {/* Card 4: Brain Dominance */}
          <article className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:border-purple-200 transition">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg">
                🔮
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-slate-800 tracking-tight">BRAIN DOMINANCE</h4>
                  {!isPremium ? (
                    <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center space-x-0.5">
                      <span>🔒</span>
                      <span>Status Only</span>
                    </span>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] px-2 py-0.5 rounded-full font-bold">
                      ✓ Unlocked
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Discover which side of your brain is more dominant.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-3 flex-1">
                <div className="text-right">
                  <div className="text-xs font-extrabold text-indigo-700">48%</div>
                  <div className="text-[9px] text-slate-400 font-medium">Left Brain</div>
                </div>

                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'conic-gradient(#4f46e5 0% 48%, #a855f7 48% 100%)' }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-inner">
                      <span className="text-[10px] text-indigo-600">{!isPremium ? '🔒' : '🧠'}</span>
                    </div>
                  </div>
                </div>

                <div className="text-left">
                  <div className="text-xs font-extrabold text-purple-600">52%</div>
                  <div className="text-[9px] text-slate-400 font-medium">Right Brain</div>
                </div>
              </div>

              <button
                onClick={() => (!isPremium ? onOpenUpgrade() : onNavigate('brain_dominance'))}
                className={`px-3 py-2 rounded-xl flex flex-col items-center justify-center transition ml-2 cursor-pointer ${
                  !isPremium
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'
                }`}
              >
                <span className="text-xs mb-0.5">{!isPremium ? '🔒' : '🔓'}</span>
                <span className="text-[9px] font-bold leading-tight text-center">
                  {!isPremium ? 'Unlock\nBrain' : 'View\nFull Report'}
                </span>
              </button>
            </div>
          </article>

          {/* Card 5: DISC Analysis */}
          <article className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:border-emerald-200 transition">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                  🧬
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs font-bold text-slate-800 tracking-tight">DISC ANALYSIS</h4>
                    <span className="bg-emerald-50 text-emerald-600 text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center space-x-0.5">
                      <span>✓</span>
                      <span>Completed</span>
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Your behavioral and cognitive markers reveal unique potential and talents.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-3 flex-1 pr-4">
                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-slate-500">Left Brain</span>
                    <span className="text-blue-600 font-bold">48%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '48%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-slate-500">Right Brain</span>
                    <span className="text-emerald-500 font-bold">52%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '52%' }} />
                  </div>
                </div>
              </div>

              <div className="relative w-14 h-14 flex items-center justify-center mr-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-400 to-emerald-400 flex items-center justify-center shadow-inner">
                  <span className="text-xl">🧠</span>
                </div>
              </div>

              <button
                onClick={() => (!isPremium ? onOpenUpgrade() : onNavigate('brain_dominance'))}
                aria-label="View DISC Report"
                className="flex flex-col items-center justify-center pl-2 group cursor-pointer focus:outline-none"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition shadow-sm ${
                  !isPremium ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
                }`}>
                  {!isPremium ? (
                    <span className="text-xs">🔒</span>
                  ) : (
                    <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-[9px] font-semibold text-slate-500 mt-1 leading-tight text-center">
                  {!isPremium ? 'Unlock\nDISC' : 'View\nFull Report'}
                </span>
              </button>
            </div>
          </article>

          {/* Card 6: SWOT Analysis */}
          <article className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:border-amber-200 transition">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center text-lg">
                🛡️
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-slate-800 tracking-tight">SWOT ANALYSIS</h4>
                  <span className="bg-emerald-50 text-emerald-600 text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center space-x-0.5">
                    <span>✓</span>
                    <span>Completed</span>
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Understand your strengths, work on weaknesses and grab opportunities.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="grid grid-cols-4 gap-1.5 flex-1 pr-3">
                <div className="bg-amber-50/80 rounded-xl p-2 flex flex-col items-center justify-center border border-amber-100/50">
                  <span className="text-xs">🏆</span>
                  <span className="text-[9px] text-slate-400 font-medium">Strengths</span>
                  <span className="text-xs font-extrabold text-amber-600">12</span>
                </div>
                <div className="bg-rose-50/80 rounded-xl p-2 flex flex-col items-center justify-center border border-rose-100/50">
                  <span className="text-xs">🎗️</span>
                  <span className="text-[9px] text-slate-400 font-medium">Weaknesses</span>
                  <span className="text-xs font-extrabold text-rose-500">05</span>
                </div>
                <div className="bg-emerald-50/80 rounded-xl p-2 flex flex-col items-center justify-center border border-emerald-100/50">
                  <span className="text-xs">🎯</span>
                  <span className="text-[9px] text-slate-400 font-medium">Opportunities</span>
                  <span className="text-xs font-extrabold text-emerald-600">08</span>
                </div>
                <div className="bg-orange-50/80 rounded-xl p-2 flex flex-col items-center justify-center border border-orange-100/50">
                  <span className="text-xs">⚠️</span>
                  <span className="text-[9px] text-slate-400 font-medium">Threats</span>
                  <span className="text-xs font-extrabold text-orange-600">03</span>
                </div>
              </div>

              <button
                onClick={() => (!isPremium ? onOpenUpgrade() : onNavigate('swot'))}
                aria-label="View Full SWOT Report"
                className="flex flex-col items-center justify-center pl-1 group cursor-pointer focus:outline-none"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition shadow-sm ${
                  !isPremium ? 'bg-amber-50 text-amber-700' : 'bg-orange-50 text-orange-500 group-hover:bg-orange-100'
                }`}>
                  {!isPremium ? (
                    <span className="text-xs">🔒</span>
                  ) : (
                    <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-[9px] font-semibold text-slate-500 mt-1 leading-tight text-center">
                  {!isPremium ? 'Unlock\nSWOT' : 'View\nFull Report'}
                </span>
              </button>
            </div>
          </article>

          {/* Card 7: Career Match */}
          <article className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:border-amber-200 transition">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center text-lg">
                💼
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-slate-800 tracking-tight">CAREER MATCH</h4>
                  {!isPremium ? (
                    <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center space-x-0.5">
                      <span>🔒</span>
                      <span>Top 1 Only</span>
                    </span>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] px-2 py-0.5 rounded-full font-bold">
                      ✓ 20+ Unlocked
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Top careers matching your cognitive and sensory profile.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex-1 pr-3">
                <span className="text-[9px] text-slate-400 font-semibold block leading-tight">Top Match</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs font-extrabold text-slate-800">Software Engineer</span>
                  <span className="text-xs font-bold text-emerald-600">
                    94% <span className="text-[9px] text-slate-400 font-medium">Match</span>
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>

              <button
                onClick={() => (!isPremium ? onOpenUpgrade() : onNavigate('intelligence_detail', 'logical-mathematical'))}
                className={`px-3 py-2 rounded-xl flex flex-col items-center justify-center transition ml-2 cursor-pointer ${
                  !isPremium
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-700'
                }`}
              >
                <span className="text-xs mb-0.5">{!isPremium ? '🔒' : '🔓'}</span>
                <span className="text-[9px] font-bold leading-tight text-center">
                  {!isPremium ? 'Unlock\nCareers' : 'View\nCareers'}
                </span>
              </button>
            </div>
          </article>
        </section>

        {/* Upgrade Banner */}
        <section className={`rounded-2xl p-4 text-white shadow-md flex items-center justify-between ${
          !isPremium
            ? 'bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-800'
            : 'bg-gradient-to-r from-emerald-700 via-teal-800 to-indigo-900'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-xl flex-shrink-0">
              👑
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-tight">
                {!isPremium ? 'Unlock Your True Potential ✨' : 'Family Premium Active 👑'}
              </h4>
              <p className="text-[10px] text-indigo-200">
                {!isPremium
                  ? 'Upgrade to Premium to unlock 8 Intelligences, 5 Senses & Counselor'
                  : 'All assessments, roadmaps, and certified counseling are active.'}
              </p>
            </div>
          </div>
          <button
            onClick={onOpenUpgrade}
            className="bg-white text-indigo-900 font-bold px-3 py-2 rounded-xl text-[10px] shadow-sm flex items-center space-x-1 flex-shrink-0 hover:bg-slate-100 transition active:scale-95 cursor-pointer"
          >
            <span>👑</span>
            <span>{!isPremium ? 'Upgrade Now' : 'Manage Plan'}</span>
          </button>
        </section>
      </main>

      {/* Slide-over Drawer Overlay - strictly contained inside mobile frame */}
      {showDrawer && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-[88%] max-w-[320px] h-full bg-white flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200 border-r border-slate-200/80 overflow-hidden">
            {/* Drawer Header & Profile Card */}
            <div className="p-4 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white shrink-0 relative">
              <div className="flex items-center justify-between pb-3">
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-cyan-300 flex items-center space-x-1">
                  <span>✦</span>
                  <span>Daksh Intelligence Menu</span>
                </span>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center text-xs transition active:scale-95 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Active Profile Bar */}
              <div className="flex items-center space-x-3 pt-1">
                <div className="relative w-12 h-12 rounded-2xl border-2 border-indigo-400 p-0.5 bg-gradient-to-tr from-cyan-400 to-purple-400 shadow-md shrink-0">
                  <div className="w-full h-full rounded-xl bg-amber-100 flex items-center justify-center overflow-hidden text-2xl">
                    {activeProfile.avatar}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-extrabold text-white truncate">{activeProfile.name}</h3>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="text-[10px] text-cyan-200 font-semibold bg-white/10 px-1.5 py-0.2 rounded">
                      {activeProfile.role}
                    </span>
                    <span className="text-[10px] text-amber-300 font-bold bg-amber-400/20 px-1.5 py-0.2 rounded border border-amber-300/30">
                      👑 Family Plan
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Switch Row inside drawer */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-slate-300 font-medium">Switch Profile:</span>
                <div className="flex items-center space-x-1">
                  {profiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onSelectProfile(p)}
                      title={`Switch to ${p.name}`}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition border ${
                        p.id === activeProfile.id
                          ? 'border-cyan-400 bg-cyan-500/30 scale-110'
                          : 'border-white/20 bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {p.avatar}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setShowDrawer(false);
                      onAddMember();
                    }}
                    title="Add Member"
                    className="w-6 h-6 rounded-full border border-dashed border-white/40 flex items-center justify-center text-[10px] text-white/80 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Navigation Options */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar text-xs">
              {/* AI Mentor - Prominent Feature Card in Menu */}
              <div className="bg-gradient-to-r from-[#1e1363] via-[#372b8c] to-[#4f46e5] text-white rounded-2xl p-3 shadow-md border border-indigo-400/30">
                <button
                  type="button"
                  onClick={() => {
                    setShowDrawer(false);
                    onNavigate('mentor');
                  }}
                  className="w-full text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center text-lg shadow-xs border border-white/25 shrink-0">
                      🤖
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>AI Growth Mentor</span>
                        <span className="text-[9px] bg-cyan-400 text-slate-950 font-black px-1.5 py-0.2 rounded-md">Featured</span>
                      </div>
                      <div className="text-[10px] text-indigo-100 mt-0.5">Daily cognitive workouts & study roadmap</div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-white/80 group-hover:translate-x-0.5 transition">›</span>
                </button>
              </div>

              {/* Android App & APK Action Card */}
              <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-300/80 rounded-2xl p-3">
                <button
                  onClick={() => {
                    setShowDrawer(false);
                    onOpenAndroidModal?.();
                  }}
                  className="w-full text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm shadow-xs">
                      📱
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                        <span>Run on Android Phone</span>
                        <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded-md">APK</span>
                      </div>
                      <div className="text-[10px] text-emerald-700">1-Tap WebAPK or download APK</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-0.5 transition">›</span>
                </button>
              </div>

              {/* Category 1: Cognitive Assessments */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-1.5">
                  Cognitive Assessments
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setShowDrawer(false);
                      onNavigate('eight_intelligence');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-800 flex items-center justify-between group transition active:scale-98"
                  >
                    <span className="flex items-center space-x-2.5">
                      <span className="text-sm">💠</span>
                      <span>8 Multi-Intelligence Wheel</span>
                    </span>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      84%
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setShowDrawer(false);
                      onNavigate('brain_dominance');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-800 flex items-center justify-between group transition active:scale-98"
                  >
                    <span className="flex items-center space-x-2.5">
                      <span className="text-sm">🔮</span>
                      <span>Brain Dominance & Balance</span>
                    </span>
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                      65% Right
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setShowDrawer(false);
                      onNavigate('five_senses');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-800 flex items-center justify-between group transition active:scale-98"
                  >
                    <span className="flex items-center space-x-2.5">
                      <span className="text-sm">👁️</span>
                      <span>5 Senses Sensory Modalities</span>
                    </span>
                    <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                      Vision 88%
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setShowDrawer(false);
                      onNavigate('personality');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-800 flex items-center justify-between group transition active:scale-98"
                  >
                    <span className="flex items-center space-x-2.5">
                      <span className="text-sm">🎯</span>
                      <span>DISC Personality Blend</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Influential
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setShowDrawer(false);
                      onNavigate('swot');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-800 flex items-center justify-between group transition active:scale-98"
                  >
                    <span className="flex items-center space-x-2.5">
                      <span className="text-sm">🛡️</span>
                      <span>SWOT Analysis & Matrix</span>
                    </span>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      Full
                    </span>
                  </button>
                </div>
              </div>

              {/* Category 2: Academic & Career Tools */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-1.5">
                  Academic & Career Tools
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setShowDrawer(false);
                      onNavigate('mentor');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-800 flex items-center justify-between group transition active:scale-98"
                  >
                    <span className="flex items-center space-x-2.5">
                      <span className="text-sm">🤖</span>
                      <span>AI Growth Mentor</span>
                    </span>
                    <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded-md">
                      Coach
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setShowDrawer(false);
                      setShowStreamSelector(true);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-800 flex items-center justify-between group transition active:scale-98"
                  >
                    <span className="flex items-center space-x-2.5">
                      <span className="text-sm">🎓</span>
                      <span>High School Stream Predictor</span>
                    </span>
                    <span className="text-[9px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.2 rounded-md">
                      Class 9-11
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setShowDrawer(false);
                      setShowFocusTimer(true);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-800 flex items-center justify-between group transition active:scale-98"
                  >
                    <span className="flex items-center space-x-2.5">
                      <span className="text-sm">⏱️</span>
                      <span>Vayo Pomodoro Focus Timer</span>
                    </span>
                    <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded-md">
                      25m
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setShowDrawer(false);
                      setShowDailyDrills(true);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-800 flex items-center justify-between group transition active:scale-98"
                  >
                    <span className="flex items-center space-x-2.5">
                      <span className="text-sm">⚡</span>
                      <span>Daily Cognitive Drills</span>
                    </span>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                      Streak 4🔥
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setShowDrawer(false);
                      setShowBadges(true);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-800 flex items-center justify-between group transition active:scale-98"
                  >
                    <span className="flex items-center space-x-2.5">
                      <span className="text-sm">🏆</span>
                      <span>Cognitive Strengths Badges</span>
                    </span>
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded-md">
                      6 Unlocked
                    </span>
                  </button>
                </div>
              </div>

              {/* Category 3: Vayo AI & Certified Counselor */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-1.5">
                  AI & Human Counselors
                </span>
                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      setShowDrawer(false);
                      onOpenAIChat();
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200/80 font-bold text-indigo-900 flex items-center justify-between transition active:scale-98 cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-xl bg-slate-900 border border-cyan-400/50 flex items-center justify-center text-xs">
                        🤖
                      </div>
                      <div>
                        <span className="block text-xs leading-none">Consult Vayo AI</span>
                        <span className="text-[10px] text-indigo-600 font-medium">
                          {!isPremium ? 'Free Basic Mode (3 Qs)' : 'Unlimited Premium'}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-indigo-500 font-bold">›</span>
                  </button>

                  {onOpenLiveCounselor && (
                    <button
                      onClick={() => {
                        setShowDrawer(false);
                        onOpenLiveCounselor();
                      }}
                      className="w-full text-left p-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200/80 font-bold text-emerald-950 flex items-center justify-between transition active:scale-98 cursor-pointer shadow-2xs"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs">
                          🧑‍⚕️
                        </div>
                        <div>
                          <div className="flex items-center space-x-1">
                            <span className="block text-xs leading-none font-bold">Live Human Counselor</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          </div>
                          <span className="text-[10px] text-emerald-700 font-medium">1-on-1 Certified Specialist</span>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-600 font-bold">Book ›</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Category 4: Family & Subscription */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-1.5">
                  Plan & Family
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setShowDrawer(false);
                      onOpenUpgrade();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-semibold flex items-center justify-between group transition active:scale-98 cursor-pointer ${
                      !isPremium ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    }`}
                  >
                    <span className="flex items-center space-x-2.5">
                      <span className="text-sm">👑</span>
                      <span>{!isPremium ? 'Upgrade from Free Tier' : 'Family Plan Active'}</span>
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                      !isPremium ? 'text-amber-800 bg-amber-100' : 'text-emerald-800 bg-emerald-100'
                    }`}>
                      {!isPremium ? 'Upgrade' : 'Active'}
                    </span>
                  </button>

                  {onTogglePlan && (
                    <button
                      onClick={() => {
                        onTogglePlan();
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[10px] flex items-center justify-between transition cursor-pointer"
                    >
                      <span>Demo Mode Switch:</span>
                      <span className="font-bold text-indigo-700 underline">
                        {isPremium ? 'Switch to Free Tier' : 'Switch to Premium'}
                      </span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setShowDrawer(false);
                      onAddMember();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-800 flex items-center space-x-2.5 transition active:scale-98 cursor-pointer"
                  >
                    <span className="text-sm">👨‍👩‍👧</span>
                    <span>Add Family Member</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-3.5 border-t border-slate-100 bg-slate-50/80 shrink-0">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-bold text-slate-700">Daksh Student Pro</span>
                <span className="font-mono text-[10px]">v2.4.0</span>
              </div>
              <p className="text-[9px] text-slate-400 mt-0.5">
                AI DISC & Multi-Intelligence Comprehensive Battery
              </p>
            </div>
          </div>

          {/* Backdrop dismiss click area */}
          <div className="flex-1" onClick={() => setShowDrawer(false)} />
        </div>
      )}

      {/* Embedded Modals triggered from Top Bar and Drawer */}
      <FocusTimerModal
        isOpen={showFocusTimer}
        onClose={() => setShowFocusTimer(false)}
        studentName={activeProfile.name}
      />

      <StreamSelectorModal
        isOpen={showStreamSelector}
        onClose={() => setShowStreamSelector(false)}
        activeProfile={activeProfile}
        onOpenAIChat={onOpenAIChat}
      />

      <CognitiveBadgesModal
        isOpen={showBadges}
        onClose={() => setShowBadges(false)}
        activeProfile={activeProfile}
      />

      <DailyDrillsModal
        isOpen={showDailyDrills}
        onClose={() => setShowDailyDrills(false)}
        activeProfile={activeProfile}
      />
    </div>
  );
};

