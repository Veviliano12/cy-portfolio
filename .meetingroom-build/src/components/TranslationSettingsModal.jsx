import React from 'react';
import { Type, ArrowRightLeft, Languages } from 'lucide-react';

const TranslationSettingsModal = ({ onStart, subtitleSettings }) => {
  const { fontSize, setFontSize, sourceLang, setSourceLang, targetLang, setTargetLang } = subtitleSettings || {};

  return (
    <div className="absolute inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
      <div className="bg-[#1e293b] border border-white/10 p-10 rounded-[32px] shadow-2xl flex flex-col items-center gap-8 w-[600px]">
        <div className="w-full flex flex-col gap-12">
          {/* Languages */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-white/60 text-2xl">
              <Languages size={28} />
              <span>翻译语言</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <button 
                 onClick={() => setSourceLang(sourceLang === 'zh' ? 'en' : 'zh')}
                 className="flex-1 py-4 bg-white/10 rounded-2xl text-white text-2xl font-medium hover:bg-white/20 transition-colors"
              >
                {sourceLang === 'zh' ? '中文' : 'English'}
              </button>
              <span className="text-white/40 text-2xl">→</span>
              <button 
                 onClick={() => setTargetLang(targetLang === 'en' ? 'zh' : 'en')}
                 className="flex-1 py-4 bg-white/10 rounded-2xl text-white text-2xl font-medium hover:bg-white/20 transition-colors"
              >
                {targetLang === 'en' ? 'English' : '中文'}
              </button>
            </div>
          </div>

          {/* Font Size */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-white/60 text-2xl">
              <Type size={28} />
              <span>默认字体大小</span>
            </div>
            <div className="grid grid-cols-3 gap-4 bg-white/5 p-2 rounded-2xl">
              {[1, 2, 3].map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`py-4 rounded-xl text-2xl font-medium transition-all ${
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

        <button 
          onClick={onStart}
          className="w-full py-5 rounded-full bg-blue-600 text-white text-2xl font-bold hover:bg-blue-500 shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center mt-4"
        >
          开始翻译
        </button>
      </div>
    </div>
  );
};

export default TranslationSettingsModal;
