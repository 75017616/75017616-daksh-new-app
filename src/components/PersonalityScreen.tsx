import React, { useState } from 'react';
import { HeaderStatusBar } from './HeaderStatusBar';
import { personalityData } from '../data/intelligenceData';
import { StudentProfile } from '../types';

interface PersonalityScreenProps {
  onBack: () => void;
  onViewFullReport: () => void;
  activeProfile?: StudentProfile;
  onOpenAIChat?: (prompt?: string) => void;
  onOpenUpgrade?: () => void;
  isPremium?: boolean;
}

type PersonalityTab = 'blend' | 'metrics' | 'scenarios' | 'coaching';
type ActiveFocus = 'all' | 'primary' | 'secondary';

export const PersonalityScreen: React.FC<PersonalityScreenProps> = ({
  onBack,
  onViewFullReport,
  activeProfile,
  onOpenAIChat,
  onOpenUpgrade,
  isPremium = false
}) => {
  const [activeTab, setActiveTab] = useState<PersonalityTab>('blend');
  const [activeFocus, setActiveFocus] = useState<ActiveFocus>('all');
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<'primary' | 'secondary' | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  const studentName = activeProfile?.name || 'Aarav';
  const archetype = personalityData.archetype;
  const primary = personalityData.primary;
  const secondary = personalityData.secondary;
  const dimensions = personalityData.dimensions;
  const scenarios = personalityData.scenarios;
  const roleModels = personalityData.roleModels;
  const topStrengths = personalityData.topStrengths;
  const mentorTips = personalityData.mentorTips;

  const handleShareSummary = () => {
    const summaryText = `${studentName}'s Personality Dossier:\n` +
      `Archetype: ${archetype.name} (${archetype.code})\n` +
      `Primary: ${primary.name} (${primary.percentage}%)\n` +
      `Secondary: ${secondary.name} (${secondary.percentage}%)\n` +
      `Superpower: ${archetype.superpower} - ${archetype.superpowerDesc}\n` +
      `Top Strengths: ${topStrengths.map((s) => s.title).join(', ')}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
    }
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2800);
  };

  const handleConsultAI = (customPrompt?: string) => {
    const prompt = customPrompt ||
      `I want to understand ${studentName}'s personality blend: ${archetype.name} (65% ${primary.name} + 35% ${secondary.name}). How can I best guide their academic focus and leadership potential?`;
    if (onOpenAIChat) {
      onOpenAIChat(prompt);
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-full bg-[#F8FAFC] pb-24 select-none flex flex-col relative text-slate-800">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shrink-0 shadow-2xs">
        <HeaderStatusBar darkText={true} />

        <nav className="w-full px-4 py-2.5 flex items-center justify-between relative">
          <button
            onClick={onBack}
            aria-label="Go Back to Dashboard"
            className="w-10 h-10 -ml-2 rounded-xl flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 transition-colors cursor-pointer"
            type="button"
          >
            <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="text-center">
            <h1 className="font-bold text-base text-slate-900 tracking-tight">
              Personality Profile
            </h1>
            <p className="text-[11px] text-slate-500 font-medium tracking-tight">
              {studentName} · Psychometric Synthesis
            </p>
          </div>

          <button
            onClick={handleShareSummary}
            aria-label="Share Personality Summary"
            title="Copy Personality Summary"
            className="w-10 h-10 -mr-2 rounded-xl flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70 transition-colors cursor-pointer"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </nav>

        {/* Tabbed Navigation Bar */}
        <div className="px-4 pt-1 pb-2.5 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('blend')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'blend'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
            type="button"
          >
            Archetype & Blend
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'metrics'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
            type="button"
          >
            Behavioral Metrics
          </button>
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'scenarios'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
            type="button"
          >
            In Action
          </button>
          <button
            onClick={() => setActiveTab('coaching')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'coaching'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
            type="button"
          >
            Mentor Playbook
          </button>
        </div>
      </header>

      {/* Copy Toast Alert */}
      {copiedToast && (
        <div className="mx-4 mt-2 px-3.5 py-2.5 bg-slate-900 text-white text-xs font-medium rounded-xl flex items-center justify-between shadow-lg transition-all animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center space-x-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Summary copied to clipboard for {studentName}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">READY TO SHARE</span>
        </div>
      )}

      {/* Main Scrollable Body */}
      <main className="flex-1 px-4 pt-3 space-y-4">

        {/* Hero Archetype Showcase Card */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden">
          {/* Subtle Ambient Aura Background */}
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-purple-500/8 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-emerald-500/8 blur-3xl pointer-events-none" />

          {/* Archetype Lead-In */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span>Primary DISC Synthesis</span>
            <span className="text-slate-700 font-semibold">{archetype.code}</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {archetype.name}
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-snug">
                {archetype.headline}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 flex items-center justify-center shrink-0 ml-3 text-lg shadow-2xs font-bold">
              ⚡
            </div>
          </div>

          {/* Interactive Donut & Dial Visualization */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col items-center">
            {/* Filter Toggle Buttons */}
            <div className="flex items-center justify-center space-x-1.5 mb-3 w-full">
              <button
                type="button"
                onClick={() => setActiveFocus('all')}
                className={`flex-1 py-1.5 px-2 text-[11px] font-semibold rounded-lg transition cursor-pointer text-center ${
                  activeFocus === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                Full Blend (65/35)
              </button>
              <button
                type="button"
                onClick={() => setActiveFocus('primary')}
                className={`flex-1 py-1.5 px-2 text-[11px] font-semibold rounded-lg transition cursor-pointer text-center ${
                  activeFocus === 'primary'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
                }`}
              >
                Dominate (65%)
              </button>
              <button
                type="button"
                onClick={() => setActiveFocus('secondary')}
                className={`flex-1 py-1.5 px-2 text-[11px] font-semibold rounded-lg transition cursor-pointer text-center ${
                  activeFocus === 'secondary'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                Influential (35%)
              </button>
            </div>

            {/* Visual Arc / Ring */}
            <div className="relative w-36 h-36 flex items-center justify-center my-1">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                {/* Background Ring Track */}
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="transparent"
                  stroke="#E2E8F0"
                  strokeWidth="16"
                />

                {/* Primary Segment: Dominate 65% (Circumference ~289.02; 65% is 187.86) */}
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="transparent"
                  stroke={activeFocus === 'secondary' ? '#DDD6FE' : '#7C3AED'}
                  strokeWidth={activeFocus === 'primary' ? '20' : '16'}
                  strokeDasharray="187.86 289.02"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />

                {/* Secondary Segment: Influential 35% (35% is 101.16) */}
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="transparent"
                  stroke={activeFocus === 'primary' ? '#A7F3D0' : '#10B981'}
                  strokeWidth={activeFocus === 'secondary' ? '20' : '16'}
                  strokeDasharray="101.16 289.02"
                  strokeDashoffset="-187.86"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>

              {/* Central Dial Readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                {activeFocus === 'all' && (
                  <>
                    <span className="text-xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                      65 <span className="text-slate-300 font-light text-base">/</span> 35
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-0.5">
                      Ratio Balance
                    </span>
                  </>
                )}
                {activeFocus === 'primary' && (
                  <>
                    <span className="text-2xl font-extrabold text-purple-700 tracking-tight tabular-nums">
                      65%
                    </span>
                    <span className="text-[10px] text-purple-900 font-bold uppercase tracking-wider mt-0.5">
                      Dominate
                    </span>
                  </>
                )}
                {activeFocus === 'secondary' && (
                  <>
                    <span className="text-2xl font-extrabold text-emerald-700 tracking-tight tabular-nums">
                      35%
                    </span>
                    <span className="text-[10px] text-emerald-900 font-bold uppercase tracking-wider mt-0.5">
                      Influential
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Unboxed Metadata Legend */}
            <div className="w-full flex items-center justify-between text-xs text-slate-600 pt-2 px-2">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0" />
                <span className="font-semibold text-slate-800">Dominate</span>
                <span className="tabular-nums text-slate-500">65%</span>
              </div>
              <span className="text-slate-300 font-bold">·</span>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-semibold text-slate-800">Influential</span>
                <span className="tabular-nums text-slate-500">35%</span>
              </div>
            </div>
          </div>
        </section>

        {/* TAB 1: ARCHETYPE & BLEND */}
        {activeTab === 'blend' && (
          <div className="space-y-4">
            {/* Superpower Callout */}
            <section className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-indigo-200 mb-1 font-medium">
                <span>Unique Cognitive Advantage</span>
                <span className="text-amber-300 font-semibold">Dual Synergy</span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
                <span>⭐</span>
                <span>{archetype.superpower}</span>
              </h3>
              <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                {archetype.superpowerDesc}
              </p>
              <div className="mt-3 pt-2.5 border-t border-indigo-800/80 flex items-center justify-between text-[11px] text-indigo-200">
                <span>Natural Leadership Stance: Action + Inspiration</span>
                <button
                  onClick={() => handleConsultAI(`Tell me how ${studentName} can leverage their "${archetype.superpower}" superpower in high school and extracurriculars.`)}
                  className="text-amber-300 hover:text-amber-200 font-semibold cursor-pointer underline underline-offset-2"
                  type="button"
                >
                  Explore with AI →
                </button>
              </div>
            </section>

            {/* Primary & Secondary Dual Cards */}
            <div className="grid grid-cols-1 gap-3">
              {/* Dominate Card */}
              <article
                className={`bg-white rounded-2xl border transition-all p-3.5 shadow-2xs ${
                  activeFocus === 'primary' ? 'border-purple-300 ring-2 ring-purple-100' : 'border-slate-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm">
                      D
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="font-bold text-purple-800">{primary.cardTitle}</span>
                        <span className="text-slate-400 font-semibold">·</span>
                        <span className="text-purple-600 font-bold tabular-nums">65%</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">{primary.role}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedSection(expandedSection === 'primary' ? null : 'primary')}
                    className="text-xs text-purple-700 font-semibold px-2 py-1 hover:bg-purple-50 rounded-lg transition cursor-pointer"
                    type="button"
                  >
                    {expandedSection === 'primary' ? 'Collapse' : 'Details'}
                  </button>
                </div>

                <p className="text-xs text-slate-700 mt-2.5 leading-relaxed font-normal">
                  {primary.tagline}
                </p>

                {/* Traits Row */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {primary.traits.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium text-purple-800 bg-purple-50/80 px-2 py-0.5 rounded-md border border-purple-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Expandable Deep Dive */}
                {expandedSection === 'primary' && (
                  <div className="mt-3 pt-3 border-t border-purple-50 space-y-2.5 animate-in fade-in text-xs">
                    <div>
                      <h4 className="font-bold text-slate-900 text-[11px] uppercase tracking-wide text-purple-900">
                        Dominant Superpowers
                      </h4>
                      <ul className="mt-1 space-y-1 text-slate-600">
                        {primary.powers.map((p, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <span className="text-purple-600 font-bold">✓</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-purple-50/60 p-2.5 rounded-xl border border-purple-100/80 text-[11px] text-purple-950">
                      <span className="font-bold">Growth Edge: </span>
                      {primary.blindspots[0]}
                    </div>
                  </div>
                )}
              </article>

              {/* Influential Card */}
              <article
                className={`bg-white rounded-2xl border transition-all p-3.5 shadow-2xs ${
                  activeFocus === 'secondary' ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-slate-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                      I
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="font-bold text-emerald-800">{secondary.cardTitle}</span>
                        <span className="text-slate-400 font-semibold">·</span>
                        <span className="text-emerald-600 font-bold tabular-nums">35%</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">{secondary.role}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedSection(expandedSection === 'secondary' ? null : 'secondary')}
                    className="text-xs text-emerald-700 font-semibold px-2 py-1 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                    type="button"
                  >
                    {expandedSection === 'secondary' ? 'Collapse' : 'Details'}
                  </button>
                </div>

                <p className="text-xs text-slate-700 mt-2.5 leading-relaxed font-normal">
                  {secondary.tagline}
                </p>

                {/* Traits Row */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {secondary.traits.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium text-emerald-800 bg-emerald-50/80 px-2 py-0.5 rounded-md border border-emerald-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Expandable Deep Dive */}
                {expandedSection === 'secondary' && (
                  <div className="mt-3 pt-3 border-t border-emerald-50 space-y-2.5 animate-in fade-in text-xs">
                    <div>
                      <h4 className="font-bold text-slate-900 text-[11px] uppercase tracking-wide text-emerald-900">
                        Inspirational Strengths
                      </h4>
                      <ul className="mt-1 space-y-1 text-slate-600">
                        {secondary.powers.map((p, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/80 text-[11px] text-emerald-950">
                      <span className="font-bold">Growth Edge: </span>
                      {secondary.blindspots[0]}
                    </div>
                  </div>
                )}
              </article>
            </div>

            {/* Top Strengths Section */}
            <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Verified Top Strengths</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Ranked by psychometric dominance</p>
                </div>
                <span className="text-xs font-semibold text-indigo-600 tabular-nums">
                  5 Core Pillars
                </span>
              </div>

              <div className="space-y-2.5">
                {topStrengths.map((str, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100/90 flex items-start justify-between space-x-3"
                  >
                    <div className="flex items-start space-x-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold mt-0.5"
                        style={{ backgroundColor: str.bg, color: str.color }}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-xs font-bold text-slate-900">{str.title}</h4>
                          <span className="text-slate-300 font-bold">·</span>
                          <span className="text-[11px] font-semibold text-slate-500 tabular-nums">{str.score}%</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-tight mt-0.5">
                          {str.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Famous Role Models with this Blend */}
            <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Exemplary Role Models</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Historical & contemporary figures with the D-I Archetype</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {roleModels.map((model, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between space-x-2"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-900">{model.name}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-[11px] font-medium text-slate-500">{model.role}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                        {model.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: BEHAVIORAL METRICS */}
        {activeTab === 'metrics' && (
          <div className="space-y-4">
            <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="mb-3">
                <h3 className="text-xs font-bold text-slate-900">Behavioral Intensity Meters</h3>
                <p className="text-[11px] text-slate-500 font-medium">Standardized scoring across 6 key work and study dimensions</p>
              </div>

              <div className="space-y-3.5 pt-1">
                {dimensions.map((dim, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{dim.name}</span>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[11px] text-indigo-700 font-medium">{dim.level}</span>
                        <span className="text-slate-300 font-bold">·</span>
                        <span className="font-bold text-slate-900 tabular-nums">{dim.score}%</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${dim.score}%`,
                          backgroundColor: dim.score >= 90 ? '#7C3AED' : dim.score >= 80 ? '#2563EB' : '#10B981'
                        }}
                      />
                    </div>
                    <p className="text-[10.5px] text-slate-500 leading-tight">
                      {dim.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* DISC Matrix Snapshot */}
            <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 mb-1">DISC Quadrant Coordinates</h3>
              <p className="text-[11px] text-slate-500 font-medium mb-3">Overall psychometric matrix placement</p>

              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-purple-900">D · Dominance</span>
                    <span className="font-bold text-purple-700 tabular-nums">65% High</span>
                  </div>
                  <p className="text-[10px] text-purple-800 mt-1 leading-tight">Fast-paced, task-focused, overcomes opposition</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-emerald-900">I · Influence</span>
                    <span className="font-bold text-emerald-700 tabular-nums">35% High</span>
                  </div>
                  <p className="text-[10px] text-emerald-800 mt-1 leading-tight">Fast-paced, people-focused, generates buy-in</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">S · Steadiness</span>
                    <span className="tabular-nums font-semibold">Moderate</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-tight">Adapts well, but prefers high agility over slow routines</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">C · Conscientiousness</span>
                    <span className="tabular-nums font-semibold">Strategic</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-tight">Values quality outcomes over excessive micromanagement</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 3: IN ACTION (SCENARIOS) */}
        {activeTab === 'scenarios' && (
          <div className="space-y-4">
            {/* Scenario Selector Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
              {scenarios.map((sc, idx) => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    selectedScenarioIndex === idx
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                  type="button"
                >
                  {sc.title}
                </button>
              ))}
            </div>

            {/* Active Scenario Card */}
            {(() => {
              const currentScenario = scenarios[selectedScenarioIndex];
              return (
                <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10.5px] font-bold text-indigo-600 uppercase tracking-wider">
                        Scenario Breakdown
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        {currentScenario.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {currentScenario.subtitle}
                      </p>
                    </div>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shadow-2xs"
                      style={{ backgroundColor: currentScenario.bg, color: currentScenario.color }}
                    >
                      {selectedScenarioIndex === 0 && '👥'}
                      {selectedScenarioIndex === 1 && '⚡'}
                      {selectedScenarioIndex === 2 && '💬'}
                      {selectedScenarioIndex === 3 && '🎯'}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-2.5">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Observed Natural Behavior</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {currentScenario.behavior}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                      <span className="font-bold text-slate-900">Optimization Tip: </span>
                      <span className="text-slate-700">{currentScenario.tip}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleConsultAI(`In the scenario "${currentScenario.title}", how can ${studentName} maximize his performance while maintaining strong team relations?`)}
                    className="w-full py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center space-x-1.5"
                    type="button"
                  >
                    <span>💬</span>
                    <span>Ask AI Counselor About This Scenario</span>
                  </button>
                </section>
              );
            })()}

            {/* All Scenarios Quick List */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-bold text-slate-700 px-1">Other Real-World Moments</h4>
              {scenarios.map((sc, idx) => (
                <div
                  key={sc.id}
                  onClick={() => setSelectedScenarioIndex(idx)}
                  className={`p-3 rounded-xl bg-white border transition cursor-pointer flex items-center justify-between ${
                    selectedScenarioIndex === idx ? 'border-indigo-400 bg-indigo-50/20' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">
                      {idx === 0 && '👥'}
                      {idx === 1 && '⚡'}
                      {idx === 2 && '💬'}
                      {idx === 3 && '🎯'}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">{sc.title}</h5>
                      <p className="text-[10.5px] text-slate-500">{sc.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-xs text-indigo-600 font-semibold">View →</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MENTOR & COACHING PLAYBOOK */}
        {activeTab === 'coaching' && (
          <div className="space-y-4">
            <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
              <div>
                <h3 className="text-xs font-bold text-slate-900">Parent & Mentor Playbook</h3>
                <p className="text-[11px] text-slate-500 font-medium">Evidence-based guidelines to unlock {studentName}&apos;s full potential</p>
              </div>

              <div className="space-y-3 pt-1">
                {mentorTips.map((tip, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="text-[11px] font-bold text-indigo-700">{tip.category}</div>
                    <p className="text-xs text-slate-700 leading-relaxed">{tip.advice}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* What Motivates vs What Drains */}
            <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-900">Psychological Triggers</h3>

              <div className="grid grid-cols-1 gap-2.5">
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs">
                  <div className="flex items-center space-x-1.5 font-bold text-emerald-900 mb-1">
                    <span>🔥</span>
                    <span>What Fuels {studentName}&apos;s Engine:</span>
                  </div>
                  <p className="text-[11px] text-emerald-950 leading-relaxed">
                    Clear ambitious goals, public acknowledgment of wins, competitive challenges, freedom to innovate without micromanagement, and speaking opportunities.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 text-xs">
                  <div className="flex items-center space-x-1.5 font-bold text-rose-900 mb-1">
                    <span>⚠️</span>
                    <span>What Drains {studentName}:</span>
                  </div>
                  <p className="text-[11px] text-rose-950 leading-relaxed">
                    Repetitive rote memorization, delayed feedback loops, prolonged indecisiveness in teams, restrictive rules without clear logic, and isolated desk-bound tasks.
                  </p>
                </div>
              </div>
            </section>

            {/* Custom AI Prompt Launcher */}
            <div className="p-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-indigo-200/80 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-base">🤖</span>
                <h4 className="text-xs font-bold text-indigo-950">Ask Vayo AI Custom Advice</h4>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Ask our AI counselor specific questions about academic subject choices, stream selections, or study habits tailored to this personality.
              </p>
              <button
                onClick={() => handleConsultAI()}
                className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition active:scale-[0.99] cursor-pointer"
                type="button"
              >
                Launch Tailored Counselor Chat
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Ergonomic Sticky Bottom Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 max-w-[420px] mx-auto p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center space-x-2">
        <button
          onClick={() => handleConsultAI()}
          aria-label="Ask AI about this personality"
          className="flex-1 py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition active:scale-[0.98] cursor-pointer flex items-center justify-center space-x-1.5"
          type="button"
        >
          <span>🤖</span>
          <span>Ask AI Mentor</span>
        </button>

        <button
          onClick={onViewFullReport}
          aria-label="View Full Report"
          className="flex-1 py-3 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition active:scale-[0.98] cursor-pointer flex items-center justify-center space-x-1.5"
          type="button"
        >
          <span>View Full Report</span>
          <span>→</span>
        </button>
      </footer>
    </div>
  );
};
