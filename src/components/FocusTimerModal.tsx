import React, { useState, useEffect } from 'react';

interface FocusTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
}

export const FocusTimerModal: React.FC<FocusTimerModalProps> = ({
  isOpen,
  onClose,
  studentName
}) => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      if (mode === 'focus') {
        setMode('break');
        setSecondsLeft(5 * 60);
      } else {
        setMode('focus');
        setSecondsLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, mode]);

  if (!isOpen) return null;

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'focus' ? ((25 * 60 - secondsLeft) / (25 * 60)) * 100 : ((5 * 60 - secondsLeft) / (5 * 60)) * 100;

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-[360px] bg-white rounded-3xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl">⏱️</span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Vayo Focus Timer</h3>
              <p className="text-[10px] text-slate-400">Pomodoro focus for {studentName}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">✕</button>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => {
              setMode('focus');
              setSecondsLeft(25 * 60);
              setIsActive(false);
            }}
            className={`flex-1 py-1.5 rounded-lg font-bold transition ${
              mode === 'focus' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            🧠 Deep Study (25m)
          </button>
          <button
            onClick={() => {
              setMode('break');
              setSecondsLeft(5 * 60);
              setIsActive(false);
            }}
            className={`flex-1 py-1.5 rounded-lg font-bold transition ${
              mode === 'break' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            ☕ Quick Rest (5m)
          </button>
        </div>

        {/* Circular Progress & Clock */}
        <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#F1F5F9" strokeWidth="6" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={mode === 'focus' ? '#4F46E5' : '#10B981'}
              strokeWidth="6"
              strokeDasharray="263.89"
              strokeDashoffset={263.89 - (263.89 * progress) / 100}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-slate-900 tracking-tight font-mono">
              {formatTime(secondsLeft)}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
              {isActive ? 'In Progress' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Tip Banner */}
        <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-[10px] text-indigo-900 leading-tight">
          💡 <strong>Kinesthetic Tip:</strong> Keep physical notes or flashcards within arm's reach during deep focus intervals.
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs text-white shadow-sm transition active:scale-95 cursor-pointer ${
              isActive ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isActive ? 'Pause Timer' : 'Start Focus Session'}
          </button>
          <button
            onClick={() => {
              setIsActive(false);
              setSecondsLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
            }}
            className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
