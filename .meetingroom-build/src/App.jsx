import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Smartphone, Columns } from 'lucide-react';
import { THEME, VIEW_MODES } from './constants';
import ScreenFrame from './components/ScreenFrame';

export default function App() {
  const theme = THEME; 
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.4);
  const [viewMode, setViewMode] = useState(VIEW_MODES.TOUCH); 

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const isDual = viewMode === VIEW_MODES.BOTH;
        const contentWidth = isDual ? 4150 : 2100;
        const contentHeight = 1300;
        const scaleX = clientWidth / contentWidth;
        const scaleY = clientHeight / contentHeight;
        setScale(Math.min(scaleX, scaleY, 0.9)); 
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  // ===== 外置控制器桥接（portfolio 用 postMessage 驱动切屏） =====
  // 接收父页 { target:'mr-demo', type:'setView', value:'touch'|'lcd'|'both' }
  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.target !== 'mr-demo') return;
      if (d.type === 'setView' && [VIEW_MODES.TOUCH, VIEW_MODES.LCD, VIEW_MODES.BOTH].includes(d.value)) {
        setViewMode(d.value);
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // 回传当前状态，让外置控制器高亮对应按钮
  useEffect(() => {
    try {
      window.parent && window.parent.postMessage(
        { source: 'mr-demo', type: 'state', viewMode },
        '*'
      );
    } catch (e) {}
  }, [viewMode]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen bg-gray-100 overflow-hidden flex flex-col items-center justify-center relative"
    >
      <div className="absolute bottom-8 z-50 flex-col gap-4 items-center hidden">
        <div className="flex gap-2 bg-white/80 backdrop-blur-md px-2 py-2 rounded-full shadow-xl border border-white/40">
          <button onClick={() => setViewMode(VIEW_MODES.TOUCH)} className={`px-6 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 font-medium ${viewMode === VIEW_MODES.TOUCH ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:bg-white hover:text-blue-600'}`}>
            <Monitor size={18} /> 电子屏
          </button>
          <button onClick={() => setViewMode(VIEW_MODES.LCD)} className={`px-6 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 font-medium ${viewMode === VIEW_MODES.LCD ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:bg-white hover:text-blue-600'}`}>
            <Smartphone size={18} /> 液晶屏
          </button>
          <div className="w-px h-8 bg-gray-300 mx-1 self-center"></div>
          <button onClick={() => setViewMode(VIEW_MODES.BOTH)} className={`px-6 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 font-medium ${viewMode === VIEW_MODES.BOTH ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-600 hover:bg-white hover:text-gray-800'}`}>
            <Columns size={18} /> 双屏
          </button>
        </div>
      </div>

      <div 
        className="flex gap-24 origin-center transition-transform duration-500 ease-out"
        style={{ transform: `scale(${scale})` }}
      >
        <ScreenFrame 
          theme={theme} 
          type="lcd" 
          title="液晶屏 (LCD Mode)" 
          isVisible={viewMode === VIEW_MODES.LCD || viewMode === VIEW_MODES.BOTH}
          isDualMode={viewMode === VIEW_MODES.BOTH}
        />

        <ScreenFrame 
          theme={theme} 
          type="touch" 
          title="电子屏 (Touch Mode)" 
          isVisible={viewMode === VIEW_MODES.TOUCH || viewMode === VIEW_MODES.BOTH}
          isDualMode={viewMode === VIEW_MODES.BOTH}
        />
      </div>
    </div>
  );
}
