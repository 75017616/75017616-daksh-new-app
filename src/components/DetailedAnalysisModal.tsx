import React from 'react';

interface DetailedAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category: string;
  score: number;
  careers: string[];
  recommendations: string[];
}

export const DetailedAnalysisModal: React.FC<DetailedAnalysisModalProps> = ({
  isOpen,
  onClose,
  title,
  category,
  score,
  careers,
  recommendations,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="w-full max-w-[400px] max-h-[85%] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-100 animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 p-5 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">{category} Analysis</span>
            <h3 className="text-base font-bold tracking-tight">{title}</h3>
            <span className="text-xs font-semibold text-emerald-300">Aptitude Score: {score}%</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4 overflow-y-auto no-scrollbar flex-1 text-xs text-slate-700">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">🎓 Recommended Academic Stream</h4>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Based on this aptitude index, you show a natural competitive edge in analytical reasoning and sensory synthesis.
              Recommended high school focus: <strong>STEM with Applied Computing / Advanced Sciences</strong>.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">💼 Prime Career Alignment</h4>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {careers.map((c, i) => (
                <span key={i} className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg text-[10px] font-semibold border border-indigo-100">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-xs">🚀 Student Action Plan</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-600">
              {recommendations.slice(0, 4).map((rec, i) => (
                <li key={i} className="flex items-start space-x-1.5">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center space-x-2.5 text-emerald-900">
            <span className="text-lg">🏆</span>
            <div className="text-[10px] leading-tight">
              <strong>Counselor Endorsement</strong>
              <span className="block text-emerald-700 mt-0.5">Top 5% aptitude tier for student age bracket.</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center space-x-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl text-xs"
          >
            Close
          </button>
          <button
            onClick={() => {
              alert('Detailed analytical roadmap printed & saved to your report dossier!');
              onClose();
            }}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-sm"
          >
            Save to Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
