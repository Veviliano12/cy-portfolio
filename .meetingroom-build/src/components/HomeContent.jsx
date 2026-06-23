import React from 'react';
import { PenTool, QrCode, Video } from 'lucide-react';
import { APPS, VIEW_MODES } from '../constants';

const HomeContent = ({ theme, type, onNavigate, onSimulateProjection, isDualMode }) => {
    const handleCardClick = (targetApp) => { if (type === 'touch') { onNavigate(targetApp); } };

    // Dual Mode Layouts
    if (isDualMode) {
        if (type === VIEW_MODES.TOUCH) {
            // Main Screen (Electronic) - Dual Mode
            return (
                <div className="relative z-10 flex gap-[24px] justify-center items-center h-full w-full px-[86px]">
                    {/* Whiteboard Card */}
                    <div onClick={() => handleCardClick(APPS.WHITEBOARD)} className={`h-[365px] w-[384px] rounded-[32px] px-6 flex flex-col items-center justify-center gap-14 text-center ${theme.glassEffect} ${theme.cardBorder} hover:scale-[1.02] transition-all cursor-pointer group active:scale-95`}>
                         <span className={`${theme.textPrimary} text-[40px] font-medium leading-none`}>白板</span>
                         <div className="relative w-28 h-24 flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl shadow-[0_10px_20px_rgba(59,130,246,0.25),inset_0_1px_2px_rgba(255,255,255,0.6)] border border-blue-200 transform rotate-[-2deg] group-hover:rotate-0 transition-transform duration-300">
                              <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-400/40 rounded-b-xl"></div>
                              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-xl"></div>
                            </div>
                            <div className="absolute -right-4 -bottom-2 drop-shadow-xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                               <div className="relative"><PenTool size={52} className="text-white fill-blue-50 drop-shadow-md" strokeWidth={1.5} /></div>
                            </div>
                         </div>
                    </div>
                    
                    {/* Meeting Card - Updated Icon */}
                    <div onClick={() => handleCardClick(APPS.MEETING)} className={`h-[365px] w-[384px] rounded-[32px] px-6 flex flex-col items-center justify-center gap-14 text-center ${theme.glassEffect} ${theme.cardBorder} hover:scale-[1.02] transition-all cursor-pointer group active:scale-95`}>
                        <span className={`${theme.textPrimary} text-[40px] font-medium leading-none`}>视频会议</span>
                        <div className="relative w-28 h-24 flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl shadow-[0_10px_20px_rgba(59,130,246,0.25),inset_0_1px_2px_rgba(255,255,255,0.6)] border border-blue-200 transform rotate-[-2deg] group-hover:rotate-0 transition-transform duration-300">
                              <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-400/40 rounded-b-xl"></div>
                              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-xl"></div>
                            </div>
                            <div className="absolute -right-4 -bottom-2 drop-shadow-xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                               <div className="relative"><Video size={52} className="text-white fill-blue-50 drop-shadow-md" strokeWidth={1.5} /></div>
                            </div>
                         </div>
                    </div>
                </div>
            );
        } else {
            // Sub Screen (LCD) - Dual Mode - Updated Layout
            return (
                <div className="relative z-10 flex gap-[24px] justify-center items-center h-full w-full px-[86px]">
                  <div className={`flex flex-col justify-center gap-[24px] w-[384px] h-[754px]`}>
                    <div className={`h-[754px] rounded-[32px] px-6 flex flex-col items-center justify-center gap-24 text-center ${theme.glassEffect} ${theme.cardBorder}`}>
                        <span className={`${theme.textPrimary} text-[40px] font-medium leading-none`}>投影</span>
                        <span className={`${theme.textAccent} font-mono font-semibold text-[72px] tracking-tighter leading-none`}>856-790</span>
                        <div className={`${theme.textSecondary} text-[16px] whitespace-nowrap`}>在 <span className="font-mono font-medium text-black">eShare</span> 或 <span className="font-mono font-medium text-black">s.huavvei.com</span> 输入上方投屏码</div>
                    </div>
                  </div>
                  <div className={`w-[1340px] h-[754px] rounded-[32px] overflow-hidden relative border border-white/20 shadow-2xl group`}>
                     <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2600" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Global Window" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                     <div className="absolute bottom-12 left-12 max-w-2xl text-left">
                        <h2 className="text-5xl font-bold text-white mb-4 leading-tight">Connecting the World</h2>
                        <p className="text-xl text-white/70">让沟通无处不在，随时随地开启高效会议体验。</p>
                     </div>
                     <div className="absolute top-8 right-8 bg-black/40 backdrop-blur px-4 py-2 rounded-full text-white/80 text-sm border border-white/10">每日全球窗</div>
                  </div>
                </div>
            );
        }
    }

    // Single Mode Layouts (Existing)
    return (
    <div className="relative z-10 flex gap-[24px] justify-center items-center h-full w-full px-[86px]">
      <div className={`flex flex-col gap-[24px] w-[384px]`}>
        {type === VIEW_MODES.TOUCH ? (
          <>
            <div onClick={() => handleCardClick(APPS.PROJECTION)} className={`h-[365px] rounded-[32px] px-6 flex flex-col items-center justify-center gap-10 text-center ${theme.glassEffect} ${theme.cardBorder} transition-all duration-300 cursor-pointer active:scale-95 hover:bg-white/30`}>
                <span className={`${theme.textPrimary} text-[40px] font-medium leading-none`}>投影</span>
                <span 
                   onClick={(e) => {
                      e.stopPropagation();
                      onSimulateProjection();
                   }}
                   className={`${theme.textAccent} font-mono font-semibold text-[72px] tracking-tighter leading-none hover:text-blue-600 transition-colors`}
                >
                  856-790
                </span>
                <div className={`${theme.textSecondary} text-[16px] whitespace-nowrap`}>在 <span className="font-mono font-medium text-black">eShare</span> 或 <span className="font-mono font-medium text-black">s.huavvei.com</span> 输入上方投屏码</div>
            </div>
            <div onClick={() => handleCardClick(APPS.WHITEBOARD)} className={`h-[365px] rounded-[32px] px-6 flex flex-col items-center justify-center gap-14 text-center ${theme.glassEffect} ${theme.cardBorder} hover:scale-[1.02] transition-all cursor-pointer group active:scale-95`}>
                 <span className={`${theme.textPrimary} text-[40px] font-medium leading-none`}>白板</span>
                 <div className="relative w-28 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl shadow-[0_10px_20px_rgba(59,130,246,0.25),inset_0_1px_2px_rgba(255,255,255,0.6)] border border-blue-200 transform rotate-[-2deg] group-hover:rotate-0 transition-transform duration-300">
                      <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-400/40 rounded-b-xl"></div>
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-xl"></div>
                    </div>
                    <div className="absolute -right-4 -bottom-2 drop-shadow-xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                       <div className="relative"><PenTool size={52} className="text-white fill-blue-50 drop-shadow-md" strokeWidth={1.5} /></div>
                    </div>
                 </div>
            </div>
          </>
        ) : (
          <div className={`h-[754px] rounded-[32px] px-6 py-12 flex flex-col items-center text-center ${theme.glassEffect} ${theme.cardBorder}`}>
              <div className="flex-1 flex flex-col justify-center items-center gap-8 w-full border-b border-gray-300/30 pb-8">
                <span className={`${theme.textPrimary} text-[40px] font-medium leading-none`}>投影</span>
                <span className={`${theme.textAccent} font-mono font-semibold text-[72px] tracking-tighter leading-none`}>856-790</span>
                <div className={`${theme.textSecondary} text-[16px] whitespace-nowrap`}>在 <span className="font-mono font-medium text-black">eShare</span> 或 <span className="font-mono font-medium text-black">s.huavvei.com</span> 输入上方投屏码</div>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center gap-12 w-full pt-8">
                <span className={`${theme.textPrimary} text-[40px] font-medium leading-none`}>视频会议</span>
                <div className="w-[160px] h-[160px] bg-white p-2 rounded-xl shadow-lg flex items-center justify-center"><QrCode size={140} className="text-gray-900" /></div>
                <span className={`${theme.textSecondary} text-[20px] font-medium`}>手机扫一扫</span>
              </div>
          </div>
        )}
      </div>
      <div className={`w-[1340px] h-[754px] rounded-[32px] overflow-hidden relative border border-white/20 shadow-2xl group`}>
         <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2600" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Global Window" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
         <div className="absolute bottom-12 left-12 max-w-2xl text-left">
            <h2 className="text-5xl font-bold text-white mb-4 leading-tight">Connecting the World</h2>
            <p className="text-xl text-white/70">让沟通无处不在，随时随地开启高效会议体验。</p>
         </div>
         <div className="absolute top-8 right-8 bg-black/40 backdrop-blur px-4 py-2 rounded-full text-white/80 text-sm border border-white/10">每日全球窗</div>
      </div>
    </div>
  );
};

export default HomeContent;
