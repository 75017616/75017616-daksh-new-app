import React, { useState } from 'react';
import { StudentProfile } from '../types';

interface DailyDrillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: StudentProfile;
}

export const DailyDrillsModal: React.FC<DailyDrillsModalProps> = ({
  isOpen,
  onClose,
  activeProfile,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const drills = [
    {
      category: 'Logical & Pattern Drill',
      question: 'Which number completes the sequence? 2, 6, 12, 20, 30, ?',
      options: ['38', '40', '42', '44'],
      correct: 2, // 42 (+4, +6, +8, +10, +12)
      explanation: 'Differences increase by 2 each step (+4, +6, +8, +10, +12 = 42).',
    },
    {
      category: 'Visual-Spatial Rotation',
      question: 'A 3D cube is rotated 90° clockwise and then flipped horizontally. Which face is now facing UP if original was Top=Blue, Front=Red?',
      options: ['Blue', 'Red', 'Yellow', 'Green'],
      correct: 0,
      explanation: 'Horizontal flip does not invert the top-bottom vertical axis.',
    },
    {
      category: 'Verbal-Linguistic Analogy',
      question: 'MICROSCOPE is to BIOLOGIST as TELESCOPE is to:',
      options: ['GEOLOGIST', 'ASTRONOMER', 'CHEMIST', 'PHYSICIST'],
      correct: 1,
      explanation: 'Microscopes are the primary visual instrument of biologists; telescopes of astronomers.',
    },
  ];

  const handleNext = () => {
    if (selectedOption === drills[currentStep].correct) {
      setScore((s) => s + 1);
    }

    if (currentStep < drills.length - 1) {
      setCurrentStep((s) => s + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
      <div className="w-full max-w-[390px] bg-white rounded-3xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-xl shadow-xs">
              ⚡
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Daily Cognitive Drill</h3>
              <p className="text-[10px] text-slate-500">3-Minute Brain Warmup for {activeProfile.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        {!isCompleted ? (
          <div className="space-y-3.5">
            {/* Progress & Category */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                {drills[currentStep].category}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                Drill {currentStep + 1} of {drills.length}
              </span>
            </div>

            {/* Question Card */}
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <p className="text-xs font-bold text-slate-800 leading-relaxed">
                {drills[currentStep].question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {drills[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold text-left transition flex items-center justify-between ${
                    selectedOption === idx
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <span>{opt}</span>
                  <span
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                      selectedOption === idx
                        ? 'border-white bg-white/20 text-white'
                        : 'border-slate-300 text-slate-400'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                </button>
              ))}
            </div>

            {/* Submit button */}
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`w-full py-2.5 rounded-xl font-bold text-xs text-white transition active:scale-95 cursor-pointer ${
                selectedOption !== null
                  ? 'bg-indigo-600 hover:bg-indigo-700 shadow-sm'
                  : 'bg-slate-300 cursor-not-allowed opacity-60'
              }`}
            >
              {currentStep < drills.length - 1 ? 'Next Drill →' : 'Complete Drill 🎯'}
            </button>
          </div>
        ) : (
          <div className="text-center py-4 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
              🎉
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">Drill Completed!</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                You scored <strong className="text-emerald-600">{score}/{drills.length}</strong> today.
              </p>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl text-[11px] text-emerald-800 text-left">
              🔥 <strong>Streak Active:</strong> {activeProfile.name} is on a 4-day cognitive sharpness streak! Brain neuroplasticity boosted.
            </div>
            <div className="flex space-x-2 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
