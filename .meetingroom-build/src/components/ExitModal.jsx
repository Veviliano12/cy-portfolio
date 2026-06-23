import React from 'react';
import { AlertCircle } from 'lucide-react';

const ExitModal = ({ onConfirm, onCancel, title = "是否退出会议？", confirmText = "退出" }) => {
  return (
    <div className="absolute inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
      <div className="bg-[#2a2a2a] border border-white/10 p-10 rounded-[32px] shadow-2xl flex flex-col items-center gap-10 w-[500px]">
         <span className="text-white text-[32px] font-bold tracking-wide">{title}</span>
         
         <div className="flex gap-6 w-full">
            <button 
              onClick={onCancel}
              className="flex-1 py-4 rounded-full border border-white/20 text-white text-2xl font-medium hover:bg-white/10 transition-colors"
            >
              返回
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-4 rounded-full bg-red-600 text-white text-2xl font-medium hover:bg-red-500 shadow-lg shadow-red-900/30 transition-colors"
            >
              {confirmText}
            </button>
         </div>
      </div>
    </div>
  );
};

export default ExitModal;
