import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="max-w-[732px] w-full box-border opacity-100 z-0 rotate-0 flex flex-col flex-nowrap justify-start items-start gap-14 pt-20">
            <div className="max-w-[732px] w-full box-border opacity-100 z-0 rotate-0 flex flex-col flex-nowrap justify-start items-start gap-14 p-0">
                <div className="max-w-[732px] w-full box-border opacity-100 z-0 rotate-0 flex flex-col flex-nowrap justify-center items-center gap-6 p-0">
                    <div className="max-w-[129px] w-full box-border min-h-[33px] opacity-100 z-0 rotate-0 flex flex-row flex-nowrap justify-center items-center gap-2 py-2 px-0 rounded-[32px] bg-[#111111]">
                        <div className="max-w-[97px] w-full box-border min-h-[17px] opacity-100 z-0 rotate-0 text-center">
                            <span className="text-[14px] leading-[14px] font-inter font-medium text-white">Powered by AI</span>
                        </div>
                    </div>
                    <h1 className="max-w-[732px] w-full box-border min-h-[34px] opacity-100 z-1 rotate-0 text-center">
                        <span className="text-[28px] leading-[28px] font-inter font-semibold text-[#111111] whitespace-pre-wrap">The Google For Step-by-Step Guides</span>
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default Header;