import React from 'react';
import { Save, PenTool, Eraser, MousePointer2, Undo, Redo } from 'lucide-react';

const WhiteboardApp = ({ theme }) => {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <div className={`w-full h-full bg-[#1a1a1a] relative flex shadow-2xl`}>
         <div className="flex-1 relative cursor-crosshair">
             <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
             <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0px 0px 8px rgba(255,255,255,0.1))' }}>
                <path d="M 100 200 Q 250 100 400 250 T 700 200" stroke="#60a5fa" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M 150 400 L 350 400 L 250 250 Z" stroke="#f87171" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8" />
                <text x="500" y="400" fontFamily="sans-serif" fontSize="24" fill="#e5e7eb" className="font-handwriting tracking-wide">Q3 增长策略 (Dark Mode)</text>
             </svg>
         </div>
         <div className="absolute top-0 left-0 right-0 h-24 flex items-center justify-end px-8 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10">
            <button className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white/90 hover:bg-white/20 font-medium text-sm transition-colors border border-white/10 backdrop-blur-md mt-4">
               <Save size={16} />
               保存
            </button>
         </div>
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 h-20 px-8 rounded-full bg-[#2a2a2a]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-8 z-20 pointer-events-auto">
            <div className="flex gap-4">
                <button className="p-3 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/40 hover:scale-110 transition-transform"><PenTool size={24} /></button>
                <button className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><Eraser size={24} /></button>
                <button className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><MousePointer2 size={24} /></button>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="flex gap-4 items-center">
               <div className="w-6 h-6 rounded-full bg-white border-2 border-white/50 shadow-sm cursor-pointer hover:scale-125 transition-transform ring-2 ring-white/20 ring-offset-2 ring-offset-[#2a2a2a]"></div>
               <div className="w-6 h-6 rounded-full bg-red-500 cursor-pointer opacity-80 hover:opacity-100 hover:scale-125 transition-transform"></div>
               <div className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer opacity-80 hover:opacity-100 hover:scale-125 transition-transform"></div>
               <div className="w-6 h-6 rounded-full bg-yellow-400 cursor-pointer opacity-80 hover:opacity-100 hover:scale-125 transition-transform"></div>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="flex gap-2">
               <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><Undo size={20} /></button>
               <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><Redo size={20} /></button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default WhiteboardApp;
