import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div 
      className="fixed bottom-16 left-4 right-4 max-w-sm mx-auto z-50 flex items-center justify-center gap-2 rounded-2xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-xl animate-bounce"
      role="status"
      aria-live="polite"
    >
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>Offline Mode — Cached student data is active</span>
    </div>
  );
};
