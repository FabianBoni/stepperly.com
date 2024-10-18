import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="self-stretch h-[50px] flex-col justify-start items-start gap-6 flex font-inter">
      <div className="self-stretch h-[50px] py-2 justify-between items-center inline-flex">
        <div className="w-12 h-12 left-[684px] top-[1px] absolute">
          <div className="left-[-33px] top-[15px] absolute justify-start items-center gap-1 inline-flex">
            <div className="text-right text-[#585858] text-base font-semibold">Sign in</div>
            <div className="w-4 h-4 relative origin-top-left rotate-180" />
          </div>
        </div>
        <div className="p-2 left-0 top-[8px] absolute rounded-[40px] justify-center items-center gap-1 inline-flex">
          <div className="w-3.5 h-3.5 relative" />
          <div className="text-[#111111] text-base font-medium">Stepperly</div>
        </div>
      </div>
    </div>
  );
};

export default Header;