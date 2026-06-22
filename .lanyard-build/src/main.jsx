import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Lanyard from './Lanyard.jsx';
import './index.css';

// 生成一张"工牌"正面图：深色卡 + 🌧️ emoji + 名字。
// 用户之后会换成真实图片，这里先用 emoji 占位。
function makeCardImage(emoji, name, sub) {
  const W = 512;
  const H = 768; // 竖版卡片比例
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d');

  // 背景：深蓝渐变，贴合站点霓虹蓝主题
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#0e1b2a');
  g.addColorStop(1, '#0a1119');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // 顶部一抹霓虹蓝光晕
  const glow = ctx.createRadialGradient(W / 2, H * 0.34, 20, W / 2, H * 0.34, W * 0.7);
  glow.addColorStop(0, 'rgba(37,216,255,0.30)');
  glow.addColorStop(1, 'rgba(37,216,255,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // emoji 主体
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '220px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
  ctx.fillText(emoji, W / 2, H * 0.40);

  // 名字
  ctx.fillStyle = '#eaf6ff';
  ctx.font = '700 64px -apple-system, "PingFang SC", Arial, sans-serif';
  ctx.fillText(name, W / 2, H * 0.66);

  // 副标题
  ctx.fillStyle = 'rgba(37,216,255,0.9)';
  ctx.font = '600 28px -apple-system, "PingFang SC", Arial, sans-serif';
  ctx.fillText(sub, W / 2, H * 0.74);

  // 底部细条
  ctx.fillStyle = 'rgba(255,255,255,0.10)';
  ctx.fillRect(W * 0.18, H * 0.86, W * 0.64, 4);

  return c.toDataURL('image/png');
}

const cardImg = makeCardImage('🌧️', 'CHENYU', 'PORTFOLIO');

const rootEl = document.getElementById('root');

createRoot(rootEl).render(
  <StrictMode>
    <Lanyard
      position={[0, 0, 20]}
      gravity={[0, -40, 0]}
      fov={20}
      transparent
      frontImage={cardImg}
      backImage={cardImg}
      imageFit="cover"
    />
  </StrictMode>
);

// 在 iframe 内嵌入时，R3F 首帧可能在容器尺寸就绪前就完成测量，导致画布停留在
// 300x150。R3F 会响应 window 'resize'，所以多次补发 resize，确保画布贴合容器；
// ResizeObserver 负责后续容器尺寸变化。
function kick() {
  window.dispatchEvent(new Event('resize'));
}
[60, 150, 300, 600, 1000, 1600].forEach(t => setTimeout(kick, t));
if (typeof ResizeObserver !== 'undefined') {
  new ResizeObserver(kick).observe(rootEl);
}

// 嵌入父页时：滚轮事件不会跨 iframe 冒泡到父页，导致光标停在挂绳上时整页翻屏失灵。
// 同源下把滚轮转发给父页，让右侧挂绳区域也能正常翻屏（拖拽用的是 pointer 事件，互不影响）。
try {
  if (window.parent && window.parent !== window) {
    window.addEventListener(
      'wheel',
      e => {
        window.parent.dispatchEvent(new WheelEvent('wheel', { deltaY: e.deltaY, deltaX: e.deltaX, cancelable: true }));
      },
      { passive: true }
    );
  }
} catch (_) {
  /* 跨域时忽略 */
}
