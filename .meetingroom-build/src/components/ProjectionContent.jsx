import React from 'react';
import PPTView from './PPTView';

const ProjectionContent = ({ theme }) => {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-[#121212] overflow-hidden p-1">
       <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-black px-5 py-1 rounded-b-[4px] shadow-lg flex items-center justify-center animate-in slide-in-from-top duration-500">
          <span className="text-[20px] font-medium tracking-wide">张三正在投影</span>
       </div>
       <PPTView />
    </div>
  );
};

export default ProjectionContent;
