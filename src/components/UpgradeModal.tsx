import React, { useState } from 'react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPremium?: boolean;
  onUnlockAll?: () => void;
  onTogglePlan?: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  isPremium = false,
  onUnlockAll,
  onTogglePlan
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'student' | 'family'>('family');
  const [isProcessing, setIsProcessing] = useState(false);
  const [unlockedSuccess, setUnlockedSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePayAndUnlock = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setUnlockedSuccess(true);
      if (onUnlockAll) onUnlockAll();
      setTimeout(() => {
        setUnlockedSuccess(false);
        onClose();
      }, 1400);
    }, 800);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
      <div className="w-full max-w-[390px] max-h-[94%] bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100 flex flex-col">
        {/* Header Hero */}
        <div className="bg-gradient-to-br from-[#1b105c] via-[#2f1b94] to-[#4338ca] p-5 text-white text-center relative shrink-0">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center text-2xl mb-2 shadow-lg">
            👑
          </div>
          <div className="inline-flex items-center space-x-1.5 bg-amber-400/20 border border-amber-300/40 text-amber-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-1">
            <span>⚡ Freemium Plan Architecture</span>
          </div>
          <h3 className="text-base font-extrabold tracking-tight">Unlock Full Cognitive Suite</h3>
          <p className="text-[11px] text-indigo-200 mt-0.5 leading-relaxed max-w-[280px] mx-auto">
            Free plan includes full Personality Type. Unlock all 8 Intelligences, 5 Senses, Brain Dominance & Live Sessions.
          </p>
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 text-white/70 hover:text-white p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 space-y-3 bg-[#FAFBFD] flex-1 overflow-y-auto no-scrollbar">
          {unlockedSuccess ? (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-md">
                ✓
              </div>
              <h4 className="text-base font-bold text-slate-900">Payment Successful!</h4>
              <p className="text-xs text-slate-600">
                All 8 Multiple Intelligences, 5 Senses, Brain Dominance, and Unlimited AI Counseling are now fully unlocked!
              </p>
            </div>
          ) : (
            <>
              {/* Free vs Premium Transparency Card */}
              <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-2 text-xs">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex justify-between items-center">
                  <span>Current Freemium Breakdown</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    isPremium ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {isPremium ? '👑 Premium Active' : 'Basic Free Tier'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100">
                  <div className="p-2 bg-purple-50/70 border border-purple-100 rounded-xl space-y-1">
                    <span className="font-bold text-purple-900 block flex items-center space-x-1">
                      <span>✨ Free Forever</span>
                    </span>
                    <ul className="text-[10px] text-purple-800 space-y-0.5">
                      <li>• Full Personality Blend</li>
                      <li>• Primary & Secondary Traits</li>
                      <li>• Basic Element Statuses</li>
                      <li>• 3 Free Basic Vayo AI queries</li>
                    </ul>
                  </div>

                  <div className="p-2 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-1">
                    <span className="font-bold text-indigo-900 block flex items-center space-x-1">
                      <span>🔒 Unlocks on Pay</span>
                    </span>
                    <ul className="text-[10px] text-indigo-800 space-y-0.5">
                      <li>• 8 Multi Intelligence Wheel</li>
                      <li>• 5 Senses Deep Analysis</li>
                      <li>• Full Brain Dominance Traits</li>
                      <li>• 32-Page Certified PDF Dossier</li>
                      <li>• Unlimited AI + Live Counselor</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Plan Switcher */}
              <div className="space-y-2">
                <div
                  onClick={() => setSelectedPlan('family')}
                  className={`p-3 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between ${
                    selectedPlan === 'family'
                      ? 'border-indigo-600 bg-indigo-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-extrabold text-slate-900">Family VIP Pack (Recommended)</span>
                      <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        Best Value
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500">Up to 5 Family Members • All reports + Live Counselor slot</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-indigo-950">₹999</span>
                    <span className="block text-[9px] text-slate-400 line-through">₹2,999</span>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedPlan('student')}
                  className={`p-3 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between ${
                    selectedPlan === 'student'
                      ? 'border-indigo-600 bg-indigo-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-extrabold text-slate-900">Single Student Pass</span>
                    <p className="text-[10px] text-slate-500">1 Student lifetime access to all unlocked reports</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-indigo-950">₹499</span>
                    <span className="block text-[9px] text-slate-400 line-through">₹1,499</span>
                  </div>
                </div>
              </div>

              {/* Pay and Unlock CTA */}
              <button
                onClick={handlePayAndUnlock}
                disabled={isProcessing}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer transition active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-1.5"
              >
                <span>{isProcessing ? 'Processing Payment...' : 'Pay & Unlock Everything Now ✨'}</span>
              </button>

              {/* Fast Testing Toggle for user review */}
              {onTogglePlan && (
                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={onTogglePlan}
                    className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
                  >
                    {isPremium ? 'Switch back to Free Tier (Demo)' : 'Quick-toggle to Premium (No-card demo)'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
