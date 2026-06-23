import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Wifi, LayoutGrid, Mic, MicOff, Volume2, Video, Users, Share, MessageSquare, PhoneOff } from 'lucide-react';
import ControlBtn from './ControlBtn';
import PPTView from './PPTView';

const MeetingActiveView = ({ onLeave, isSharing, setIsSharing }) => {
  const [showControls, setShowControls] = useState(false);
  const timerRef = useRef(null);


  const participants = [
    { name: '主会场 (Main)', img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800', isSpeaking: true, cameraOn: true },
    { name: '上海研发中心', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200', isSpeaking: false, cameraOn: false },
    { name: '深圳设计部', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200', isSpeaking: false, cameraOn: false },
    { name: '北京市场部', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200', isSpeaking: false, cameraOn: false },
  ];


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


  return (
    <div 
      className="w-full h-full bg-[#121212] relative flex flex-col items-center justify-center overflow-hidden group cursor-pointer p-1"
      onClick={activateControls} 
    >
      {/* 顶部共享提示栏 或 常规顶部栏 */}
      {isSharing ? (
         <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 flex rounded-b-[4px] shadow-lg overflow-hidden">
            <div className="bg-green-500 text-black px-6 py-2 flex items-center justify-center">
                <span className="text-[20px] font-medium tracking-wide">张三正在共享</span>
            </div>
            <button 
                onClick={(e) => { e.stopPropagation(); setIsSharing(false); }}
                className="bg-red-600 text-white px-6 py-2 flex items-center justify-center hover:bg-red-500 transition-colors"
            >
                <span className="text-[20px] font-medium tracking-wide">停止共享</span>
            </button>
         </div>
      ) : (
         <div className={`absolute top-0 left-0 w-full h-12 bg-[#1a1a1a]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 z-30 ${showControls ? '' : 'hidden'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-6">
                <div className="text-green-400" title="安全加密"><ShieldCheck size={18} strokeWidth={2.5} /></div>
                <div className="text-green-400" title="网络良好"><Wifi size={18} strokeWidth={2.5} /></div>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors">
                <LayoutGrid size={14} /><span className="text-[12px] font-medium">画廊视图</span>
            </button>
         </div>
      )}


      {/* 主内容区域 */}
      <div className="aspect-video h-full w-auto max-w-full relative">
        {isSharing ? (
             <PPTView />
        ) : (
             <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-4 p-4">
                {participants.map((p, i) => (
                  <div key={i} className={`relative rounded-2xl overflow-hidden bg-gray-800 w-full h-full ${p.isSpeaking ? 'ring-2 ring-blue-500' : ''}`}>
                    {p.cameraOn ? (
                      <>
                        <img src={p.img} className="w-full h-full object-cover object-center opacity-90" alt={p.name} />
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-2">
                          {p.isSpeaking ? <Mic size={14} className="text-green-400" /> : <MicOff size={14} className="text-red-400" />}
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[#252525]">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 mb-4 shadow-lg">
                            <img src={p.img} className="w-full h-full object-cover" alt="avatar" />
                        </div>
                        <span className="text-white/90 text-xl font-medium tracking-wide">{p.name}</span>
                        {/* 仅保留状态图标 */}
                        <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md w-9 h-8 rounded-lg flex items-center justify-center">
                            {p.isSpeaking ? <Mic size={16} className="text-green-400" /> : <MicOff size={16} className="text-red-400" />}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
             </div>
        )}
      </div>


      {/* 底部通栏控制栏 */}
      <div className={`absolute bottom-0 left-0 w-full h-20 bg-[#1a1a1a]/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-12 z-30 transition-transform duration-500 ease-in-out ${showControls ? 'translate-y-0' : 'translate-y-full'}`} onClick={(e) => e.stopPropagation()}>
         {/* 左侧功能区 */}
         <div className="flex items-center gap-10 flex-1">
            <ControlBtn icon={Mic} label="静音" onClick={activateControls} />
            <ControlBtn icon={Volume2} label="扬声器" onClick={activateControls} />
            <ControlBtn icon={Video} label="视频" onClick={activateControls} />
         </div>

         {/* 中间功能区 - 绝对居中 */}
         <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-10">
             <ControlBtn icon={Users} label="成员 (12)" onClick={activateControls} />
             <ControlBtn icon={Share} label="共享" color="text-green-400" onClick={(e) => { e.stopPropagation(); setIsSharing(true); activateControls(); }} />
             <ControlBtn icon={MessageSquare} label="聊天" onClick={activateControls} />
         </div>

         {/* 右侧功能区 - 靠右对齐 */}
         <div className="flex items-center justify-end flex-1">
             {/* 离开按钮已移除 */}
         </div>
      </div>
    </div>
  );
};

export default MeetingActiveView;
