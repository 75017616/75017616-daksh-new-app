import React from 'react';
import { StudentProfile } from '../types';

interface CognitiveBadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: StudentProfile;
}

export const CognitiveBadgesModal: React.FC<CognitiveBadgesModalProps> = ({
  isOpen,
  onClose,
  activeProfile,
}) => {
  if (!isOpen) return null;

  const badges = [
    {
      id: '1',
      title: 'Kinesthetic Master',
      category: '8 Intelligences',
      level: 'Tier 1 • Top 5%',
      icon: '🏃‍♂️',
      score: '85%',
      color: '#4F46E5',
      bg: '#EEF2FF',
      desc: 'Exceptional motor coordination, tactile learning, and spatial agility.',
      unlockedAt: 'Verified by DISC Assessment',
    },
    {
      id: '2',
      title: 'Visual Dominance',
      category: '5 Senses',
      level: 'Dominant Sense',
      icon: '👁️',
      score: '88%',
      color: '#0284C7',
      bg: '#F0F9FF',
      desc: 'Absorbs complex concepts through diagrams, spatial maps, and color visual cues.',
      unlockedAt: 'Verified by Sensory Scan',
    },
    {
      id: '3',
      title: 'Creative Right-Brainer',
      category: 'Brain Balance',
      level: '65% Dominant',
      icon: '🎨',
      score: '65%',
      color: '#7C3AED',
      bg: '#F5F3FF',
      desc: 'High intuitive problem solving, artistic synthesis, and holistic conceptualization.',
      unlockedAt: 'Verified by Brain Hemispheric Battery',
    },
    {
      id: '4',
      title: 'Linguistic Champion',
      category: '8 Intelligences',
      level: 'Tier 2 • Strong',
      icon: '🗣️',
      score: '80%',
      color: '#2563EB',
      bg: '#EFF6FF',
      desc: 'Expressive verbal vocabulary, persuasive articulation, and narrative recall.',
      unlockedAt: 'Verified by DISC Assessment',
    },
    {
      id: '5',
      title: 'Collaborative Leader',
      category: 'Interpersonal',
      level: 'High DISC Influence',
      icon: '🤝',
      score: '80%',
      color: '#059669',
      bg: '#ECFDF5',
      desc: 'Empathetic team motivator, peer consensus builder, and group coordinator.',
      unlockedAt: 'Verified by DISC Evaluation',
    },
    {
      id: '6',
      title: 'Analytical Thinker',
      category: 'Logical-Mathematical',
      level: 'Tier 2 • Strong',
      icon: '🧩',
      score: '82%',
      color: '#D97706',
      bg: '#FFFBEB',
      desc: 'Pattern recognition, structured algorithmic deduction, and numerical reasoning.',
      unlockedAt: 'Verified by DISC Assessment',
    },
  ];

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
      <div className="w-full max-w-[390px] max-h-[90%] bg-white rounded-3xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 border border-slate-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl shadow-xs">
              🏆
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Cognitive Badges & Milestones</h3>
              <p className="text-[10px] text-slate-500">{activeProfile.name} • Class 8 Verified Achievements</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        {/* Total Summary */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 rounded-2xl p-3.5 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-90 block">
              Verified Strengths
            </span>
            <h4 className="text-base font-extrabold tracking-tight">6 Verified Badges Unlocked</h4>
          </div>
          <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-black">
            Top 10%
          </span>
        </div>

        {/* Badges Grid */}
        <div className="space-y-2.5 overflow-y-auto no-scrollbar flex-1 pr-1">
          {badges.map((b) => (
            <div
              key={b.id}
              className="p-3 rounded-2xl border transition flex items-start space-x-3"
              style={{ backgroundColor: b.bg, borderColor: `${b.color}25` }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-xs"
                style={{ backgroundColor: `${b.color}15`, color: b.color }}
              >
                {b.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{b.title}</h4>
                  <span
                    className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md text-white shrink-0 ml-1"
                    style={{ backgroundColor: b.color }}
                  >
                    {b.score}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="text-[9px] font-semibold text-slate-500">{b.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[9px] font-bold text-indigo-700">{b.level}</span>
                </div>
                <p className="text-[10px] text-slate-600 mt-1 leading-snug">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center space-x-2 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-sm transition active:scale-95 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
