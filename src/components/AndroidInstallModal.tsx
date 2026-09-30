import React, { useState } from 'react';
import {
  Smartphone,
  Download,
  QrCode,
  CheckCircle2,
  Copy,
  ExternalLink,
  X,
  Sparkles,
  ShieldCheck,
  Zap,
  Terminal,
  HelpCircle,
  Share2
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install, isAndroid, isIOS } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'instant' | 'apk' | 'qr' | 'developer'>('instant');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://daksh.app';
  const appOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://daksh.app';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(currentUrl)}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2200);
  };

  const handleTriggerInstall = async () => {
    setIsInstalling(true);
    try {
      if (isInstallable) {
        await install();
      } else {
        alert("To install on your phone:\n1. Tap the 3 dots (⋮) in Chrome\n2. Tap 'Install app' or 'Add to Home screen'");
      }
    } finally {
      setIsInstalling(false);
    }
  };

  const capacitorCommand = `npm i -g @capacitor/cli\nnpx cap init Daksh com.daksh.intelligence --web-dir dist\nnpm run build\nnpx cap add android\nnpx cap open android`;

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(capacitorCommand);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[410px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="android-modal-title"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <Smartphone className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                  Android Ready
                </span>
              </div>
              <h2 id="android-modal-title" className="text-xl font-bold tracking-tight text-white mt-0.5">
                Run on Your Phone
              </h2>
            </div>
          </div>

          <p className="text-xs text-indigo-100/90 mt-2.5 leading-relaxed">
            Install Daksh as a native Android app directly on your device, or download the APK package.
          </p>

          {/* Navigation Pills */}
          <div className="flex bg-black/20 p-1 rounded-xl mt-4 gap-1">
            <button
              onClick={() => setActiveTab('instant')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
                activeTab === 'instant'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              1-Tap Install
            </button>
            <button
              onClick={() => setActiveTab('apk')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
                activeTab === 'apk'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              APK Package
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
                activeTab === 'qr'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Scan QR
            </button>
            <button
              onClick={() => setActiveTab('developer')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
                activeTab === 'developer'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              CLI Build
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* TAB 1: 1-Tap WebAPK (Best Android experience) */}
          {activeTab === 'instant' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950">
                  <strong className="font-semibold block text-emerald-900">
                    Official Android WebAPK Engine
                  </strong>
                  Google Chrome automatically compiles and installs an actual native APK directly on Android with no unknown source warnings!
                </div>
              </div>

              {isInstalled ? (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">Daksh is Installed!</h4>
                  <p className="text-xs text-slate-500">
                    This app is already running in standalone native mode on your system.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleTriggerInstall}
                    disabled={isInstalling}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition active:scale-[0.98]"
                  >
                    <Download className="w-5 h-5" />
                    <span>Install Daksh App on Phone</span>
                  </button>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2.5">
                    <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      How it works on Android (Chrome / Brave):
                    </h4>
                    <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside pl-1 leading-relaxed">
                      <li>Open this URL in <strong>Chrome</strong> on your Android phone.</li>
                      <li>Tap the <strong>Install Daksh App</strong> button above, or tap Chrome's menu (<strong>⋮</strong>).</li>
                      <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                      <li>An app icon appears in your phone's App Drawer and Home screen!</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Native App Features checklist */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div className="p-2.5 bg-slate-50 rounded-xl flex items-center gap-2 border border-slate-100">
                  <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Full-screen (no URL bar)</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl flex items-center gap-2 border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Runs 100% offline</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl flex items-center gap-2 border border-slate-100">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Instant load speed</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl flex items-center gap-2 border border-slate-100">
                  <Smartphone className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>Hardware accelerated</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Generate Raw APK file */}
          {activeTab === 'apk' && (
            <div className="space-y-4">
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl text-xs text-indigo-900 leading-relaxed">
                Want a downloadable <strong>.apk</strong> or <strong>.aab</strong> file to sideload or submit to the Google Play Console? Use Microsoft & Google's official cloud package builder:
              </div>

              {/* PWABuilder Card */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-sm">
                      PWA
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">PWABuilder Android Generator</h4>
                      <p className="text-[11px] text-slate-500">Official Google / Microsoft Android packager</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                    Free & Instant
                  </span>
                </div>

                <p className="text-xs text-slate-600">
                  PWABuilder scans this application's active PWA manifest and packages a signed Android APK ready to download and install.
                </p>

                <a
                  href={`https://www.pwabuilder.com/publish?url=${encodeURIComponent(appOrigin)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Generate Android APK on PWABuilder</span>
                </a>
              </div>

              {/* Direct Manifest Link */}
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span className="font-semibold">Manifest URL:</span>
                  <button
                    onClick={handleCopyUrl}
                    className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-medium text-[11px]"
                  >
                    {copiedUrl ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-600 truncate">
                  {currentUrl}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Scan QR Code */}
          {activeTab === 'qr' && (
            <div className="space-y-4 text-center">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 inline-block mx-auto shadow-inner">
                <img
                  src={qrCodeUrl}
                  alt="QR Code to open Daksh on Android"
                  className="w-48 h-48 rounded-xl object-contain mx-auto bg-white p-2 border border-slate-200"
                />
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">Scan with Android Camera</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Open your Android phone's Camera or Google Lens, scan the QR code above, and tap the prompt to install Daksh immediately!
                </p>
              </div>

              <button
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
              >
                {copiedUrl ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedUrl ? 'App URL Copied!' : 'Copy Direct App Link'}</span>
              </button>
            </div>
          )}

          {/* TAB 4: Capacitor / Android Studio CLI */}
          {activeTab === 'developer' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-indigo-600" />
                  Build APK via Capacitor & Android Studio:
                </h4>
                <button
                  onClick={handleCopyCommand}
                  className="text-indigo-600 text-xs font-medium flex items-center gap-1 hover:underline"
                >
                  {copiedCommand ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-2xl overflow-x-auto leading-relaxed border border-slate-800">
                {capacitorCommand}
              </pre>

              <div className="text-[11px] text-slate-500 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="font-semibold text-slate-700">Steps to compile APK in Android Studio:</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Run the commands above in your project folder.</li>
                  <li>Android Studio opens the generated <code className="text-indigo-600">/android</code> project.</li>
                  <li>Click <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong>.</li>
                  <li>Locate <code className="text-indigo-600">app-debug.apk</code> and transfer it to your phone!</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Google WebAPK &amp; PWA Standard</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
