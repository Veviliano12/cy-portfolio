import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Lanyard from './Lanyard.jsx';
import './index.css';

// 画一个白色"雨云"图标：蓬松的云 + 3 滴明显分开的雨滴（比 emoji 剪影更清楚）
function drawRainCloud(ctx, cx, cy, s) {
  ctx.save();
  ctx.fillStyle = '#ffffff';
  const cloudY = cy - s * 0.16;
  // 云朵：几个圆叠成 + 平底
  ctx.beginPath();
  ctx.arc(cx - s * 0.42, cloudY + s * 0.06, s * 0.30, 0, Math.PI * 2);
  ctx.arc(cx - s * 0.02, cloudY - s * 0.20, s * 0.40, 0, Math.PI * 2);
  ctx.arc(cx + s * 0.45, cloudY + s * 0.03, s * 0.32, 0, Math.PI * 2);
  ctx.arc(cx + s * 0.14, cloudY + s * 0.10, s * 0.36, 0, Math.PI * 2);
  ctx.rect(cx - s * 0.55, cloudY + s * 0.04, s * 1.12, s * 0.30);
  ctx.fill();
  // 雨滴：3 滴较粗的水滴，明显分开
  const dropTop = cloudY + s * 0.52;
  const drop = dx => {
    ctx.beginPath();
    ctx.moveTo(dx, dropTop);
    ctx.bezierCurveTo(dx + s * 0.13, dropTop + s * 0.20, dx + s * 0.11, dropTop + s * 0.38, dx, dropTop + s * 0.38);
    ctx.bezierCurveTo(dx - s * 0.11, dropTop + s * 0.38, dx - s * 0.13, dropTop + s * 0.20, dx, dropTop);
    ctx.fill();
  };
  drop(cx - s * 0.34);
  drop(cx);
  drop(cx + s * 0.34);
  ctx.restore();
}

// 生成挂绳带子贴图：黑底 + 重复的白色雨云图标
function makeBandImage() {
  const W = 1024;
  const H = 256;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0b0b0d';
  ctx.fillRect(0, 0, W, H);
  drawRainCloud(ctx, W / 2, H / 2, 120);
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
  // 默认不掉落（收起在视野上方），点击顶部按钮才展开掉落
  const [shown, setShown] = useState(false);
  const [dropKey, setDropKey] = useState(0);
  const shownRef = useRef(false);

  // 监听父页发来的展开/收起指令；每次"展开"自增 dropKey → 重挂载 → 复用页面加载的自然掉落
  useEffect(() => {
    function onMsg(e) {
      const d = e.data;
      if (d && d.target === 'lanyard' && typeof d.show === 'boolean') {
        if (d.show && !shownRef.current) setDropKey(k => k + 1);
        shownRef.current = d.show;
        setShown(d.show);
      }
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
      dropKey={dropKey}
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
