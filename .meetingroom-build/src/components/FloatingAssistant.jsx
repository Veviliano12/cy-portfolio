import React, { useEffect, useRef } from 'react';
import { Mic, Languages, Settings, Sparkles, ChevronLeft, Type, ArrowRightLeft } from 'lucide-react';

const FloatingAssistant = ({ theme, onToggleSubtitle, isSubtitleOn, subtitleSettings, isOpen, setIsOpen, view, setView }) => {
  const containerRef = useRef(null);

  const { fontSize, setFontSize, sourceLang, setSourceLang, targetLang, setTargetLang } = subtitleSettings || {};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setView('menu'); // Reset view on close
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleTranslateClick = () => {
    onToggleSubtitle();
    setIsOpen(false); 
  };

  return (
    <div ref={containerRef} className="z-[300]">
      <div className={`
        absolute bottom-[194px] left-4 z-[300]
        w-80 py-2 rounded-[24px]
        backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]
        flex flex-col gap-1
        transition-all duration-300 ease-out origin-bottom-left
        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-10 pointer-events-none'}
      `}
      style={{ background: 'linear-gradient(to bottom right, #0f172a, #312e81)' }}
      >
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
         
         {view === 'menu' ? (
           <>
             <button className="flex items-center gap-4 px-6 py-4 hover:bg-white/10 transition-colors group mx-2 rounded-2xl">
                <Mic size={32} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-white/90 text-[28px] font-medium">AI听</span>
             </button>
             
             <button 
                onClick={handleTranslateClick}
                className="flex items-center gap-4 px-6 py-4 transition-colors group mx-2 rounded-2xl hover:bg-white/10"
             >
                <Languages size={32} className={`${isSubtitleOn ? 'text-green-400' : 'text-purple-400'} group-hover:scale-110 transition-transform`} />
                <div className="flex flex-col items-start">
                   <span className="text-white/90 text-[28px] font-medium">翻译</span>
                </div>
             </button>
             
             <div className="h-px bg-white/10 mx-6 my-1"></div>
             
             <button 
               className="flex items-center gap-4 px-6 py-4 transition-colors group mx-2 rounded-2xl opacity-50 cursor-not-allowed"
             >
                <Settings size={32} className="text-gray-400 transition-transform" />
                <span className="text-white/90 text-[28px] font-medium">设置</span>
             </button>
           </>
         ) : (
           <div className="px-6 py-4 flex flex-col gap-6">
             {/* Header */}
             <div className="flex items-center gap-4 pb-2 border-b border-white/10">
               <button 
                 onClick={() => setView('menu')}
                 className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
               >
                 <ChevronLeft size={28} />
               </button>
               <span className="text-white/90 text-[24px] font-medium">字幕设置</span>
             </div>

             {/* Font Size */}
             <div className="flex flex-col gap-3">
               <div className="flex items-center gap-2 text-white/60 text-lg">
                 <Type size={20} />
                 <span>字体大小</span>
               </div>
               <div className="grid grid-cols-3 gap-2 bg-white/5 p-1 rounded-xl">
                 {[1, 2, 3].map((size) => (
                   <button
                     key={size}
                     onClick={() => setFontSize(size)}
                     className={`py-2 rounded-lg text-lg font-medium transition-all ${
                       fontSize === size 
                         ? 'bg-blue-600 text-white shadow-lg' 
                         : 'text-white/50 hover:bg-white/10 hover:text-white/80'
                     }`}
                   >
                     {size === 1 ? '小' : size === 2 ? '中' : '大'}
                   </button>
                 ))}
               </div>
             </div>

             {/* Animation Mode (Demo) - Removed */}

             {/* Languages */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-white/60 text-lg">
                  <ArrowRightLeft size={20} />
                  <span>互译语言</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <button 
                    onClick={() => setSourceLang(sourceLang === 'zh' ? 'en' : 'zh')}
                    className="flex-1 py-2 px-3 bg-white/10 rounded-xl text-white text-lg font-medium flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                  >
                    {sourceLang === 'zh' ? '中文' : 'English'}
                  </button>
                  <span className="text-white/40">→</span>
                  <button 
                    onClick={() => setTargetLang(targetLang === 'en' ? 'zh' : 'en')}
                    className="flex-1 py-2 px-3 bg-white/10 rounded-xl text-white text-lg font-medium flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                  >
                    {targetLang === 'en' ? 'English' : '中文'}
                  </button>
                </div>
              </div>
           </div>
         )}
      </div>


      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          absolute bottom-[100px] left-4 z-[300]
          w-20 h-20 rounded-full
          flex items-center justify-center
          cursor-pointer transition-all duration-300 ease-out
          border border-white/20
          shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
          overflow-hidden group
          ${isOpen ? 'opacity-100 scale-110 brightness-125' : 'opacity-80 hover:opacity-100 hover:scale-105'}
        `}
        style={{ background: 'linear-gradient(to bottom right, #0f172a, #312e81)' }}
      >
         <div className={`absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-purple-500/30 to-pink-500/20 blur-xl mix-blend-screen pointer-events-none ${isOpen ? 'animate-pulse opacity-100' : 'opacity-60'}`}></div>
         <div className="absolute top-3 right-4 w-2 h-6 bg-white/20 rounded-full blur-[2px] pointer-events-none transform rotate-12"></div>
         <div className={`relative z-10 transform transition-transform duration-500 ${isOpen ? 'rotate-180 scale-110' : 'group-hover:rotate-12 group-hover:scale-110'}`}>
            <Sparkles size={32} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" strokeWidth={1.5} fill="currentColor" fillOpacity={0.1} />
         </div>
      </div>
    </div>
  );
};

export default FloatingAssistant;
