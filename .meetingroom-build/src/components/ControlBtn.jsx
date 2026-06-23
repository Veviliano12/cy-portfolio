import React from 'react';

const ControlBtn = ({ icon: Icon, label, color = "text-white", onClick }) => (
  <button className={`group flex flex-col items-center gap-1 transition-all hover:-translate-y-1 cursor-pointer opacity-80 hover:opacity-100`} onClick={onClick}>
    <Icon size={32} className={color} strokeWidth={1.5} />
    {label && <span className={`text-[12px] font-medium ${color}`}>{label}</span>}
  </button>
);

export default ControlBtn;
