import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Star, MoreVertical, Search, Globe, Layout, Cloud, BookOpen, Image, Map } from 'lucide-react';

const BrowserApp = ({ theme }) => {
  const [url, setUrl] = useState('https://www.browser-demo.com');

  const shortcuts = [
    { name: 'News', icon: BookOpen, color: 'text-blue-500' },
    { name: 'Weather', icon: Cloud, color: 'text-yellow-500' },
    { name: 'Images', icon: Image, color: 'text-purple-500' },
    { name: 'Maps', icon: Map, color: 'text-green-500' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
       {/* Browser Toolbar */}
       <div className="h-14 bg-gray-100 border-b border-gray-300 flex items-center px-4 gap-4 shrink-0">
          <div className="flex gap-4 text-gray-500">
             <ArrowLeft size={20} className="cursor-pointer hover:text-gray-800" />
             <ArrowRight size={20} className="cursor-pointer hover:text-gray-800 opacity-50" />
             <RotateCw size={20} className="cursor-pointer hover:text-gray-800" />
          </div>
          {/* Address Bar */}
          <div className="flex-1 h-9 bg-white rounded-full border border-gray-300 flex items-center px-4 gap-3 text-sm text-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
             <Globe size={16} className="text-gray-400" />
             <input 
                type="text" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 outline-none text-gray-600" 
             />
             <Star size={16} className="text-gray-400 cursor-pointer hover:text-yellow-400 transition-colors" />
          </div>
          <div className="flex gap-4 text-gray-500">
             <MoreVertical size={20} className="cursor-pointer hover:text-gray-800" />
          </div>
       </div>
       
       {/* Browser Content - Mock New Tab Page */}
       <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center gap-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-3xl px-8 -mt-20">
              {/* Logo Area */}
              <div className="flex flex-col items-center gap-2">
                 <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">Browser</h1>
                 <p className="text-gray-400 text-lg font-light tracking-wide">Explore the web securely</p>
              </div>
              
              {/* Search Bar */}
              <div className="w-full h-16 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full border border-gray-100 flex items-center px-8 gap-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-0.5 group">
                 <Search size={26} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                 <input type="text" placeholder="Search or type a URL" className="flex-1 outline-none text-xl text-gray-700 placeholder:text-gray-300 h-full" />
              </div>
              
              {/* Shortcuts */}
              <div className="grid grid-cols-4 gap-6 mt-4 w-full">
                 {shortcuts.map((item) => (
                    <div key={item.name} className="flex flex-col items-center gap-3 group cursor-pointer p-4 rounded-xl hover:bg-white/60 hover:shadow-sm transition-all">
                       <div className={`w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300 ${item.color}`}>
                          <item.icon size={26} />
                       </div>
                       <span className="text-gray-600 font-medium text-sm">{item.name}</span>
                    </div>
                 ))}
              </div>
          </div>
       </div>
    </div>
  );
};

export default BrowserApp;
