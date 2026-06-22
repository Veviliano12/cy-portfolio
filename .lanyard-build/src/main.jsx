import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Lanyard from './Lanyard.jsx';
import './index.css';

// 把 emoji 渲染成纯白剪影（用于黑色带子上的白色图标）
function whiteEmojiCanvas(emoji, size) {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = Math.round(size * 0.78) + 'px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
  ctx.fillText(emoji, size / 2, size / 2);
  // 把所有不透明像素涂成白色 → 得到白色剪影
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = 'source-over';
  return c;
}

// 生成挂绳带子贴图：黑底 + 重复的白色 🌧️ 图标
function makeBandImage() {
  const W = 1024;
  const H = 256;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0b0b0d';
  ctx.fillRect(0, 0, W, H);
  const icon = whiteEmojiCanvas('🌧️', 200);
  // 一个贴图块内放一个图标居中（沿带子重复后即等距排列）
  const s = 150;
  ctx.globalAlpha = 0.96;
  ctx.drawImage(icon, (W - s) / 2, (H - s) / 2, s, s);
  ctx.globalAlpha = 1;
  return c.toDataURL('image/png');
}

// 卡片底图（深蓝 + 霓虹蓝光晕），正反面共用背景
function cardBase(ctx, W, H) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#0e1b2a');
  g.addColorStop(1, '#0a1119');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, H * 0.34, 20, W / 2, H * 0.34, W * 0.7);
  glow.addColorStop(0, 'rgba(37,216,255,0.30)');
  glow.addColorStop(1, 'rgba(37,216,255,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
}

// 正面：🌧️ + CHENYU / PORTFOLIO
function makeFrontImage() {
  const W = 512;
  const H = 768;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d');
  cardBase(ctx, W, H);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '220px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
  ctx.fillText('🌧️', W / 2, H * 0.40);
  ctx.fillStyle = '#eaf6ff';
  ctx.font = '700 64px -apple-system, "PingFang SC", Arial, sans-serif';
  ctx.fillText('CHENYU', W / 2, H * 0.66);
  ctx.fillStyle = 'rgba(37,216,255,0.9)';
  ctx.font = '600 28px -apple-system, "PingFang SC", Arial, sans-serif';
  ctx.fillText('PORTFOLIO', W / 2, H * 0.74);
  ctx.fillStyle = 'rgba(255,255,255,0.10)';
  ctx.fillRect(W * 0.18, H * 0.86, W * 0.64, 4);
  return c.toDataURL('image/png');
}

// 反面：ENTP
function makeBackImage() {
  const W = 512;
  const H = 768;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d');
  cardBase(ctx, W, H);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#eaf6ff';
  ctx.font = '800 150px -apple-system, "PingFang SC", Arial, sans-serif';
  ctx.fillText('ENTP', W / 2, H * 0.46);
  ctx.fillStyle = 'rgba(37,216,255,0.85)';
  ctx.font = '600 26px -apple-system, "PingFang SC", Arial, sans-serif';
  ctx.fillText('PERSONALITY', W / 2, H * 0.56);
  ctx.fillStyle = 'rgba(255,255,255,0.10)';
  ctx.fillRect(W * 0.18, H * 0.7, W * 0.64, 4);
  return c.toDataURL('image/png');
}

const frontImg = makeFrontImage();
const backImg = makeBackImage();
const bandImg = makeBandImage();

function App() {
  const [shown, setShown] = useState(true);

  // 监听父页发来的展开/收起指令
  useEffect(() => {
    function onMsg(e) {
      const d = e.data;
      if (d && d.target === 'lanyard' && typeof d.show === 'boolean') setShown(d.show);
    }
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  return (
    <Lanyard
      position={[0, 0, 20]}
      gravity={[0, -40, 0]}
      fov={20}
      transparent
      frontImage={frontImg}
      backImage={backImg}
      imageFit="cover"
      lanyardImage={bandImg}
      shown={shown}
    />
  );
}

const rootEl = document.getElementById('root');

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// iframe 内 R3F 首帧可能测量为 0，多次补发 resize + ResizeObserver 让画布贴合容器
function kick() {
  window.dispatchEvent(new Event('resize'));
}
[60, 150, 300, 600, 1000, 1600].forEach(t => setTimeout(kick, t));
if (typeof ResizeObserver !== 'undefined') {
  new ResizeObserver(kick).observe(rootEl);
}

// 滚轮不跨 iframe 冒泡，转发给父页让光标停在挂绳上时也能整页翻屏
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
