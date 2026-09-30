import React, { useState } from 'react';
import { Smartphone, Download, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  onOpenAndroidModal?: () => void;
  variant?: 'header' | 'floating' | 'banner' | 'card';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  onOpenAndroidModal,
  variant = 'header'
}) => {
  const { isInstallable, isInstalled, install, isIOS, isAndroid } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running in standalone native mode, don't show the install CTA
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (!outcome && onOpenAndroidModal) {
        onOpenAndroidModal();
      }
    } else if (onOpenAndroidModal) {
      onOpenAndroidModal();
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  if (variant === 'header') {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold shadow-sm transition active:scale-95"
          title="Install Daksh on Android or iPhone"
          aria-label="Install App"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Install App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-slate-800">
              <h3 className="text-base font-bold text-slate-900">Install Daksh on iPhone / iPad</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                1. Tap the <strong>Share</strong> button in Safari's bottom toolbar.<br />
                2. Scroll down and tap <strong>Add to Home Screen</strong>.<br />
                3. Tap <strong>Add</strong> in the top-right corner.
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full rounded-xl bg-indigo-600 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  if (variant === 'banner') {
    return (
      <div className="mx-4 mt-3 mb-1 p-3 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-2xl shadow-md flex items-center justify-between gap-3 border border-indigo-700/50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Android APK</span>
            </div>
            <p className="text-xs font-bold leading-tight">Run Daksh on your phone</p>
          </div>
        </div>

        <button
          onClick={handleInstallClick}
          className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shrink-0 transition active:scale-95 flex items-center gap-1.5 shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleInstallClick}
      className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-700 transition"
    >
      <Smartphone className="w-4 h-4" />
      <span>Install Android App</span>
    </button>
  );
};
