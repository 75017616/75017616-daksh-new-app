import React, { useState } from 'react';
import { StudentProfile } from '../types';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: StudentProfile) => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Class 9');
  const [avatar, setAvatar] = useState('🧒');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name: name.trim(),
      role: role.trim(),
      avatar: avatar,
      gender: 'boy',
      grade: role.includes('Class') ? role : undefined
    });
    setName('');
    onClose();
  };

  const avatars = ['👦', '👧', '🧒', '👶', '🧑', '👨', '👩', '🧔'];

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="w-full max-w-[360px] bg-white rounded-3xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900">Add Family Member</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Select Avatar</label>
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-100">
              {avatars.map((av) => (
                <button
                  type="button"
                  key={av}
                  onClick={() => setAvatar(av)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition ${
                    avatar === av ? 'bg-indigo-600 text-white scale-110 shadow-xs' : 'hover:bg-slate-200'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Member Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rohan"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Role / Class</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Class 6">Class 6 (Middle School)</option>
              <option value="Class 7">Class 7 (Middle School)</option>
              <option value="Class 8">Class 8 (Middle School)</option>
              <option value="Class 9">Class 9 (High School)</option>
              <option value="Class 10">Class 10 (Board Exam)</option>
              <option value="Class 11">Class 11 (Senior Secondary)</option>
              <option value="Class 12">Class 12 (Career Prep)</option>
              <option value="College">College Student</option>
              <option value="Parent">Parent / Guardian</option>
            </select>
          </div>

          <div className="pt-2 flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
