import React, { useState } from 'react';
import { HeaderStatusBar } from './HeaderStatusBar';
import { StudentProfile } from '../types';

interface AIMentorScreenProps {
  activeProfile: StudentProfile;
  onOpenAIChat: (prompt?: string) => void;
  onBack?: () => void;
}

export const AIMentorScreen: React.FC<AIMentorScreenProps> = ({
  activeProfile,
  onOpenAIChat,
  onBack
}) => {
  const [completedDrills, setCompletedDrills] = useState<number[]>([0]);

  const drills = [
    {
      id: 0,
      title: 'Mind-Mapping Physics Concepts',
      category: 'Visual & Kinesthetic',
      duration: '15 mins',
      benefit: 'Leverages your 88% visual dominant sensory strength.',
      icon: '📐'
    },
    {
      id: 1,
      title: 'Speech Rehearsal & Rhetoric Drill',
      category: 'Linguistic',
      duration: '10 mins',
      benefit: 'Polishes your 80% linguistic fluency and public speaking.',
      icon: '🎙️'
    },
    {
      id: 2,
      title: '5-Minute Mindful Breathing',
      category: 'Patience & Emotional Shield',
      duration: '5 mins',
      benefit: 'Directly addresses your SWOT weakness in patience.',
      icon: '🧘'
    },
    {
      id: 3,
      title: 'Logic Puzzle Matrix',
      category: 'Logical-Mathematical',
      duration: '12 mins',
      benefit: 'Exercises pattern recognition and deductive problem solving.',
      icon: '🧩'
    }
  ];

  const toggleDrill = (id: number) => {
    if (completedDrills.includes(id)) {
      setCompletedDrills(completedDrills.filter((d) => d !== id));
    } else {
      setCompletedDrills([...completedDrills, id]);
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-full bg-[#F8FAFC] pb-6 select-none flex flex-col relative">
      {/* Unified Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100/90 shrink-0">
        <HeaderStatusBar darkText={true} />
        <div className="px-4 pt-0.5 pb-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                aria-label="Back to dashboard"
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            <div>
              <h1 className="text-base font-bold text-slate-900 tracking-tight">AI Mentor</h1>
              <p className="text-[11px] text-slate-500 font-medium">Personalized Growth Coach for {activeProfile.name}</p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-lg">
            🤖
          </div>
        </div>
      </header>

      {/* Mentor Hero Banner */}
      <div className="px-4 pt-3">
        <section className="rounded-2xl p-4 bg-gradient-to-br from-[#1e1363] to-[#3b2d99] text-white shadow-md relative overflow-hidden">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl border border-white/20">
              💡
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">Weekly Focus</span>
              <h2 className="text-sm font-extrabold text-white">Class 8 Science & Mathematics Synthesis</h2>
              <p className="text-[10px] text-indigo-100/90 mt-0.5 leading-relaxed">
                Harnessing hands-on modeling to conquer abstract formulas.
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-[11px] text-indigo-200">
              Weekly progress: <strong className="text-white">{completedDrills.length}/4 completed</strong>
            </span>
            <button
              onClick={() => onOpenAIChat('Give me study advice for this week')}
              className="px-3 py-1 bg-white text-indigo-950 rounded-xl font-bold text-[10px] hover:bg-slate-100 transition active:scale-95 cursor-pointer"
            >
              Ask Mentor
            </button>
          </div>
        </section>
      </div>

      {/* Daily Drills List */}
      <main className="px-4 pt-4 space-y-3 flex-1 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 tracking-tight">Today's Cognitive Workouts</h3>
          <span className="text-[10px] text-slate-400 font-medium">Tap checkmark when done</span>
        </div>

        {drills.map((drill) => {
          const isDone = completedDrills.includes(drill.id);
          return (
            <article
              key={drill.id}
              onClick={() => toggleDrill(drill.id)}
              className={`rounded-2xl p-3.5 border transition cursor-pointer flex items-start justify-between ${
                isDone
                  ? 'bg-emerald-50/50 border-emerald-200 shadow-2xs'
                  : 'bg-white border-slate-100 shadow-xs hover:border-indigo-200'
              }`}
            >
              <div className="flex items-start space-x-3 pr-2">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg shrink-0 mt-0.5">
                  {drill.icon}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[9.5px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      {drill.category}
                    </span>
                    <span className="text-[9px] text-slate-400">⏱️ {drill.duration}</span>
                  </div>
                  <h4 className={`text-xs font-bold mt-1 ${isDone ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                    {drill.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                    {drill.benefit}
                  </p>
                </div>
              </div>

              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition shrink-0 mt-1 ${
                  isDone
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {isDone && <span className="text-[10px] font-bold">✓</span>}
              </div>
            </article>
          );
        })}

        {/* Career Alignment Roadmap */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs mt-2 space-y-2">
          <h3 className="text-xs font-bold text-slate-900 tracking-tight">Milestone Career Roadmap</h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-start space-x-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
              <div>
                <strong className="text-slate-800 font-semibold block text-[11px]">Class 8 Foundation</strong>
                <span className="text-[10px] text-slate-500 leading-tight block">Strengthen STEM labs and competitive science olympiads.</span>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
              <div>
                <strong className="text-slate-800 font-semibold block text-[11px]">Class 9-10 Stream Choice</strong>
                <span className="text-[10px] text-slate-500 leading-tight block">Select PCM with Computer Science / Robotics electives.</span>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
              <div>
                <strong className="text-slate-800 font-semibold block text-[11px]">Future Specialization</strong>
                <span className="text-[10px] text-slate-500 leading-tight block">Software Engineering, AI Architecture & Interactive Systems.</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
