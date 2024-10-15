import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="max-w-[732px] w-full box-border min-h-[81px] opacity-100 z-[2] rotate-0 flex flex-col flex-nowrap justify-start items-start gap-6 pt-10">
            <div className="w-[733px] h-[1px] opacity-100 z-0 rotate-0 overflow-hidden box-border bg-[image:var(--image-2)] bg-center bg-contain bg-no-repeat"></div>
            <div className="max-w-[732px] w-full box-border min-h-[17px] opacity-100 z-[1] rotate-0 flex flex-row flex-nowrap justify-between items-center content-between p-0">
                <div className="max-w-[319px] w-full box-border min-h-[17px] opacity-100 z-0 rotate-0 text-center">
                    <span className="text-[14px] leading-[14px] font-inter font-normal text-[#595959]">Copyright © 2024 Stepperly. All rights reserved.</span>
                </div>
                <div className="max-w-[228px] w-full box-border min-h-[17px] opacity-100 z-[1] rotate-0 flex flex-row flex-nowrap justify-end items-center gap-6 p-0">
                    <a href="#terms" className="max-w-[112px] w-full box-border min-h-[17px] opacity-100 z-0 rotate-0 text-center">
                        <span className="text-[14px] leading-[14px] font-inter font-normal text-[#111111]">Terms of Service</span>
                    </a>
                    <a href="#privacy" className="max-w-[92px] w-full box-border min-h-[17px] opacity-100 z-[1] rotate-0 text-center">
                        <span className="text-[14px] leading-[14px] font-inter font-normal text-[#111111]">Privacy Policy</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;