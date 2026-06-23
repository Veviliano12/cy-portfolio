export const HARMONY_STYLE = {
  textPrimary: 'text-gray-900',
  textSecondary: 'text-gray-700',
  textAccent: 'text-black',
  cardBg: 'bg-blue-900/30',
  cardBorder: 'border-white/40',
  glassEffect: 'backdrop-blur-xl bg-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/30',
  dockEffect: 'backdrop-blur-2xl bg-gray-900/30 shadow-[0_-8px_32px_0_rgba(0,0,0,0.1)] border-t border-white/20',
  buttonBg: 'bg-blue-400/20 hover:bg-blue-400/30',
  footerIcon: 'text-blue-100 hover:text-white',
  logo: 'bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm'
};

export const THEME = {
  name: '最终方案：静谧晨光',
  bgImage: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?auto=format&fit=crop&q=80&w=2600', 
  ...HARMONY_STYLE
};

export const APPS = {
  HOME: 'home',
  WHITEBOARD: 'whiteboard',
  MEETING: 'meeting',
  PROJECTION: 'projection',
  BROWSER: 'browser',
  TRANSLATION: 'translation'
};

export const VIEW_MODES = {
  TOUCH: 'touch',
  LCD: 'lcd',
  BOTH: 'both'
};
