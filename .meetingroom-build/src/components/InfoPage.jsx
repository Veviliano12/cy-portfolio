import React from 'react';

const InfoPage = ({ titleCN, titleEN, children, descCN, descEN }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center text-white pb-10">
      <div className="flex flex-col items-center mb-32 animate-in slide-in-from-bottom-4 fade-in duration-700">
        <span className="text-[56px] font-medium tracking-wide mb-2 text-white drop-shadow-md">{titleCN}</span>
        <span className="text-[24px] font-light opacity-60 tracking-wider uppercase">{titleEN}</span>
      </div>


      <div className="mb-32 animate-in zoom-in-95 fade-in duration-700 delay-100">
        {children}
      </div>


      <div className="flex flex-col items-center gap-2 opacity-80 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200">
        <span className="text-[20px] tracking-wide">{descCN}</span>
        <span className="text-[16px] font-light opacity-70">{descEN}</span>
      </div>
    </div>
  );
};

export default InfoPage;
