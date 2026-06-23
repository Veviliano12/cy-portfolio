import React, { useEffect } from 'react';
import { Info } from 'lucide-react';

const Toast = ({ message, onClose, duration = 2000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="absolute top-1// 修改前
<div className={`... gap-32 ...`}>

// 修改后
<div className={`... gap-36 ...`}>0 left-1/2 -translate-x-1/2 z-[300] bg-[#1e293b]/90 backdrop-blur-md text-white px-8 py-4 rounded-full shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 flex items-center gap-3 border border-white/10">
      <Info size={24} className="text-blue-400" />
      <span className="text-xl font-medium tracking-wide">{message}</span>
    </div>
  );
};

export default Toast;
