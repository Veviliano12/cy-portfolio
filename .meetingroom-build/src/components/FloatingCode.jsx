import React from 'react';

const FloatingCode = ({ theme, onSimulateProjection }) => {
  return (
    <div className={`absolute top-6 right-6 h-12 px-4 rounded-full backdrop-blur-xl bg-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/20 flex items-center justify-center z-[300] animate-in fade-in slide-in-from-top-4 duration-500`}>
       <span 
         onClick={onSimulateProjection}
         className="font-mono font-bold text-[28px] tracking-widest text-white drop-shadow-sm cursor-pointer hover:text-blue-200 transition-colors"
       >
         856-790
       </span>
    </div>
  );
};

export default FloatingCode;
