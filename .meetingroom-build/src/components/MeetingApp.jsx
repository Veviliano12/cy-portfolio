import React, { useState } from 'react';
import { QrCode } from 'lucide-react';
import MeetingActiveView from './MeetingActiveView';

const MeetingApp = ({ theme, joined, setJoined, meetingSharing, setMeetingSharing, onRequestExit }) => {
  const [isKeypadMode, setIsKeypadMode] = useState(false);
  const [meetingId, setMeetingId] = useState('');

  const handleNumClick = (num) => {
    if (meetingId.length < 12) setMeetingId(prev => prev + num);
  };

  const handleBackspace = () => setMeetingId(prev => prev.slice(0, -1));
  const handleClear = () => setMeetingId('');
  const handleJoin = () => setJoined(true);

  const btnClass = `flex items-center justify-center transition-all active:scale-95 duration-200 select-none cursor-pointer h-16 w-full rounded-[16px] ${theme.glassEffect} text-3xl font-medium text-white hover:bg-white/30`;
  const funcBtnClass = `${btnClass} text-2xl font-normal`;

  if (joined) {
    return (
        <MeetingActiveView 
            onLeave={onRequestExit} // 点击离开 -> 触发弹窗
            isSharing={meetingSharing}
            setIsSharing={setMeetingSharing}
        />
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center text-white pb-10">
      <div className={`flex flex-col items-center animate-in slide-in-from-bottom-4 fade-in duration-700 ${isKeypadMode ? 'mb-10' : 'mb-24'}`}>
        <span className="text-[56px] font-medium tracking-wide mb-2 text-white drop-shadow-md">视频会议</span>
        <span className="text-[24px] font-light opacity-60 tracking-wider uppercase">Video Meeting</span>
      </div>

      {!isKeypadMode ? (
        <div className="flex flex-col items-center animate-in zoom-in-95 fade-in duration-500">
          <div onClick={handleJoin} className="w-[200px] h-[200px] bg-white p-4 rounded-3xl shadow-2xl flex items-center justify-center mb-24 cursor-pointer hover:scale-105 transition-transform active:scale-95">
             <QrCode size={170} className="text-gray-900" />
          </div>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-1 opacity-90">
              <span className="text-[20px] tracking-wide text-white">手机扫一扫</span>
              <span className="text-[16px] font-light opacity-70">Scan with phone</span>
            </div>
            <button onClick={() => setIsKeypadMode(true)} className="group flex flex-col items-center gap-1 opacity-90 hover:opacity-100 transition-opacity">
              <span className="text-[20px] tracking-wide text-white border-b border-white/80 pb-0.5">输入会议ID入会</span>
              <span className="text-[16px] font-light opacity-70">Enter meeting ID to join</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center animate-in slide-in-from-bottom-8 fade-in duration-500">
          <div className="flex flex-col gap-10 w-[440px]">
            <div className={`h-20 w-full flex items-center justify-center shadow-inner rounded-[20px] ${theme.glassEffect}`}>
               <span className={`text-3xl font-mono tracking-widest ${meetingId ? 'text-white' : 'text-white/30'}`}>{meetingId || '请输入会议ID'}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full">
               {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                 <button key={num} className={btnClass} onClick={() => handleNumClick(num.toString())}>{num}</button>
               ))}
               <button className={funcBtnClass} onClick={handleBackspace}>回退</button>
               <button className={btnClass} onClick={() => handleNumClick('0')}>0</button>
               <button className={funcBtnClass} onClick={handleClear}>清空</button>
            </div>
            <div className="flex w-full gap-4">
               <button onClick={() => { setIsKeypadMode(false); setMeetingId(''); }} className={`flex-1 h-20 rounded-[20px] ${theme.glassEffect} text-white hover:bg-white/30 text-2xl font-medium transition-all active:scale-95`}>取消</button>
               <button onClick={handleJoin} className={`flex-1 h-20 rounded-[20px] ${theme.glassEffect} bg-blue-600/60 hover:bg-blue-600/80 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] text-2xl font-medium transition-all active:scale-95`}>加入</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingApp;
