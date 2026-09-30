import React, { useState } from 'react';
import { HeaderStatusBar } from './HeaderStatusBar';
import { ScreenType, StudentProfile } from '../types';

interface AssessmentScreenProps {
  activeProfile: StudentProfile;
  onNavigate: (screen: ScreenType, payload?: any) => void;
  isPremium?: boolean;
  onOpenUpgrade?: () => void;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({
  activeProfile,
  onNavigate,
  isPremium = false,
  onOpenUpgrade
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [showQuickQuiz, setShowQuickQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizDone, setQuizDone] = useState(false);

  const sampleQuestions = [
    {
      q: 'When solving a tricky problem, what is your initial instinct?',
      options: [
        'Diagram or draw it out spatially',
        'Break it into logic equations and step-by-step numbers',
        'Talk it through out loud with a friend',
        'Build or physically tinker with something'
      ]
    },
    {
      q: 'Which school project would excite you the most?',
      options: [
        'Constructing a miniature working robot or 3D bridge',
        'Writing a persuasive speech or dramatic play',
        'Conducting a chemistry experiment in the science lab',
        'Organizing a school charity campaign with classmates'
      ]
    },
    {
      q: 'In your free time, you naturally gravitate towards:',
      options: [
        'Creative arts, drawing, or strategy puzzle games',
        'Sports, athletic drills, or outdoor explorations',
        'Reading novels, journaling, or learning new languages',
        'Playing musical instruments or composing melodies'
      ]
    }
  ];

  const handleAnswer = (optionIdx: number) => {
    const updated = [...answers, optionIdx];
    setAnswers(updated);
    if (quizStep + 1 < sampleQuestions.length) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizDone(true);
    }
  };

  const handleAssessmentAction = (item: any) => {
    if (item.id === 'personality') {
      onNavigate('personality');
      return;
    }
    if (!isPremium) {
      if (onOpenUpgrade) onOpenUpgrade();
      return;
    }
    item.action();
  };

  const assessments = [
    {
      id: 'personality',
      title: 'DISC Behavioral Personality Blend',
      category: 'Psychological',
      status: '✨ 100% Free',
      score: 'Dominate 65% / Influential 35%',
      icon: '🎯',
      color: '#8B5CF6',
      bgColor: '#F5F3FF',
      isFree: true,
      action: () => onNavigate('personality')
    },
    {
      id: 'disc_behavior',
      title: 'DISC Behavioral & Cognitive Analysis',
      category: 'Cognitive',
      status: isPremium ? 'Completed' : '🔒 Locked',
      score: '96% Accuracy (Preview)',
      icon: '🧬',
      color: '#10B981',
      bgColor: '#ECFDF5',
      isFree: false,
      action: () => onNavigate('brain_dominance')
    },
    {
      id: 'eight_intel',
      title: 'Howard Gardner 8 Multi-Intelligence',
      category: 'Cognitive',
      status: isPremium ? 'Completed' : '🔒 Locked',
      score: '76% Overall (Status Preview)',
      icon: '💠',
      color: '#8B5CF6',
      bgColor: '#F5F3FF',
      isFree: false,
      action: () => onNavigate('eight_intelligence')
    },
    {
      id: 'senses',
      title: '5 Senses Sensory Learning Preference',
      category: 'Sensory',
      status: isPremium ? 'Completed' : '🔒 Locked',
      score: '88% Visual Dominant',
      icon: '👁️',
      color: '#3B82F6',
      bgColor: '#EFF6FF',
      isFree: false,
      action: () => onNavigate('five_senses')
    },
    {
      id: 'swot',
      title: 'SWOT Personal Aptitude Matrix',
      category: 'Behavioral',
      status: isPremium ? 'Completed' : '🔒 Locked',
      score: '12 Strengths, 5 Weaknesses',
      icon: '🛡️',
      color: '#F59E0B',
      bgColor: '#FFFBEB',
      isFree: false,
      action: () => onNavigate('swot')
    },
    {
      id: 'career_stream',
      title: 'Stream & Career Selection Predictor',
      category: 'Career',
      status: 'Recommended',
      score: 'Recommended for 9th-11th',
      icon: '🎓',
      color: '#6366F1',
      bgColor: '#EEF2FF',
      isFree: false,
      action: () => onNavigate('eight_intelligence')
    }
  ];

  const filtered = assessments.filter((a) => {
    if (activeFilter === 'completed') return a.status.includes('Completed') || a.isFree;
    if (activeFilter === 'pending') return a.status === 'Recommended';
    return true;
  });

  return (
    <div className="w-full max-w-[420px] mx-auto min-h-full bg-[#FAFBFD] pb-6 select-none flex flex-col relative">
      {/* Unified Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100/90 shrink-0">
        <HeaderStatusBar darkText={true} />
        <div className="px-5 pt-0.5 pb-2.5 flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Assessments Battery</h1>
            <p className="text-[11px] text-slate-500 font-medium">Diagnostic tests for {activeProfile.name}</p>
          </div>
          <button
            onClick={() => {
              setQuizStep(0);
              setAnswers([]);
              setQuizDone(false);
              setShowQuickQuiz(true);
            }}
            className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1.5 rounded-xl shadow-xs transition active:scale-95 cursor-pointer flex items-center space-x-1"
          >
            <span>⚡</span>
            <span>Quick Test</span>
          </button>
        </div>
      </header>

      {/* Freemium Info Banner */}
      {!isPremium && (
        <div className="mx-4 mt-2.5 p-3 bg-gradient-to-r from-purple-50 via-indigo-50 to-amber-50 border border-purple-200/80 rounded-2xl flex items-center justify-between shadow-2xs">
          <div className="flex items-center space-x-2.5 pr-2">
            <span className="text-lg">🎯</span>
            <div>
              <p className="text-[11px] font-bold text-slate-900">Personality Type is 100% Free</p>
              <p className="text-[10px] text-slate-600 leading-tight">
                Other element statuses are previewed. Unlock Premium to access full detailed batteries.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenUpgrade}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-xl shrink-0 transition active:scale-95 cursor-pointer shadow-xs"
          >
            Unlock All 👑
          </button>
        </div>
      )}

      {/* Quick Pulse Quiz Modal - Scoped inside container */}
      {showQuickQuiz && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[380px] bg-white rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <span className="text-xl">⚡</span>
                <span className="text-sm font-bold text-slate-900">Intelligence Quick Pulse</span>
              </div>
              <button onClick={() => setShowQuickQuiz(false)} className="text-slate-400 hover:text-slate-700 text-sm cursor-pointer">
                ✕
              </button>
            </div>

            {!quizDone ? (
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
                  <span>Question {quizStep + 1} of {sampleQuestions.length}</span>
                  <span>{Math.round(((quizStep + 1) / sampleQuestions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-4">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${((quizStep + 1) / sampleQuestions.length) * 100}%` }}
                  />
                </div>

                <h3 className="text-xs font-bold text-slate-800 leading-snug mb-3">
                  {sampleQuestions[quizStep].q}
                </h3>

                <div className="space-y-2">
                  {sampleQuestions[quizStep].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/50 text-xs font-medium text-slate-700 transition active:scale-[0.99] cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-3 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 text-2xl mx-auto flex items-center justify-center">
                  ✓
                </div>
                <h3 className="text-sm font-bold text-slate-900">Pulse Check Complete!</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your cognitive inclinations strongly align with <strong>Visual & Kinesthetic Thinking</strong> and <strong>Logical Problem Solving</strong>.
                </p>
                <button
                  onClick={() => setShowQuickQuiz(false)}
                  className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="px-5 pt-3 flex items-center space-x-1.5">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          All ({assessments.length})
        </button>
        <button
          onClick={() => setActiveFilter('completed')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition cursor-pointer ${
            activeFilter === 'completed'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          Completed (5)
        </button>
        <button
          onClick={() => setActiveFilter('pending')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition cursor-pointer ${
            activeFilter === 'pending'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          Recommended (1)
        </button>
      </div>

      {/* Assessment List */}
      <main className="px-4 pt-3 space-y-3 flex-1 overflow-y-auto no-scrollbar">
        {filtered.map((item) => (
          <article
            key={item.id}
            onClick={() => handleAssessmentAction(item)}
            className={`rounded-2xl p-4 border shadow-xs flex items-center justify-between cursor-pointer transition ${
              item.isFree
                ? 'bg-gradient-to-r from-purple-50/60 to-white border-purple-300 hover:border-purple-400'
                : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center space-x-3.5 flex-1 pr-2">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ backgroundColor: item.bgColor }}
              >
                {item.icon}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      item.isFree
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : item.status.includes('Locked')
                        ? 'bg-amber-100 text-amber-800'
                        : item.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-indigo-50 text-indigo-600'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 leading-snug mt-0.5">
                  {item.title}
                </h3>
                <span className="text-[11px] font-semibold text-slate-600 block mt-0.5" style={{ color: item.color }}>
                  {item.score}
                </span>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 shrink-0">
              {item.isFree || isPremium ? (
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <span className="text-xs">🔒</span>
              )}
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};
