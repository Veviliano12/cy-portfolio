import React from 'react';
import { LifeBuoy, MessageSquare, ShieldCheck, QrCode, Video, Compass, Languages, Info } from 'lucide-react';
import { APPS } from '../constants';

const HomeFooter = ({ theme, type, onNavigate, isDualMode }) => {
  const iconStyle = "group-hover:scale-110 transition-transform opacity-90";
  const iconProps = { strokeWidth: 2, fill: "currentColor", fillOpacity: 0.2 };

  const handleAppClick = (targetApp) => {
    if (type === 'touch') {
      onNavigate(targetApp);
    }
  };

  return (
    <div className="absolute bottom-[24px] w-full px-[24px] flex items-end justify-between z-20">
      <div className="flex gap-8 mb-4 items-end">
         {type === 'touch' ? (
           <>
             <button className={`flex items-center gap-3 ${theme.footerIcon} transition-colors group`}><LifeBuoy size={26} {...iconProps} className={iconStyle} /><span className="text-[24px] font-medium">求助</span></button>
             <button className={`flex items-center gap-3 ${theme.footerIcon} transition-colors group`}><MessageSquare size={26} {...iconProps} className={iconStyle} /><span className="text-[24px] font-medium">评价</span></button>
             <button className={`flex items-center gap-3 ${theme.footerIcon} transition-colors group`}><ShieldCheck size={26} {...iconProps} className={iconStyle} /><span className="text-[24px] font-medium">检测</span></button>
           </>
         ) : (
           // LCD Footer content
           !isDualMode && (
             <div className="flex items-center gap-6">
               <div className="w-[80px] h-[80px] bg-white p-1.5 rounded-lg shadow-lg flex items-center justify-center"><QrCode size={70} className="text-gray-900" /></div>
               <span className={`${theme.footerIcon} text-[24px] font-medium opacity-90`}>求助 | 评价</span>
             </div>
           )
         )}
      </div>
      <div className="flex flex-col items-center justify-end absolute left-1/2 -translate-x-1/2 bottom-0">
         {type === 'touch' ? (
           <div className="flex gap-6">
             {isDualMode ? (
                // Dual Mode: Only Browser
                <button onClick={() => handleAppClick(APPS.BROWSER)} className={`h-[72px] w-[200px] rounded-full backdrop-blur-2xl bg-white/20 shadow-lg border border-white/30 text-white flex items-center justify-center gap-4 hover:-translate-y-1 transition-all active:scale-95`}><Compass size={36} {...iconProps} className="opacity-95" /><span className="text-[28px] font-medium tracking-wide">浏览器</span></button>
             ) : (
                // Single Mode: Meeting + Browser
                <>
                   <button onClick={() => handleAppClick(APPS.MEETING)} className={`h-[72px] w-[200px] rounded-full backdrop-blur-2xl bg-white/20 shadow-lg border border-white/30 text-white flex items-center justify-center gap-4 hover:-translate-y-1 transition-all active:scale-95`}><Video size={40} {...iconProps} className="opacity-95" /><span className="text-[28px] font-medium tracking-wide">会议</span></button>
                   <button onClick={() => handleAppClick(APPS.BROWSER)} className={`h-[72px] w-[200px] rounded-full backdrop-blur-2xl bg-white/20 shadow-lg border border-white/30 text-white flex items-center justify-center gap-4 hover:-translate-y-1 transition-all active:scale-95`}><Compass size={36} {...iconProps} className="opacity-95" /><span className="text-[28px] font-medium tracking-wide">浏览器</span></button>
                </>
             )}
           </div>
         ) : (
            // LCD Center Footer (Tips)
            !isDualMode && (
               <div className="flex flex-col items-center justify-center h-[72px] mb-2 text-center">
                 <div className="text-blue-100/90 text-[20px] font-medium mb-1">提示：访客请试用有限投影</div>
                 <div className="text-blue-200/60 text-[16px] font-light">Tips: For visitors, please use wired projection</div>
               </div>
            )
         )}
      </div>
      <div className="flex gap-8 mb-4">
         {type === 'touch' && (
           <button className={`flex items-center gap-3 ${theme.footerIcon} transition-colors group`}><Languages size={26} {...iconProps} className={iconStyle} /><span className="text-[24px] font-medium">English</span></button>
         )}
         {(!isDualMode || type === 'touch') && (
           <button className={`flex items-center gap-3 ${theme.footerIcon} transition-colors group`}><Info size={26} {...iconProps} className={iconStyle} /><span className="text-[24px] font-medium">关于</span></button>
         )}
      </div>
    </div>
  );
};

export default HomeFooter;
