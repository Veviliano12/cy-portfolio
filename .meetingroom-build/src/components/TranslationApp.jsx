import React, { useState, useEffect } from 'react';
import { Languages, Pause, Play, Minimize2, X, Mic } from 'lucide-react';

const TranslationApp = ({ theme, onMinimize, onEnd, subtitleSettings, isStarted }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [waveform, setWaveform] = useState(Array(20).fill(10));
  
  const { sourceLang, setSourceLang } = subtitleSettings || { sourceLang: 'en', setSourceLang: () => {} };

  // 模拟动态声纹
  useEffect(() => {
    if (isPaused || !isStarted) return;
    const interval = setInterval(() => {
      setWaveform(prev => prev.map(() => Math.floor(Math.random() * 40) + 10));
    }, 100);
    return () => clearInterval(interval);
  }, [isPaused, isStarted]);

  // 模拟对话内容
  const conversations = [
    { en: "Good morning, everyone. Welcome to the quarterly review meeting.", zh: "大家早上好，欢迎参加季度回顾会议。" },
    { en: "Today we will be discussing the performance metrics of Q3.", zh: "今天我们将讨论第三季度的绩效指标。" },
    { en: "Overall, the revenue has increased by 15% compared to last year.", zh: "总体而言，营收较去年同期增长了15%。" },
    { en: "However, we noticed some challenges in the supply chain.", zh: "不过，我们也注意到供应链方面存在一些挑战。" },
    { en: "Okay Mr.Feng, we will focus on growth strategies for the Asia-Pacific market next quarter.", zh: "峰总，我们在下个季度重点关注亚太市场增长策略。" },
    { en: "Especially in channel expansion in emerging Southeast Asian markets.", zh: "尤其是在东南亚新兴市场的渠道扩展方面。" },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-black/70 backdrop-blur-md relative overflow-hidden">
      {/* 主体内容区 - 左右分屏 */}
      <div className="flex-1 flex w-full relative min-h-0">
        {/* 左侧 - 译文 (Target) */}
        <div className="w-1/2 h-full px-16 pb-40 pt-12 flex flex-col justify-start items-start gap-8">
          {conversations.map((item, index) => (
            <p key={index} className={`text-4xl font-light text-white leading-relaxed transition-opacity duration-500 ${index === conversations.length - 1 ? 'opacity-100' : 'opacity-40'}`}>
              {/* 如果源是英文，译文是中文；如果源是中文，译文是英文 */}
              {sourceLang === 'en' ? item.zh : item.en}
            </p>
          ))}
        </div>

        {/* 中间分割线 */}
        <div className="w-px h-[80%] bg-white/10 self-center"></div>

        {/* 右侧 - 原文 (Source) */}
        <div className="w-1/2 h-full px-16 pb-40 pt-12 flex flex-col justify-start items-start gap-8">
          {conversations.map((item, index) => (
            <p key={index} className={`text-4xl font-light text-white leading-relaxed transition-opacity duration-500 ${index === conversations.length - 1 ? 'opacity-100' : 'opacity-40'}`}>
              {/* 如果源是英文，原文是英文；如果源是中文，原文是中文 */}
              {sourceLang === 'en' ? item.en : item.zh}
            </p>
          ))}
        </div>
      </div>

      {/* 底部控制栏 */}
      <div className="h-32 flex items-center justify-between px-12 shrink-0 relative z-50">
         {/* 左侧控制按钮 */}
         <div className="flex items-center gap-6">
            <button 
              onClick={() => setSourceLang(sourceLang === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
               <Languages size={24} />
               <span className="text-xl">{sourceLang === 'en' ? '英 / 中' : '中 / 英'}</span>
            </button>
            <div className="w-px h-8 bg-white/20 mx-2"></div>
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
               {isPaused ? <Play size={24} /> : <Pause size={24} />}
               <span className="text-xl">{isPaused ? "继续" : "暂停"}</span>
            </button>
            <button 
               onClick={onEnd}
               className="flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors border border-red-500/30"
            >
               <X size={24} />
               <span className="text-xl">结束</span>
            </button>
            <button 
               onClick={onMinimize}
               className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
               <Minimize2 size={24} />
               <span className="text-xl">最小化</span>
            </button>
         </div>

         {/* 中间动态声纹 */}
         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
             {waveform.map((height, i) => (
                <div 
                  key={i} 
                  className="w-2 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full transition-all duration-100"
                  style={{ height: `${height}px` }}
                ></div>
             ))}
         </div>

         {/* 右侧占位 (保持平衡) */}
         <div className="w-[400px]"></div>
      </div>
    </div>
  );
};

export default TranslationApp;
