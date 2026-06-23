import React, { useState } from 'react';
import { LifeBuoy, MessageSquare, ShieldCheck, LogOut, Share2, StopCircle, Projector, MousePointer2, Globe } from 'lucide-react';
import { APPS } from '../constants';

const Dock = ({ theme, activeApp, onNavigate, onExit, isInMeeting, sharingType, onShare, onStopShare }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  // 点击空白处关闭菜单的逻辑
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      // 如果菜单显示，且点击的目标不在菜单内部，也不在触发按钮上
      if (showShareMenu && !event.target.closest('.share-menu-container') && !event.target.closest('.share-trigger-btn')) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  const iconStyle = "group-hover:scale-110 transition-transform opacity-90";
  const iconProps = { strokeWidth: 2, fill: "currentColor", fillOpacity: 0.2 };
  
  const tabs = [
    { id: APPS.WHITEBOARD, label: '白板' },
    { id: APPS.PROJECTION, label: '投影' },
    { id: APPS.MEETING, label: '会议' },
    { id: APPS.BROWSER, label: '浏览器' },
    { id: APPS.TRANSLATION, label: '翻译' },
  ];

  const shareOptions = [
    { id: APPS.PROJECTION, label: '投影', icon: Projector },
    { id: APPS.WHITEBOARD, label: '白板', icon: MousePointer2 },
    { id: APPS.BROWSER, label: '浏览器', icon: Globe },
  ];

  const getShareLabel = () => {
    switch (sharingType) {
      case APPS.PROJECTION: return '投影共享中';
      case APPS.WHITEBOARD: return '白板共享中';
      case APPS.BROWSER: return '浏览器共享中';
      default: return '共享';
    }
  };

  return (
    <div className={`absolute bottom-0 w-full h-[60px] ${theme.dockEffect} flex items-center justify-between px-[24px] z-[50]`}>
       <div className="flex gap-8 items-center z-10">
          <button className={`flex items-center gap-3 ${theme.footerIcon} transition-colors group`}><LifeBuoy size={26} {...iconProps} className={iconStyle} /><span className="text-[24px] font-medium">求助</span></button>
          <button className={`flex items-center gap-3 ${theme.footerIcon} transition-colors group`}><MessageSquare size={26} {...iconProps} className={iconStyle} /><span className="text-[24px] font-medium">评价</span></button>
          <button className={`flex items-center gap-3 ${theme.footerIcon} transition-colors group`}><ShieldCheck size={26} {...iconProps} className={iconStyle} /><span className="text-[24px] font-medium">检测</span></button>
       </div>
       <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full flex items-center justify-center">
          {!isInMeeting ? (
             tabs.map(tab => {
                const isActive = activeApp === tab.id;
                return (
                  <div key={tab.id} onClick={() => onNavigate(tab.id)} className={`relative h-full w-[180px] flex items-center justify-center cursor-pointer transition-all duration-300 ${isActive ? 'bg-gradient-to-b from-transparent to-blue-500/20' : 'hover:bg-white/5'}`}>
                    <span className={`text-[28px] font-medium transition-colors duration-300 ${isActive ? 'text-cyan-50 font-bold' : 'text-white/50 hover:text-white'}`}>{tab.label}</span>
                    {isActive && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(34,211,238,0.8)]"></div>}
                  </div>
                );
             })
          ) : (
             <div className="flex gap-8 items-center h-full">
                {/* Share Button with Menu */}
                <div className="relative h-full flex items-center">
                   <button 
                     onClick={() => setShowShareMenu(!showShareMenu)}
                     className={`share-trigger-btn flex items-center justify-center gap-3 w-[260px] py-2 rounded-full transition-all duration-300 ${sharingType ? 'bg-blue-600/40 text-blue-100 ring-1 ring-blue-400/50' : 'bg-white/10 hover:bg-white/20 text-gray-200'}`}
                   >
                      <span className="text-[24px] font-medium truncate">{getShareLabel()}</span>
                   </button>

                   {/* Share Menu Popover */}
                   {showShareMenu && (
                     <div className="share-menu-container absolute bottom-[70px] left-1/2 -translate-x-1/2 w-[280px] bg-gray-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] p-2 flex flex-col gap-1 animate-in slide-in-from-bottom-5 fade-in duration-200 z-50">
                        {shareOptions.map(option => (
                          <button
                            key={option.id}
                            onClick={() => {
                              onShare(option.id);
                              setShowShareMenu(false);
                            }}
                            className="flex items-center justify-center w-full px-5 py-4 hover:bg-white/10 rounded-xl transition-colors group"
                          >
                            <span className={`text-[24px] font-medium transition-colors ${sharingType === option.id ? 'text-blue-300' : 'text-gray-200'}`}>{option.label}</span>
                          </button>
                        ))}
                     </div>
                   )}
                </div>

                {/* Stop Share Button */}
                <button 
                  onClick={onStopShare}
                  className={`flex items-center justify-center gap-3 w-[260px] py-2 rounded-full transition-all duration-300 ${!sharingType ? 'bg-white/10 text-gray-400 cursor-not-allowed' : 'bg-white/10 hover:bg-red-500/20 text-red-300 hover:text-red-200'}`}
                >
                   <span className="text-[24px] font-medium">停止共享</span>
                </button>
             </div>
          )}
       </div>
       <div className="flex gap-8 items-center z-10">
          <button onClick={onExit} className={`flex items-center gap-3 ${theme.footerIcon} transition-colors group`}><LogOut size={26} {...iconProps} className={iconStyle} /><span className="text-[24px] font-medium">退出</span></button>
       </div>
    </div>
  );
};

export default Dock;
