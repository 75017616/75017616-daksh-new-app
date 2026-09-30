import React, { useState } from 'react';
import { StudentProfile } from '../types';

interface VayoBotWidgetProps {
  onClick: (prompt?: string) => void;
  activeProfile: StudentProfile;
}

export const VayoBotWidget: React.FC<VayoBotWidgetProps> = ({ onClick, activeProfile }) => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="absolute bottom-[72px] right-3 z-40 flex flex-col items-end select-none pointer-events-auto">
      {/* Speech bubble tooltip */}
      {!isMinimized && showTooltip && (
        <div className="mb-2 max-w-[190px] bg-slate-950 text-white p-2.5 rounded-2xl rounded-br-xs shadow-2xl border border-indigo-400/40 text-[11px] leading-tight animate-in fade-in slide-in-from-bottom-2 duration-200 relative backdrop-blur-md">
          <div className="flex items-start justify-between">
            <span className="font-bold text-cyan-300 flex items-center space-x-1">
              <span>✦</span>
              <span>Ask Vayo</span>
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-white/60 hover:text-white -mr-1 -mt-1 p-0.5"
              aria-label="Dismiss tooltip"
            >
              ✕
            </button>
          </div>
          <p className="text-indigo-100 text-[10px] mt-1 font-medium">
            Hi {activeProfile.name}! Need career matches or study tips?
          </p>
          <div className="mt-1.5 flex items-center space-x-1">
            <button
              onClick={() => onClick('Tell me my best career matches based on my profile')}
              className="text-[9px] bg-white/10 hover:bg-white/20 text-white font-semibold px-2 py-0.5 rounded-md transition"
            >
              🎯 Careers
            </button>
            <button
              onClick={() => onClick('How can I boost my weaknesses using my strengths?')}
              className="text-[9px] bg-white/10 hover:bg-white/20 text-white font-semibold px-2 py-0.5 rounded-md transition"
            >
              📈 Tips
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Vayo Button */}
      {!isMinimized ? (
        <div className="flex items-center space-x-1.5">
          {/* Quick minimize icon button */}
          <button
            onClick={() => setIsMinimized(true)}
            title="Minimize Vayo"
            className="w-5 h-5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-[10px] shadow-sm cursor-pointer border border-slate-600/50"
          >
            ›
          </button>

          <button
            onClick={() => onClick()}
            aria-label="Chat with Vayo AI"
            className="group relative flex items-center bg-gradient-to-tr from-[#1e1363] via-[#4338ca] to-[#7c3aed] text-white py-1.5 px-3 rounded-full shadow-xl shadow-indigo-600/35 border-2 border-white/80 hover:shadow-indigo-600/60 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            {/* Glowing pulse ring */}
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-60 blur-xs group-hover:opacity-100 transition animate-pulse" />

            <div className="relative flex items-center space-x-2">
              {/* Vayo Robot Head Icon */}
              <div className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center p-0.5 shadow-inner">
                {/* Antenna */}
                <div className="w-1 h-1 bg-cyan-400 rounded-full mb-0.5 shadow-[0_0_4px_#22d3ee]" />
                {/* Eyes visor */}
                <div className="w-4 h-2 bg-black rounded-xs flex items-center justify-around px-0.5 border border-cyan-500/40">
                  <span className="w-0.5 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_3px_#22d3ee] animate-pulse" />
                  <span className="w-0.5 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_3px_#22d3ee] animate-pulse" />
                </div>
                {/* Smile / Mouth */}
                <div className="w-2 h-0.5 bg-indigo-400 rounded-full mt-0.5" />
              </div>

              <div className="flex flex-col text-left">
                <span className="text-[11px] font-black tracking-tight leading-none text-white flex items-center space-x-1">
                  <span>vayo</span>
                  <span className="text-[7px] bg-cyan-400 text-indigo-950 font-black px-1 rounded-xs">AI</span>
                </span>
                <span className="text-[8px] text-cyan-200 font-semibold leading-tight mt-0.5">
                  Online
                </span>
              </div>
            </div>
          </button>
        </div>
      ) : (
        /* Docked / Minimized Pill */
        <button
          onClick={() => setIsMinimized(false)}
          title="Open Vayo AI"
          className="bg-indigo-600 hover:bg-indigo-700 text-white pl-2.5 pr-2 py-1.5 rounded-l-full shadow-lg border-y border-l border-white/60 flex items-center space-x-1.5 transition active:scale-95 cursor-pointer animate-in slide-in-from-right-2"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-black tracking-tight">vayo</span>
          <span className="text-xs text-indigo-200">‹</span>
        </button>
      )}
    </div>
  );
};
