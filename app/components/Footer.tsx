import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="self-stretch pt-6 flex-col justify-start items-center gap-6 flex border-t-2 ">
      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        <div className="text-center text-[#585858] text-sm font-normal font-inter order-3 md:order-1">
          © 2024 Stepperly. All rights reserved.
        </div>
        <div className="flex flex-col md:flex-row justify-end items-center gap-6">
          <div className="text-center text-[#111111] text-sm font-normal font-inter">Terms of Service</div>
          <div className="text-center text-[#111111] text-sm font-normal font-inter">Privacy Policy</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;