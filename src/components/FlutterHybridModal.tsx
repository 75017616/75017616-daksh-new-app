import React, { useState } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  Smartphone,
  Cpu,
  Layers,
  Terminal,
  FileCode,
  FolderGit2,
  ExternalLink,
  Zap,
  ShieldCheck,
  Share2,
  Compass,
  Play
} from 'lucide-react';
import JSZip from 'jszip';
import { flutterFiles, FlutterSourceFile } from '../data/flutterSourceCode';
import { FlutterBridgeService } from '../services/flutterBridge';

interface FlutterHybridModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlutterHybridModal: React.FC<FlutterHybridModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'explorer' | 'download' | 'bridge'>('summary');
  const [selectedFile, setSelectedFile] = useState<FlutterSourceFile>(flutterFiles[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedFile, setCopiedFile] = useState(false);
  const [copiedBash, setCopiedBash] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);
  const [bridgeLog, setBridgeLog] = useState<string[]>([]);

  if (!isOpen) return null;

  const filteredFiles = flutterFiles.filter((file) => {
    const matchesCat = selectedCategory === 'all' || file.category === selectedCategory;
    const matchesSearch = file.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          file.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder('daksh_flutter_hybrid');

      flutterFiles.forEach((file) => {
        folder?.file(file.path, file.code);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'daksh_flutter_hybrid.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 3000);
    } catch (err) {
      console.error('Error generating zip:', err);
      alert('Failed to generate zip file. You can still copy code directly from the Code Explorer tab.');
    } finally {
      setIsZipping(false);
    }
  };

  const logBridgeAction = (msg: string) => {
    setBridgeLog((prev) => [
      `[${new Date().toLocaleTimeString()}] ${msg}`,
      ...prev.slice(0, 7)
    ]);
  };

  const testHaptic = (type: 'light' | 'medium' | 'heavy' | 'selection') => {
    FlutterBridgeService.triggerHaptic(type);
    logBridgeAction(`Haptic invoked: type='${type}' (Native Flutter/Web Vibration triggered)`);
  };

  const testShare = () => {
    FlutterBridgeService.share(
      'Daksh Assessment',
      'Check out my 94% Logical Intelligence and Balanced Brain Dominance profile!'
    );
    logBridgeAction(`Native Share invoked: Title='Daksh Assessment'`);
  };

  const testNavigate = (screen: string) => {
    FlutterBridgeService.sendNativeNavigation(screen, { timestamp: Date.now() });
    logBridgeAction(`Bridge Navigation sent: target='${screen}'`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-[430px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 p-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <Smartphone className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">
                  Dual-Engine Architecture
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white mt-0.5">
                Flutter Hybrid Platform
              </h2>
            </div>
          </div>

          <p className="text-xs text-indigo-100/90 mt-2 leading-relaxed">
            Exported codebase, bidirectional JS bridge & native Flutter 60 FPS mobile modules.
          </p>

          {/* Navigation Tabs */}
          <div className="flex bg-white/10 p-1 rounded-xl mt-4 text-xs font-semibold backdrop-blur-md">
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                activeTab === 'summary' ? 'bg-white text-indigo-900 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab('explorer')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                activeTab === 'explorer' ? 'bg-white text-indigo-900 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              Code ({flutterFiles.length})
            </button>
            <button
              onClick={() => setActiveTab('download')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                activeTab === 'download' ? 'bg-white text-indigo-900 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              Export ZIP
            </button>
            <button
              onClick={() => setActiveTab('bridge')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                activeTab === 'bridge' ? 'bg-white text-indigo-900 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              Bridge Test
            </button>
          </div>
        </div>

        {/* Tab 1: Architecture Summary */}
        {activeTab === 'summary' && (
          <div className="p-4 overflow-y-auto no-scrollbar space-y-4">
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3.5">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Conversion Architecture Summary</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                This project has been transformed into a production-grade <strong>Flutter Hybrid Platform</strong>.
                It can run in two harmonized execution environments:
              </p>
            </div>

            {/* Mode 1 & 2 Cards */}
            <div className="space-y-3">
              <div className="border border-slate-200 rounded-2xl p-3 bg-white shadow-sm">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-[11px]">
                    1
                  </div>
                  Hybrid WebView Engine (<code className="text-[11px] font-mono text-indigo-600">flutter_inappwebview</code>)
                </div>
                <p className="text-[11px] text-slate-600 mt-1 pl-7">
                  Embeds your complete Vite React application inside Flutter. Enables instant live updates,
                  offline caching, and low-latency bidirectional JavaScript-to-Dart communication.
                </p>
              </div>

              <div className="border border-slate-200 rounded-2xl p-3 bg-white shadow-sm">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px]">
                    2
                  </div>
                  Pure Native Flutter UI (60 FPS Material 3)
                </div>
                <p className="text-[11px] text-slate-600 mt-1 pl-7">
                  Native screens for Dashboard, 8 Intelligences, Brain Dominance, SWOT, and Vayo AI Counselor
                  with custom radar chart painter and native Google Generative AI integration.
                </p>
              </div>

              <div className="border border-slate-200 rounded-2xl p-3 bg-white shadow-sm">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px]">
                    3
                  </div>
                  Bidirectional Hardware Bridge (<code className="text-[11px] font-mono text-indigo-600">FlutterBridge</code>)
                </div>
                <p className="text-[11px] text-slate-600 mt-1 pl-7">
                  Web code triggers native device haptics, system share sheets, local encrypted SharedPreferences,
                  and push notifications directly from JavaScript.
                </p>
              </div>
            </div>

            {/* Quick action button to view code */}
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('download')}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 active:scale-[0.98] transition"
              >
                <Download className="w-4 h-4" />
                Download Complete Flutter Source Code (.zip)
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Source Code Explorer */}
        {activeTab === 'explorer' && (
          <div className="flex flex-col flex-1 overflow-hidden p-3">
            {/* Search and Category Filter */}
            <div className="space-y-2 pb-2 border-b border-slate-100">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search screens, models, bridge files..."
                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />

              <div className="flex gap-1 overflow-x-auto no-scrollbar text-[10.5px]">
                {[
                  { id: 'all', label: `All (${flutterFiles.length})` },
                  { id: 'screens', label: 'Screens (13)' },
                  { id: 'widgets', label: 'Widgets & Modals' },
                  { id: 'data', label: 'Data & Models' },
                  { id: 'services', label: 'Services & Bridge' },
                  { id: 'platform', label: 'Android & iOS' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2 py-0.5 rounded-lg whitespace-nowrap font-medium transition ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* File Selector Pills */}
            <div className="flex gap-1.5 overflow-x-auto py-2 no-scrollbar border-b border-slate-100">
              {filteredFiles.map((file) => {
                const isActive = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-indigo-600 text-white font-bold shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <FileCode className="w-3 h-3" />
                    {file.name}
                  </button>
                );
              })}
            </div>

            {/* Selected File Details */}
            <div className="flex items-center justify-between py-2 text-xs">
              <span className="font-mono font-bold text-slate-800 text-[11px] truncate max-w-[240px]">
                {selectedFile.path}
              </span>
              <button
                onClick={() => handleCopyCode(selectedFile.code)}
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-semibold text-[11px] transition active:scale-95"
              >
                {copiedFile ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-500 mb-2 italic">
              {selectedFile.description}
            </p>

            {/* Code Box */}
            <div className="flex-1 bg-slate-900 rounded-xl p-3 overflow-y-auto font-mono text-[11px] text-slate-200 leading-relaxed shadow-inner max-h-[320px]">
              <pre className="whitespace-pre">{selectedFile.code}</pre>
            </div>
          </div>
        )}

        {/* Tab 3: Download & Build Instructions */}
        {activeTab === 'download' && (
          <div className="p-4 overflow-y-auto no-scrollbar space-y-4">
            <div className="text-center p-4 bg-gradient-to-b from-indigo-50 to-white rounded-2xl border border-indigo-100">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm mt-3">
                Download Complete Flutter Project
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-[280px] mx-auto">
                Includes all Dart source files, Android Gradle configs, iOS schemas, and bridge scripts.
              </p>

              <button
                onClick={handleDownloadZip}
                disabled={isZipping}
                className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 mx-auto shadow-md shadow-indigo-600/20 transition disabled:opacity-50"
              >
                {isZipping ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Bundling daksh_flutter_hybrid.zip...
                  </>
                ) : zipSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    Downloaded Successfully!
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download daksh_flutter_hybrid.zip
                  </>
                )}
              </button>
            </div>

            {/* Run Commands */}
            <div className="border border-slate-200 rounded-2xl p-3.5 bg-slate-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-slate-700 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-600" />
                  Terminal Commands
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`unzip daksh_flutter_hybrid.zip\ncd daksh_flutter_hybrid\nflutter pub get\nflutter run`);
                    setCopiedBash(true);
                    setTimeout(() => setCopiedBash(false), 2000);
                  }}
                  className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  {copiedBash ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  {copiedBash ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="bg-slate-900 rounded-lg p-2.5 text-slate-200 font-mono text-[11px] space-y-1">
                <div><span className="text-slate-500"># 1. Extract zip</span></div>
                <div>unzip daksh_flutter_hybrid.zip</div>
                <div><span className="text-slate-500"># 2. Install dependencies</span></div>
                <div>cd daksh_flutter_hybrid && flutter pub get</div>
                <div><span className="text-slate-500"># 3. Launch on emulator or phone</span></div>
                <div className="text-emerald-400">flutter run</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Bridge Diagnostics & Interactive Tester */}
        {activeTab === 'bridge' && (
          <div className="p-4 overflow-y-auto no-scrollbar space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
              <span className="font-bold text-xs text-slate-800 block">
                Bidirectional Bridge Diagnostics
              </span>
              <p className="text-[11px] text-slate-600 mt-1">
                Test events emitted between Vite JavaScript and host Flutter container.
              </p>
            </div>

            {/* Test Actions */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Simulate Hardware Triggers:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => testHaptic('selection')}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-xs font-semibold text-slate-800 flex items-center gap-1.5 shadow-sm transition"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Haptic Click
                </button>
                <button
                  onClick={() => testHaptic('heavy')}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-xs font-semibold text-slate-800 flex items-center gap-1.5 shadow-sm transition"
                >
                  <Zap className="w-3.5 h-3.5 text-red-500" />
                  Haptic Heavy
                </button>
                <button
                  onClick={testShare}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-xs font-semibold text-slate-800 flex items-center gap-1.5 shadow-sm transition"
                >
                  <Share2 className="w-3.5 h-3.5 text-blue-500" />
                  Native Share
                </button>
                <button
                  onClick={() => testNavigate('swot')}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-xs font-semibold text-slate-800 flex items-center gap-1.5 shadow-sm transition"
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-500" />
                  Bridge Nav
                </button>
              </div>
            </div>

            {/* Bridge Console Log */}
            <div className="bg-slate-900 rounded-xl p-3 text-[11px] font-mono text-slate-300">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1.5 border-b border-slate-800 pb-1 flex items-center justify-between">
                <span>Console Log</span>
                <button
                  onClick={() => setBridgeLog([])}
                  className="text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              </div>
              {bridgeLog.length === 0 ? (
                <div className="text-slate-500 italic py-2 text-center">
                  Tap buttons above to simulate bridge events
                </div>
              ) : (
                <div className="space-y-1">
                  {bridgeLog.map((log, i) => (
                    <div key={i} className="text-emerald-400/90 leading-tight">
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ready for Android APK & iOS build</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-xl active:scale-95 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
