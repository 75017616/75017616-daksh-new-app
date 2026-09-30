import React, { useState } from 'react';
import { StudentProfile } from '../types';

interface AICounselorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: StudentProfile;
  initialPrompt?: string;
  isPremium?: boolean;
  onOpenLiveCounselor?: () => void;
  onOpenUpgrade?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  showCounselorCard?: boolean;
}

export const AICounselorModal: React.FC<AICounselorModalProps> = ({
  isOpen,
  onClose,
  activeProfile,
  initialPrompt,
  isPremium = false,
  onOpenLiveCounselor,
  onOpenUpgrade
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello ${activeProfile.name}! 👋 I am Vayo, your student AI counselor. I have analyzed your assessment profile.\n\n💡 In Free Tier, I can answer your basic orientation questions. After basic questions, you will be invited to connect directly with our Certified Live Human Counselor for in-depth guidance. How can I assist you right now?`,
      timestamp: '9:41 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [basicQuestionsLeft, setBasicQuestionsLeft] = useState(isPremium ? 999 : 3);
  const [isTyping, setIsTyping] = useState(false);

  // If initialPrompt provided when opened, send it automatically
  React.useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    if (!isPremium && basicQuestionsLeft <= 0) {
      // Basic limit reached
      return;
    }

    const nextCount = isPremium ? 999 : Math.max(0, basicQuestionsLeft - 1);
    const reachedLimit = !isPremium && nextCount === 0;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setBasicQuestionsLeft(nextCount);
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('counselor') || lower.includes('human') || lower.includes('call') || lower.includes('live')) {
        reply = `🧑‍⚕️ Connecting you with our Live Human Counselor! Our certified child psychologists and educational counselors provide 1-on-1 personalized academic guidance and career planning based on your full assessment results.`;
      } else if (lower.includes('who are you') || lower.includes('vayo')) {
        reply = `🤖 I'm **Vayo**, your intelligent student advisor and cognitive guide built into the Daksh platform! I synthesize your DISC behavioral indicators, 8 Gardner intelligences, and sensory strengths to give you clarity on school, exams, and career pathways.`;
      } else if (lower.includes('career') || lower.includes('best career')) {
        reply = `🎯 Based on your dominant Right Brain (65%), strong Bodily Kinesthetic (85%), and Interpersonal (80%) intelligences, your top career fits are:\n\n1. **Software & Game Engineering (94% match)** - combining creative logic and visual systems.\n2. **Robotics & Biomedical Engineering (91%)** - hands-on technical creation.\n3. **Architecture & Spatial Design (88%)** - visual-spatial innovation.`;
      } else if (lower.includes('strength') || lower.includes('strengths')) {
        reply = `⭐ Your standout core strengths are:\n\n• **Bodily-Kinesthetic (85%)**: High tactile dexterity, quick muscle memory, and learning best by doing.\n• **Linguistic & Rhetoric (80%)**: Expressive communication, active storytelling, and vocabulary retention.\n• **Interpersonal (80%)**: Social empathy, conflict mediation, and natural team leadership.`;
      } else if (lower.includes('improve') || lower.includes('weakness')) {
        reply = `📈 Here is your customized improvement blueprint:\n\n1. **Build Patience**: Practice 5-minute daily mindfulness breathing before exams.\n2. **Delegation**: When leading group projects in ${activeProfile.grade || 'school'}, assign specific mini-tasks to peers instead of taking everything upon yourself.\n3. **Time Management**: Use a physical daily study planner to boost consistency and reduce threats.`;
      } else if (lower.includes('growth plan') || lower.includes('plan')) {
        reply = `📋 Your 4-Week Strategic Growth Plan:\n\n• **Week 1**: Complete daily logic puzzles + 20 min reading of diverse literary genres.\n• **Week 2**: Join a school debate club or public speaking circle to polish rhetoric.\n• **Week 3**: Undertake a hands-on maker project (robotics kit or 3D model build).\n• **Week 4**: Review monthly progress with your family mentor and adjust targets.`;
      } else {
        reply = `Great question, ${activeProfile.name}! Given your Visual & Practical learning profile (88% Vision, 82% Touch), remember that you understand complex subjects best when paired with 3D models, visual flowcharts, and hands-on experiments rather than passive rote memorization.`;
      }

      // If reaching the limit, append the counselor message
      if (reachedLimit) {
        reply += `\n\n━━━━━━━━━━━━━━━━━━━━\n🌟 **Free Basic AI Orientation Complete!**\n\nYou've finished your free basic orientation questions. For deeper academic subject streams, personalized career roadmaps, and psychological growth strategies, **you have to connect with our Certified Live Counselor**!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          showCounselorCard: reachedLimit
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-3 select-none">
      <div className="w-full max-w-[420px] h-[94%] sm:h-[660px] bg-white rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1e1363] via-[#321f9c] to-[#241372] p-4 text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center space-x-3">
            {/* Vayo Avatar */}
            <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-cyan-400/40 flex flex-col items-center justify-center p-1 shadow-lg relative">
              <span className="w-1 h-1 bg-cyan-400 rounded-full mb-0.5 shadow-[0_0_4px_#22d3ee]" />
              <div className="w-5 h-2.5 bg-black rounded-xs flex items-center justify-around px-0.5 border border-cyan-500/50">
                <span className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_4px_#22d3ee] animate-pulse" />
                <span className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_4px_#22d3ee] animate-pulse" />
              </div>
              <span className="text-[7px] text-cyan-300 font-black mt-0.5">VAYO</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-extrabold text-sm tracking-tight text-white">Vayo • Student AI</h3>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <p className="text-[10px] text-indigo-200">Active Counselor for {activeProfile.name} ({activeProfile.role})</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Live Counselor direct icon */}
            <button
              onClick={() => {
                onClose();
                if (onOpenLiveCounselor) onOpenLiveCounselor();
              }}
              className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 rounded-xl text-emerald-300 text-[10px] font-bold flex items-center space-x-1 cursor-pointer"
              title="Connect with Live Counselor"
            >
              <span>🧑‍⚕️</span>
              <span>Live Counselor</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition active:scale-95 cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Counter Bar */}
        <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-2 flex items-center justify-between text-xs text-indigo-900 font-medium shrink-0">
          <span className="flex items-center space-x-1 text-indigo-800">
            <span className="text-cyan-600">✦</span>
            <span>{isPremium ? '👑 Unlimited Premium AI Mode' : 'Free Basic AI Orientation'}</span>
          </span>
          {isPremium ? (
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Unlimited Access
            </span>
          ) : (
            <span className="font-semibold text-indigo-700 bg-white px-2 py-0.5 rounded-full border border-indigo-200 shadow-2xs">
              Basic Qs: <strong className={basicQuestionsLeft === 0 ? 'text-rose-600' : 'text-indigo-950'}>{basicQuestionsLeft}/3 left</strong>
            </span>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-[#F8FAFC]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                }`}
              >
                {m.text}
              </div>

              {/* In-chat Live Counselor Action Card */}
              {m.showCounselorCard && (
                <div className="mt-2.5 max-w-[92%] bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-2 border-indigo-300 rounded-2xl p-3.5 shadow-md space-y-2.5 animate-in zoom-in-95">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xl shrink-0">
                      🧑‍⚕️
                    </div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <h4 className="text-xs font-bold text-slate-900">Dr. Neha Sharma & Certified Team</h4>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">Available</span>
                      </div>
                      <p className="text-[10.5px] text-slate-500">Senior Child & Academic Counselor • 14+ yrs exp</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-indigo-950 font-medium bg-white/80 p-2 rounded-xl border border-indigo-100 leading-snug">
                    "I am ready to review {activeProfile.name}'s complete DISC cognitive markers and provide an actionable academic roadmap."
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <button
                      onClick={() => {
                        onClose();
                        if (onOpenLiveCounselor) onOpenLiveCounselor();
                      }}
                      className="py-2 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-[10.5px] flex items-center justify-center space-x-1 shadow-xs transition active:scale-95 cursor-pointer"
                    >
                      <span>📞</span>
                      <span>Instant Callback</span>
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        if (onOpenLiveCounselor) onOpenLiveCounselor();
                      }}
                      className="py-2 px-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-[10.5px] flex items-center justify-center space-x-1 shadow-xs transition active:scale-95 cursor-pointer"
                    >
                      <span>📅</span>
                      <span>Book Video (30m)</span>
                    </button>
                  </div>

                  {onOpenUpgrade && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenUpgrade();
                      }}
                      className="w-full py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-xl font-semibold text-[10px] text-center transition cursor-pointer"
                    >
                      👑 Or Upgrade for Unlimited AI Chat + All Reports
                    </button>
                  )}
                </div>
              )}

              <span className="text-[9px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-1.5 text-slate-400 text-xs bg-white border border-slate-100 rounded-2xl p-3 w-24">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips (Available if questions remain) */}
        {(isPremium || basicQuestionsLeft > 0) && (
          <div className="p-2.5 bg-white border-t border-slate-100 flex items-center space-x-1.5 overflow-x-auto no-scrollbar shrink-0">
            <button
              onClick={() => handleSend('Tell me my best career matches')}
              className="flex-shrink-0 text-[10px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 px-2.5 py-1.5 rounded-xl transition cursor-pointer"
            >
              🎯 Best Career
            </button>
            <button
              onClick={() => handleSend('What are my top strengths?')}
              className="flex-shrink-0 text-[10px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 px-2.5 py-1.5 rounded-xl transition cursor-pointer"
            >
              ⭐ My Strengths
            </button>
            <button
              onClick={() => handleSend('How can I improve my weaknesses?')}
              className="flex-shrink-0 text-[10px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 px-2.5 py-1.5 rounded-xl transition cursor-pointer"
            >
              📈 How can I improve?
            </button>
            <button
              onClick={() => handleSend('Create a growth plan for me')}
              className="flex-shrink-0 text-[10px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 px-2.5 py-1.5 rounded-xl transition cursor-pointer"
            >
              📋 Growth Plan
            </button>
          </div>
        )}

        {/* Input Bar or Counselor Connect Prompt */}
        {!isPremium && basicQuestionsLeft <= 0 ? (
          <div className="p-3 bg-indigo-50/80 border-t border-indigo-100 flex items-center justify-between shrink-0">
            <div className="text-xs text-indigo-900">
              <span className="font-bold block">Free Basic Limit Reached</span>
              <span className="text-[10.5px] text-indigo-700">Connect with Live Counselor for customized guidance</span>
            </div>
            <button
              onClick={() => {
                onClose();
                if (onOpenLiveCounselor) onOpenLiveCounselor();
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1 shadow-sm transition active:scale-95 cursor-pointer"
            >
              <span>🧑‍⚕️</span>
              <span>Connect Now</span>
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2 shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Vayo anything about your assessments..."
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center transition active:scale-95 shadow-sm cursor-pointer"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
