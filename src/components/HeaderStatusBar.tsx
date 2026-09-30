import React from 'react';

interface HeaderStatusBarProps {
  darkText?: boolean;
}

export const HeaderStatusBar: React.FC<HeaderStatusBarProps> = ({ darkText = true }) => {
  return (
    <header className={`w-full pt-3 px-7 pb-2 flex justify-between items-center text-xs font-semibold tracking-tight z-30 select-none ${darkText ? 'text-slate-900' : 'text-white'}`}>
      <span className="text-[15px] font-semibold tracking-tight">9:41</span>
      <div className="flex items-center space-x-1.5">
        {/* Cellular Signal Icon */}
        <svg className="w-4 h-3.5 fill-current" viewBox="0 0 17 12">
          <rect height="4" rx="0.8" width="3" x="0" y="8" />
          <rect height="6.5" rx="0.8" width="3" x="4.5" y="5.5" />
          <rect height="9" rx="0.8" width="3" x="9" y="3" />
          <rect height="12" rx="0.8" width="3" x="13.5" y="0" />
        </svg>

        {/* Wifi Icon */}
        <svg className="w-4 h-3.5 fill-current ml-0.5" viewBox="0 0 16 12">
          <path d="M8 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm5.07-5.07a7.17 7.17 0 00-10.14 0 .75.75 0 11-1.06-1.06 8.67 8.67 0 0112.26 0 .75.75 0 01-1.06 1.06zm-2.12 2.12a4.17 4.17 0 00-5.9 0 .75.75 0 01-1.06-1.06 5.67 5.67 0 018.02 0 .75.75 0 01-1.06 1.06z" />
        </svg>

        {/* Battery Icon */}
        <div className={`w-6 h-3 border rounded-[3.5px] p-[1.5px] flex items-center relative ml-0.5 ${darkText ? 'border-black' : 'border-white'}`}>
          <div className={`h-full w-[80%] rounded-[1.5px] ${darkText ? 'bg-black' : 'bg-white'}`} />
          <div className={`w-[1.5px] h-[4px] absolute -right-[3px] rounded-r-sm ${darkText ? 'bg-black' : 'bg-white'}`} />
        </div>
      </div>
    </header>
  );
};
