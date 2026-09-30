import React from 'react';
import { StudentProfile } from '../types';

interface StreamSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: StudentProfile;
  onOpenAIChat: (prompt?: string) => void;
}

export const StreamSelectorModal: React.FC<StreamSelectorModalProps> = ({
  isOpen,
  onClose,
  activeProfile,
  onOpenAIChat
}) => {
  if (!isOpen) return null;

  const streams = [
    {
      title: 'Science (PCM + Computer Science)',
      fit: '95% Fit (Top Recommendation)',
      color: '#4F46E5',
      bg: '#EEF2FF',
      reasons: 'Aligns with your 82% Logical Mathematical and 85% Bodily Kinesthetic building skills.',
      careers: ['Software Engineering', 'Robotics & Mechatronics', 'Aeronautical', 'Data Science']
    },
    {
      title: 'Design & Architecture (Tech + Arts)',
      fit: '88% Fit',
      color: '#EA580C',
      bg: '#FFF7ED',
      reasons: 'Capitalizes on your 88% Visual dominance and creative Right Brain (65%).',
      careers: ['Product Design', 'UI/UX Architecture', 'Game Development', 'Industrial Design']
    },
    {
      title: 'Commerce with Applied Mathematics',
      fit: '81% Fit',
      color: '#059669',
      bg: '#ECFDF5',
      reasons: 'Leverages high problem solving, decisive DISC leadership, and team communication.',
      careers: ['FinTech', 'Business Analytics', 'Actuarial Science', 'Venture Management']
    }
  ];

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="w-full max-w-[380px] max-h-[88%] bg-white rounded-3xl p-5 shadow-2xl space-y-3.5 animate-in zoom-in-95 duration-150 border border-slate-100 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🎓</span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">High School Stream Predictor</h3>
              <p className="text-[10px] text-slate-400">Class 9 - 11 Academic Guidance</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <div className="space-y-3 overflow-y-auto no-scrollbar flex-1 pr-1 text-xs">
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl text-[11px] text-indigo-900 leading-relaxed">
            Based on {activeProfile.name}'s verified aptitude profile (Right Brain 65%, Bodily Kinesthetic 85%, Logical 82%), here is the optimal stream alignment:
          </div>

          {streams.map((s, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl border transition"
              style={{ backgroundColor: s.bg, borderColor: `${s.color}30` }}
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-slate-900 text-xs">{s.title}</h4>
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: s.color }}
                >
                  {s.fit}
                </span>
              </div>
              <p className="text-[10px] text-slate-600 mt-1 leading-snug">{s.reasons}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {s.careers.map((c, i) => (
                  <span key={i} className="bg-white/80 border border-slate-200/60 px-1.5 py-0.5 rounded-md text-[9px] font-semibold text-slate-700">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center space-x-2 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenAIChat(`Explain why PCM Science is the best high school stream for ${activeProfile.name}`);
            }}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md"
          >
            Consult Vayo
          </button>
        </div>
      </div>
    </div>
  );
};
