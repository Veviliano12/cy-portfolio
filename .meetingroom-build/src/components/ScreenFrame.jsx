import React, { useState } from 'react';
import { APPS } from '../constants';
import FloatingAssistant from './FloatingAssistant';
import ExitModal from './ExitModal';
import Header from './Header';
import HomeContent from './HomeContent';
import HomeFooter from './Footer'; // We named the file Footer.jsx but export default HomeFooter
import FloatingCode from './FloatingCode';
import WhiteboardApp from './WhiteboardApp';
import MeetingApp from './MeetingApp';
import ProjectionContent from './ProjectionContent';
import InfoPage from './InfoPage';
import SubtitleBar from './SubtitleBar';
import BrowserApp from './BrowserApp';
import TranslationApp from './TranslationApp';
import TranslationSavePage from './TranslationSavePage';
import TranslationSettingsModal from './TranslationSettingsModal';
import Dock from './Dock';
import Toast from './Toast';

const ScreenFrame = ({ theme, type, title, isVisible, keypadStyle, isDualMode }) => {
  const [currentApp, setCurrentApp] = useState(APPS.HOME);
  const [meetingJoined, setMeetingJoined] = useState(false); 
  const [isProjecting, setIsProjecting] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [meetingSharing, setMeetingSharing] = useState(false);
  const [sharingType, setSharingType] = useState(null); // 新增：共享类型状态
  const [showExitModal, setShowExitModal] = useState(false); // 控制退出弹窗
  const [showTranslationExitModal, setShowTranslationExitModal] = useState(false); // 控制翻译退出弹窗
  const [showTranslationSavePage, setShowTranslationSavePage] = useState(false); // 控制翻译保存页面
  const [showTranslationSettingsModal, setShowTranslationSettingsModal] = useState(false); // 控制翻译设置弹窗
  const [isTranslationStarted, setIsTranslationStarted] = useState(false); // 控制翻译服务是否已启动 (开始生成内容)
  
  // Toast 状态
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // 字幕设置状态
  const [subtitleFontSize, setSubtitleFontSize] = useState(2); // 1:小, 2:中, 3:大
  const [sourceLang, setSourceLang] = useState('zh');
  const [targetLang, setTargetLang] = useState('en');

  // FloatingAssistant 状态 (提升到 ScreenFrame 管理)
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantView, setAssistantView] = useState('menu'); // 'menu' | 'settings'

  const navigateTo = (appId) => {
    if (type === 'touch') {
      // 切换应用时，重置之前应用的状态
      if (currentApp === APPS.PROJECTION && appId !== APPS.PROJECTION) {
        setIsProjecting(false);
      }
      
      // 翻译应用逻辑
      if (appId === APPS.TRANSLATION) {
        // 只要翻译已经启动，无论是否入会，都直接切换，不弹窗
        if (isTranslationStarted) {
           setCurrentApp(APPS.TRANSLATION);
           // 确保关闭弹窗（防御性编程，防止之前的状态残留）
           setShowTranslationSettingsModal(false);
        } else {
           // 翻译未启动
           if (meetingJoined) {
              // 规则3: 入会时启用翻译，不显示弹窗，直接开启
              setCurrentApp(APPS.TRANSLATION);
              setIsTranslationStarted(true);
           } else {
              // 规则1: 未入会启用翻译，显示弹窗
              setCurrentApp(APPS.TRANSLATION);
              setShowTranslationSettingsModal(true);
              setIsTranslationStarted(false);
              setShowSubtitle(false);
           }
        }
      } else {
        // 如果当前是全屏翻译，切换到其他应用时，保持翻译服务（转为字幕）
      if (currentApp === APPS.TRANSLATION && appId !== APPS.TRANSLATION) {
        if (isTranslationStarted) {
          setShowSubtitle(true);
        } else {
          // 如果翻译未启动就切走，应该关闭字幕（虽然理论上它本身就是false，但保险起见）
          setShowSubtitle(false);
        }
      }
      setCurrentApp(appId);
      }
    }
  };

  const startProjection = () => {
     setIsProjecting(true);
     setCurrentApp(APPS.PROJECTION);
  };

  const showToastMsg = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const toggleSubtitle = () => {
    // 检查翻译是否已开启 (无论是全屏还是悬浮)
    // 只有当翻译真正启动后（isTranslationStarted为true），才提示“翻译已开启”
    if (isTranslationStarted) {
      showToastMsg("翻译已开启");
      return;
    }

    // 开启翻译逻辑
    // 规则 3: 如果已经入会，则点击悬浮助手的翻译时，默认打开的就是嵌入的字幕，且直接开启
    if (meetingJoined) {
      setShowSubtitle(true);
      setIsTranslationStarted(true);
    } 
    // 规则 1: 没有入会，在首页时，点击悬浮助手的翻译，打开的就是全屏的翻译
    else if (currentApp === APPS.HOME) {
      setCurrentApp(APPS.TRANSLATION);
      if (!isTranslationStarted) {
         setShowTranslationSettingsModal(true);
      }
      setShowSubtitle(false); // 确保不显示悬浮字幕
    }
    // 其他情况 (例如在白板/浏览器/投影但未入会)
    else {
      // 如果未入会，从其他App开启悬浮字幕，也跳转到全屏翻译设置页面
      setCurrentApp(APPS.TRANSLATION);
      if (!isTranslationStarted) {
         setShowTranslationSettingsModal(true);
      }
      setShowSubtitle(false);
    }
  };

  // 处理共享请求
  const handleShare = (type) => {
    setSharingType(type);
    setMeetingSharing(true);
    setCurrentApp(type); // 切换到对应应用
    
    // 如果是投影，还需要设置投影状态
    if (type === APPS.PROJECTION) {
      setIsProjecting(true); // 假设共享投影默认就是开启投影状态
    }
  };

  // 处理停止共享
  const handleStopShare = () => {
    setSharingType(null);
    setMeetingSharing(false);
    setIsProjecting(false);
    setCurrentApp(APPS.MEETING); // 回到会议页面
  };

  // 处理退出请求 (Dock退出 或 会议离开)
  const handleExitRequest = () => {
     if (meetingJoined) {
        setShowExitModal(true);
     } else {
        navigateTo(APPS.HOME);
     }
  };

  // 确认退出
  const confirmExit = () => {
     setMeetingJoined(false);
     setMeetingSharing(false);
     setIsProjecting(false);
     setShowExitModal(false);
     setCurrentApp(APPS.HOME);
     // 注意：翻译服务不应该因为退出会议而停止，除非用户手动停止翻译
     // 但如果是在全屏翻译模式下退出的会议（理论上全屏翻译和会议是两个App，不能同时在前台，除非是会议App内的退出逻辑？）
     // 此处的 handleExitRequest 是给 Dock 退出或 MeetingApp 退出用的。
     // 如果是在会议中开启了翻译（此时翻译是悬浮字幕），退出会议后，翻译应该如何？
     // 按照常理，退出会议后，翻译服务（针对会议语音的）可能应该停止，或者转为麦克风输入？
     // Demo 中翻译是模拟的。
     // 如果用户希望“翻译仍在”，那么我们就不重置 isTranslationStarted。
     // 只是需要确保切回 Home 后，如果翻译还在，是否显示悬浮字幕？
     if (isTranslationStarted) {
        setShowSubtitle(true); // 退出会议回到首页，保留悬浮字幕
     }
  };

  const isHome = currentApp === APPS.HOME;
  
  // Handle translation app operations
  const handleMinimizeTranslation = () => {
    setCurrentApp(APPS.HOME);
    setShowSubtitle(true); // 最小化时开启悬浮字幕
  };

  const handleEndTranslation = () => {
    setShowTranslationExitModal(true);
  };

  const confirmEndTranslation = () => {
    setShowTranslationExitModal(false);
    setShowTranslationSavePage(true);
  };

  const cancelEndTranslation = () => {
    setShowTranslationExitModal(false);
  };

  const handleClearAndExit = () => {
    setShowTranslationSavePage(false);
    setShowSubtitle(false);
    setIsTranslationStarted(false); // 重置启动状态

    // 如果当前是全屏翻译，则回到首页；否则留在当前页面
    if (currentApp === APPS.TRANSLATION) {
      setCurrentApp(APPS.HOME);
    }
  };

  const handleReturnToTranslation = () => {
    setShowTranslationSavePage(false);
  };

  const handleStartTranslation = () => {
    setShowTranslationSettingsModal(false);
    setIsTranslationStarted(true);
  };

  return (
    <div className={`flex flex-col gap-4 transition-all duration-500 ${!isVisible ? 'hidden' : ''}`} style={keypadStyle}>
      {/* 调试状态显示 (临时) - 已移除 */}
      
      <div className="text-gray-500 text-xl font-bold text-center uppercase tracking-widest pl-10 text-left">{title}</div>
      <div className="relative w-[1920px] h-[1080px] bg-black shadow-[0_0_50px_rgba(0,0,0,0.3)] shrink-0 
            origin-top-left select-none font-sans 
            border-[32px] border-black rounded-[48px] ring-1 ring-white/10 box-content overflow-hidden">
        
        <div className="absolute inset-0 rounded-[16px] overflow-hidden">
            <img src={theme.bgImage} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 brightness-[0.9] contrast-[1.05]" alt="Wallpaper" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none"></div>

            {type === 'touch' && !showTranslationSavePage && (
              <FloatingAssistant  
                theme={theme} 
                onToggleSubtitle={toggleSubtitle} 
                isSubtitleOn={showSubtitle}
                isOpen={assistantOpen}
                setIsOpen={setAssistantOpen}
                view={assistantView}
                setView={setAssistantView}
                subtitleSettings={{
                  fontSize: subtitleFontSize,
                  sourceLang,
                  targetLang,
                  setFontSize: setSubtitleFontSize,
                  setSourceLang,
                  setTargetLang
                }}
              />
            )}

            {/* 退出确认弹窗 */}
            {showExitModal && (
               <ExitModal 
                  onConfirm={confirmExit} 
                  onCancel={() => setShowExitModal(false)} 
               />
            )}

            {isHome ? (
              <>
                <Header theme={theme} />
                <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-500">
                  <HomeContent 
                    theme={theme} 
                    type={type} 
                    onNavigate={navigateTo} 
                    onSimulateProjection={startProjection}
                    isDualMode={isDualMode}
                  />
                </div>
                <HomeFooter theme={theme} type={type} onNavigate={navigateTo} isDualMode={isDualMode} />
              </>
            ) : (
              <>
                {!showTranslationSavePage && <FloatingCode theme={theme} onSimulateProjection={startProjection} />}
                
                <div className={`absolute top-0 left-0 right-0 transition-all duration-500 ease-in-out ${
                  // 如果是"投影(未投)"或"会议(未入会)"或"翻译"，容器高度固定（因为字幕是悬浮的或不显示）
                  // 否则，容器高度随字幕栏高度变化
                  ((currentApp === APPS.PROJECTION && !isProjecting) || 
                   (currentApp === APPS.MEETING && !meetingJoined) ||
                   (currentApp === APPS.TRANSLATION))
                    ? 'bottom-[60px]' 
                    : (showSubtitle ? 'bottom-[210px]' : 'bottom-[60px]')
                } animate-in slide-in-from-bottom-10 fade-in`}>
                   {currentApp === APPS.WHITEBOARD && <WhiteboardApp theme={theme} />}
                   
                   {currentApp === APPS.MEETING && (
                     <MeetingApp 
                       theme={theme} 
                       joined={meetingJoined} 
                       setJoined={setMeetingJoined} 
                       meetingSharing={meetingSharing}
                       setMeetingSharing={setMeetingSharing}
                       onRequestExit={handleExitRequest} // 传入退出请求处理
                     />
                   )}

                   {currentApp === APPS.PROJECTION && (
                     isProjecting ? (
                       <ProjectionContent theme={theme} />
                     ) : (
                       <InfoPage 
                          titleCN="投影" 
                          titleEN="Projection" 
                          descCN="在 eShare 或 s.huavvei.com 输入上方投影码" 
                          descEN="Enter the projection code above at eShare or s.huavvei.com"
                       >
                          <span 
                            onClick={startProjection}
                            className="font-mono font-bold text-[120px] tracking-tighter leading-none text-white drop-shadow-2xl cursor-pointer hover:text-blue-200 transition-colors"
                          >
                             856-790
                          </span>
                       </InfoPage>
                     )
                   )}

                   {currentApp === APPS.BROWSER && <BrowserApp theme={theme} />}

                   {currentApp === APPS.TRANSLATION && (
                     <>
                       <TranslationApp 
                         theme={theme} 
                         isStarted={isTranslationStarted}
                         onMinimize={handleMinimizeTranslation}
                         onEnd={handleEndTranslation}
                         subtitleSettings={{
                           fontSize: subtitleFontSize,
                           sourceLang,
                           targetLang,
                           setFontSize: setSubtitleFontSize,
                           setSourceLang,
                           setTargetLang
                         }}
                       />
                       {/* 翻译设置弹窗 - 仅在翻译应用内显示，且覆盖翻译应用容器 */}
                       {showTranslationSettingsModal && (
                         <TranslationSettingsModal 
                           onStart={handleStartTranslation}
                           subtitleSettings={{
                             fontSize: subtitleFontSize,
                             sourceLang,
                             targetLang,
                             setFontSize: setSubtitleFontSize,
                             setSourceLang,
                             setTargetLang
                           }}
                         />
                       )}
                     </>
                   )}
                </div>

                {showSubtitle && isTranslationStarted && currentApp !== APPS.TRANSLATION && (
                  <SubtitleBar 
                    theme={theme} 
                    isHome={(currentApp === APPS.PROJECTION && !isProjecting) || (currentApp === APPS.MEETING && !meetingJoined)} 
                    onClose={handleEndTranslation} 
                    fontSize={subtitleFontSize}
                    subtitleSettings={{
                      fontSize: subtitleFontSize,
                      sourceLang,
                      targetLang,
                      setFontSize: setSubtitleFontSize,
                      setSourceLang,
                      setTargetLang
                    }}
                  />
                )}

                <Dock 
                  theme={theme} 
                  activeApp={currentApp} 
                  onNavigate={navigateTo}
                  onExit={handleExitRequest}
                  isInMeeting={meetingJoined}
                  sharingType={sharingType}
                  onShare={handleShare}
                  onStopShare={handleStopShare}
                />
              </>
            )}

            {/* 翻译退出确认弹窗 */}
            {showTranslationExitModal && (
               <ExitModal 
                  title="确定要结束翻译吗？"
                  confirmText="结束"
                  onConfirm={confirmEndTranslation} 
                  onCancel={cancelEndTranslation} 
               />
            )}

            {/* 翻译设置弹窗 - 已移动到 TranslationApp 内部渲染 */}

            {/* 翻译保存页面 */}
            {showTranslationSavePage && (
               <TranslationSavePage 
                  onClearAndExit={handleClearAndExit} 
                  onReturnToTranslation={handleReturnToTranslation} 
               />
            )}

            {/* Toast 提示 */}
            {showToast && (
              <Toast 
                message={toastMessage} 
                onClose={() => setShowToast(false)} 
              />
            )}

            {isHome && showSubtitle && isTranslationStarted && (
              <SubtitleBar 
                theme={theme} 
                isHome={true} 
                onClose={handleEndTranslation} 
                fontSize={subtitleFontSize}
                    subtitleSettings={{
                      fontSize: subtitleFontSize,
                      sourceLang,
                      targetLang,
                      setFontSize: setSubtitleFontSize,
                      setSourceLang,
                      setTargetLang
                    }}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default ScreenFrame;
