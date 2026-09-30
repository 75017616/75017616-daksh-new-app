import React, { useState } from 'react';
import { StudentProfile } from '../types';

interface LiveCounselorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: StudentProfile;
  onOpenUpgrade?: () => void;
}

export const LiveCounselorModal: React.FC<LiveCounselorModalProps> = ({
  isOpen,
  onClose,
  activeProfile,
  onOpenUpgrade
}) => {
  const [selectedCounselor, setSelectedCounselor] = useState('counselor-1');
  const [selectedMode, setSelectedMode] = useState<'callback' | 'whatsapp' | 'video'>('callback');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [selectedSlot, setSelectedSlot] = useState('Today, 4:30 PM');
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'confirmed'>('idle');

  if (!isOpen) return null;

  const counselors = [
    {
      id: 'counselor-1',
      name: 'Dr. Neha Sharma',
      role: 'Senior DISC & Child Psychologist',
      exp: '14+ yrs experience',
      rating: '4.95',
      reviews: '1,280+',
      avatar: '👩‍⚕️',
      specialty: 'Stream Selection & Cognitive Guidance'
    },
    {
      id: 'counselor-2',
      name: 'Dr. Rajiv Malhotra',
      role: 'Career Strategist & Educationist',
      exp: '11+ yrs experience',
      rating: '4.92',
      reviews: '960+',
      avatar: '👨‍🏫',
      specialty: 'STEM & Career Roadmaps'
    },
    {
      id: 'counselor-3',
      name: 'Ms. Ananya Sen',
      role: 'Behavioral & Learning Specialist',
      exp: '9+ yrs experience',
      rating: '4.89',
      reviews: '840+',
      avatar: '👩‍💼',
      specialty: 'Sensory Styles & Habit Coaching'
    }
  ];

  const handleConfirm = () => {
    setBookingStatus('submitting');
    setTimeout(() => {
      setBookingStatus('confirmed');
    }, 900);
  };

  const handleReset = () => {
    setBookingStatus('idle');
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
      <div className="w-full max-w-[390px] max-h-[92%] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1e1363] via-[#3723a8] to-[#4338ca] p-4 text-white relative">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shadow-inner">
              🧑‍⚕️
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="text-sm font-bold tracking-tight">Connect with Live Counselor</h3>
                <span className="bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-indigo-200 mt-0.5">
                1-on-1 human expert counseling for {activeProfile.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {bookingStatus === 'confirmed' ? (
          <div className="p-6 text-center space-y-4 flex-1 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto shadow-md">
              ✓
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Session Request Confirmed!</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {selectedMode === 'callback' && `Our Senior Counselor will call you at ${phone} within 15 minutes.`}
                {selectedMode === 'whatsapp' && `Counselor connected on WhatsApp! Check your phone for direct chat invitation.`}
                {selectedMode === 'video' && `Video consultation scheduled for ${selectedSlot}. Meeting link sent to SMS & Email.`}
              </p>
            </div>

            <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-2xl text-left space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-500">Student:</span>
                <span className="text-indigo-950">{activeProfile.name} ({activeProfile.role})</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-slate-500">Assigned Counselor:</span>
                <span className="text-indigo-950">
                  {counselors.find((c) => c.id === selectedCounselor)?.name}
                </span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-slate-500">Consultation Slot:</span>
                <span className="text-emerald-700 font-bold">{selectedSlot}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition active:scale-95"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-3.5 flex-1 overflow-y-auto no-scrollbar bg-[#FAFBFD]">
            {/* Consultation Mode Picker */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                Select Consultation Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMode('callback')}
                  className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                    selectedMode === 'callback'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-200'
                  }`}
                >
                  <span className="text-base block mb-0.5">📞</span>
                  <span className="text-[10px] block leading-tight">Instant Callback</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMode('whatsapp')}
                  className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                    selectedMode === 'whatsapp'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-200'
                  }`}
                >
                  <span className="text-base block mb-0.5">💬</span>
                  <span className="text-[10px] block leading-tight">WhatsApp Chat</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMode('video')}
                  className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                    selectedMode === 'video'
                      ? 'bg-purple-50 border-purple-500 text-purple-900 font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-purple-200'
                  }`}
                >
                  <span className="text-base block mb-0.5">🎥</span>
                  <span className="text-[10px] block leading-tight">Video (30 min)</span>
                </button>
              </div>
            </div>

            {/* Counselor Selection */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                Select Certified Specialist
              </label>
              <div className="space-y-2">
                {counselors.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCounselor(c.id)}
                    className={`p-2.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                      selectedCounselor === c.id
                        ? 'bg-indigo-50/70 border-indigo-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="text-2xl">{c.avatar}</span>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <h4 className="text-xs font-bold text-slate-900">{c.name}</h4>
                          <span className="text-[9.5px] text-amber-600 font-bold flex items-center">
                            ★ {c.rating}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500">{c.role} • {c.exp}</p>
                        <p className="text-[9.5px] text-indigo-600 font-medium">{c.specialty}</p>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0">
                      {selectedCounselor === c.id && (
                        <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Details */}
            <div className="space-y-2">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="+91 Phone number"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['Today, 4:30 PM', 'Today, 6:00 PM', 'Tomorrow, 11:00 AM', 'Tomorrow, 5:00 PM'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-1.5 px-2 rounded-xl text-[10px] font-semibold border transition cursor-pointer ${
                        selectedSlot === slot
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Upgrade Banner note */}
            {onOpenUpgrade && (
              <div className="p-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl flex items-center justify-between">
                <div className="text-[10px] text-amber-900">
                  <span className="font-bold block">Need unlimited counseling?</span>
                  Premium includes priority sessions + full DISC reports.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenUpgrade();
                  }}
                  className="text-[10px] font-bold text-amber-800 bg-amber-200/70 hover:bg-amber-200 px-2 py-1 rounded-lg shrink-0 cursor-pointer"
                >
                  View Plan
                </button>
              </div>
            )}

            {/* Action button */}
            <button
              onClick={handleConfirm}
              disabled={bookingStatus === 'submitting'}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition active:scale-95 disabled:opacity-50 mt-1"
            >
              {bookingStatus === 'submitting' ? 'Scheduling with Counselor...' : 'Confirm Consultation Booking ✨'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
