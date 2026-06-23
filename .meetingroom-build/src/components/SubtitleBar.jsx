import React, { useState, useEffect, useRef } from 'react';
import { Settings, X, Type, ArrowRightLeft } from 'lucide-react';

const SubtitleBar = ({ theme, isHome, onClose, fontSize = 2, subtitleSettings }) => {
  const [showControls, setShowControls] = useState(false);
  const [showLocalSettings, setShowLocalSettings] = useState(false);
  const timerRef = useRef(null);
  const settingsPanelRef = useRef(null);
  
  const { setFontSize, sourceLang, setSourceLang, targetLang, setTargetLang } = subtitleSettings || {};

  const getFontSizes = () => {
    switch(fontSize) {
      case 1: return { cn: 'text-2xl', en: 'text-xl' };
      case 3: return { cn: 'text-5xl', en: 'text-4xl' };
      default: return { cn: 'text-4xl', en: 'text-3xl' };
    }
  };

  const { cn: cnSize, en: enSize } = getFontSizes();

  // 演示用的长文本
  const longTextCN = "好的峰总，我们在下个季度将重点关注亚太市场的增长策略，尤其是在东南亚新兴市场的渠道拓展方面，我们会加大投入力度，同时优化供应链效率，确保产品能够更快速地触达终端消费者，预计在年底前实现市场份额的显著提升，下周五给您单独汇报详细方案。";
  const longTextEN = "Okay Mr. Feng, we will focus on growth strategies for the Asia-Pacific market next quarter, especially in channel expansion in emerging Southeast Asian markets. We will increase investment while optimizing supply chain efficiency to ensure products reach end consumers faster. We expect a significant increase in market share by the end of the year and will report the detailed plan to you separately next Friday.";

  const activateControls = () => {
    setShowControls(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };


  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // 点击空白处关闭设置面板
  useEffect(() => {
    const handleClickOutside = (event) => {
      // 如果设置面板显示中，且点击目标不在设置面板内
      if (showLocalSettings && settingsPanelRef.current && !settingsPanelRef.current.contains(event.target)) {
        // 这里的逻辑是：如果点击了设置按钮，由于设置按钮有 e.stopPropagation()，
        // 事件不会冒泡到 document，所以这里的 listener 不会被触发 (对于 React 合成事件是这样，但原生 listener 呢？)
        // React 17+ event delegation changes might affect this. 
        // 但通常 document listener 会捕获到所有 click。
        // 如果按钮阻止了冒泡，React 的 onClick e.stopPropagation() 是阻止 React 事件冒泡。
        // 原生 document listener 仍然会收到事件，除非在原生层级阻止了。
        // 为避免冲突，我们在设置按钮上也加上 ref 排除，或者简单地依靠逻辑。
        // 这里简单处理：只要点击的不是 panel 内部，就关闭。
        // 注意：如果点击的是打开按钮，打开按钮的 onClick 会 toggle。如果 document listener 先执行并关闭，然后 toggle 又打开...
        // 实际上 mousedown 先于 click。
        // 我们可以只检查是否在 panel 内。
        setShowLocalSettings(false);
      }
    };

    if (showLocalSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLocalSettings]);


  return (
    <div 
      onClick={activateControls}
      className={`
      absolute z-40
      bg-black/90 backdrop-blur-2xl
      flex flex-col items-center justify-center px-20 text-center
      transition-all duration-500 ease-in-out cursor-pointer
      ${isHome 
        ? 'w-[98%] left-[1%] bottom-[60px] rounded-[24px] h-[150px] shadow-2xl border border-white/10'
        : 'w-full left-0 bottom-[60px] rounded-none h-[150px] border-t border-white/10'
      }
    `}>
       <div className={`absolute top-4 right-5 flex items-center gap-2 z-50 transition-opacity duration-300 ${showControls || showLocalSettings ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button 
             onClick={(e) => { 
               e.stopPropagation(); 
               // 阻止原生冒泡以防止 document listener 立即关闭
               // 但我们在 document listener 里用的是 mousedown。
               // 如果 mousedown 触发关闭，然后 click 触发 toggle...
               // 让我们简单点：按钮点击时 toggle。
               // 如果点击的是按钮，document listener (mousedown) 会先触发。
               // 如果 document listener 检测到点击的是按钮区域（排除法），就不关闭。
               // 或者更简单：按钮点击只负责打开？不，它负责 toggle。
               // 如果我们在这里 stopPropagation (native)，document listener 就收不到了吗？
               // React e.stopPropagation() 阻止 React 冒泡。
               setShowLocalSettings(!showLocalSettings); 
             }}
             onMouseDown={(e) => e.stopPropagation()} // 阻止 mousedown 冒泡到 document，防止立即关闭
             className={`text-white/40 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full group ${showLocalSettings ? 'bg-white/20 text-white' : ''}`}
          >
             <Settings size={24} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
          <button 
             onClick={(e) => { e.stopPropagation(); onClose(); }}
             onMouseDown={(e) => e.stopPropagation()}
             className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
             <X size={24} />
          </button>
       </div>

       {/* 本地设置面板 */}
       {showLocalSettings && (
         <div 
           ref={settingsPanelRef}
           onClick={(e) => e.stopPropagation()}
           onMouseDown={(e) => e.stopPropagation()} // 防止点击面板内部触发 document close
           className="absolute bottom-full mb-2 right-0 bg-[#010101] border border-white/10 rounded-[24px] p-6 shadow-2xl z-[60] w-[480px] animate-in fade-in zoom-in-95 duration-200"
         >
             {/* Languages */}
             <div className="flex flex-col gap-5 mb-8">
               <div className="flex items-center gap-3 text-white/60 text-2xl">
                 <ArrowRightLeft size={28} />
                 <span>翻译语言</span>
               </div>
               <div className="flex items-center justify-between gap-3">
                 <button 
                    onClick={() => setSourceLang(sourceLang === 'zh' ? 'en' : 'zh')}
                    className="flex-1 py-4 bg-white/10 rounded-xl text-white text-xl font-medium hover:bg-white/20 transition-colors"
                 >
                   {sourceLang === 'zh' ? '中文' : 'English'}
                 </button>
                 <span className="text-white/40 text-2xl">→</span>
                 <button 
                    onClick={() => setTargetLang(targetLang === 'en' ? 'zh' : 'en')}
                    className="flex-1 py-4 bg-white/10 rounded-xl text-white text-xl font-medium hover:bg-white/20 transition-colors"
                 >
                   {targetLang === 'en' ? 'English' : '中文'}
                 </button>
               </div>
             </div>

             {/* Font Size */}
             <div className="flex flex-col gap-5">
               <div className="flex items-center gap-3 text-white/60 text-2xl">
                 <Type size={28} />
                 <span>字体大小</span>
               </div>
               <div className="grid grid-cols-3 gap-3 bg-white/5 p-2 rounded-xl">
                 {[1, 2, 3].map((size) => (
                   <button
                     key={size}
                     onClick={() => setFontSize(size)}
                     className={`py-4 rounded-lg text-xl font-medium transition-all ${
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
         </div>
       )}


       <div className="flex flex-col gap-2 opacity-90 w-full overflow-hidden pl-10 pr-10">
          <div className="w-full overflow-hidden whitespace-nowrap text-left">
            <p className={`text-white font-medium tracking-wide transition-all duration-500 inline-block ${cnSize}`}>
              {longTextCN}
            </p>
          </div>
          
          <div className="w-full overflow-hidden whitespace-nowrap text-left">
            <p className={`text-blue-200 font-light transition-all duration-500 inline-block ${enSize}`}>
              {longTextEN}
            </p>
          </div>
       </div>
    </div>
  );
};

export default SubtitleBar;