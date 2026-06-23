import React from 'react';
import { QrCode } from 'lucide-react';

const TranslationSavePage = ({ onClearAndExit, onReturnToTranslation }) => {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center animate-in fade-in duration-300">
      {/* Back button (optional, but user asked for "Return to Translation" button below, so maybe not needed here, keeping clean) */}
      
      <div className="flex flex-col items-center gap-12 -mt-20">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-light text-white tracking-tight">发送翻译字幕到您的应用号</h1>
          <p className="text-2xl text-blue-200/80 font-light">主题：亚太地区研讨会</p>
        </div>

        <div className="flex flex-col items-center gap-6 p-8 bg-white/5 rounded-[32px] border border-white/10 backdrop-blur-sm">
          <div className="bg-white p-4 rounded-2xl">
            <QrCode size={200} className="text-gray-900" />
          </div>
          <span className="text-xl text-white/60 font-light tracking-widest">手机扫一扫</span>
        </div>

        <div className="flex gap-8 mt-4">
          <button 
            onClick={onClearAndExit}
            className="w-64 py-5 rounded-full border border-white/20 text-red-300 text-2xl font-medium hover:bg-white/5 hover:text-red-200 transition-all flex items-center justify-center"
          >
            清除并退出
          </button>
          <button 
            onClick={onReturnToTranslation}
            className="w-64 py-5 rounded-full bg-blue-600 text-white text-2xl font-medium hover:bg-blue-500 shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center"
          >
            回到翻译
          </button>
        </div>
      </div>

      <div className="absolute bottom-16 text-center">
        <button className="text-white/40 text-xl border-b border-white/20 pb-1 hover:text-white/60 hover:border-white/40 transition-colors">
          输入工号发送文本内容
        </button>
      </div>
    </div>
  );
};

export default TranslationSavePage;
