import React from 'react';

const Header = ({ theme }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-24 flex items-center px-[48px] z-20">
      <span className={`${theme.logo} font-bold text-4xl tracking-tight font-sans`}>
        MeetingRooms
      </span>
    </div>
  );
};

export default Header;
