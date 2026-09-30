import React from 'react';
import { HeaderStatusBar } from './HeaderStatusBar';
import { StudentProfile } from '../types';

interface ProfileScreenProps {
  activeProfile: StudentProfile;
  profiles: StudentProfile[];
  onSelectProfile: (profile: StudentProfile) => void;
  onAddMember: () => void;
  onOpenUpgrade: () => void;
  onOpenAndroidModal?: () => void;
  onOpenFlutterModal?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  activeProfile,
  profiles,
  onSelectProfile,
  onAddMember,
  onOpenUpgrade,
  onOpenAndroidModal,
  onOpenFlutterModal,
}) => {
  return (
    <div className="w-full max-w-[420px] mx-auto min-h-full bg-[#F8FAFC] pb-6 select-none flex flex-col relative">
      {/* Unified Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100/90 shrink-0">
        <HeaderStatusBar darkText={true} />
        <div className="px-5 pt-0.5 pb-2.5 flex items-center justify-between">
          <h1 className="text-base font-bold text-slate-900 tracking-tight">Family & Profile</h1>
          <button
            onClick={onOpenUpgrade}
            className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100 cursor-pointer"
          >
            👑 Premium
          </button>
        </div>
      </header>

      {/* Main Profile Info */}
      <main className="px-4 pt-4 space-y-4 flex-1 overflow-y-auto no-scrollbar">
        {/* Active Profile Card */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center space-x-3.5">
          <div className="w-16 h-16 rounded-full border-2 border-indigo-500 p-0.5 bg-gradient-to-tr from-indigo-500 to-purple-400">
            <div className="w-full h-full rounded-full bg-amber-100 flex items-center justify-center text-3xl">
              {activeProfile.avatar}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-1.5">
              <h2 className="text-base font-bold text-slate-900 leading-none">{activeProfile.name}</h2>
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{activeProfile.role} • Student ID: #DK-9842</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">All 6 Key Tests Completed</p>
          </div>
        </section>

        {/* Family Subscription Info */}
        <section className="bg-gradient-to-r from-indigo-900 to-indigo-950 rounded-2xl p-4 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl">👑</span>
              <div>
                <h3 className="text-xs font-bold tracking-tight">Premium Family Plan</h3>
                <p className="text-[10px] text-indigo-200">Valid till 24 May 2025</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
              4/5 Slots Used
            </span>
          </div>
        </section>

        {/* Switch / Manage Family Profiles */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 tracking-tight">Family Members</h3>
            <button
              onClick={onAddMember}
              className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
            >
              + Add Member
            </button>
          </div>

          <div className="space-y-2">
            {profiles.map((p) => {
              const isCurrent = p.id === activeProfile.id;
              return (
                <div
                  key={p.id}
                  onClick={() => onSelectProfile(p)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer ${
                    isCurrent ? 'bg-indigo-50/60 border-indigo-200' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{p.avatar}</span>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block leading-tight">{p.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium leading-tight">{p.role}</span>
                    </div>
                  </div>
                  {isCurrent ? (
                    <span className="text-xs font-bold text-indigo-600 bg-white px-2 py-0.5 rounded-md border border-indigo-200">
                      Viewing
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 hover:text-slate-600 font-medium">
                      Switch →
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Flutter Hybrid Mobile Platform Card */}
        <section className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-2xl p-4 text-white shadow-md space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center font-bold text-sm shadow-sm">
                ⚡
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Flutter Hybrid Platform</h3>
                <p className="text-[10px] text-indigo-200">Dual-engine mobile architecture &amp; Dart SDK</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded-full">
              Full Source
            </span>
          </div>

          <p className="text-xs text-indigo-100/90 leading-relaxed">
            Converted hybrid mobile app with bidirectional JS bridge, 60 FPS native Flutter screens, and full source code zip export.
          </p>

          <button
            onClick={onOpenFlutterModal}
            className="w-full py-2.5 px-3 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 active:scale-98 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>📦</span>
            <span>View Flutter Source Code &amp; Export ZIP</span>
          </button>
        </section>

        {/* Android & Mobile App Card */}
        <section className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 rounded-2xl p-4 border border-emerald-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                📱
              </div>
              <div>
                <h3 className="text-xs font-bold text-emerald-950">Android &amp; Phone App</h3>
                <p className="text-[10px] text-emerald-700">Install APK or direct WebAPK on your device</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-full">
              APK Ready
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Run Daksh full-screen on your phone with offline support, home screen launch, and quick access.
          </p>

          <button
            onClick={onOpenAndroidModal}
            className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center gap-2"
          >
            <span>📲</span>
            <span>Install on Android / Get APK</span>
          </button>
        </section>

        {/* Quick App Preferences */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-2.5 text-xs text-slate-700">
          <h3 className="text-xs font-bold text-slate-900 tracking-tight mb-1">Preferences & Support</h3>
          <div className="flex items-center justify-between py-1 border-b border-slate-50">
            <span>Daily AI Counselor Reminders</span>
            <span className="text-emerald-600 font-bold">Enabled</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-slate-50">
            <span>Assessment Data Privacy</span>
            <span className="text-slate-500 font-medium">Encrypted (Local)</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span>Help & Student Mentorship Hotline</span>
            <span className="text-indigo-600 font-semibold cursor-pointer">Support →</span>
          </div>
        </section>
      </main>
    </div>
  );
};
