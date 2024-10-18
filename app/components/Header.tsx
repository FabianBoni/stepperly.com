import React from 'react';
import Image from 'next/image';
import { MdArrowForwardIos } from "react-icons/md";

const Header: React.FC = () => {
    return (
        <div className="self-stretch h-[50px] mb-[32px] flex-col justify-start items-start gap-6 flex font-inter">
            <div className="self-stretch h-[50px] py-2 justify-between items-center inline-flex">
                <div className="p-2 rounded-[40px] justify-center items-center gap-1 inline-flex">
                    <div className="w-3.5 h-3.5 relative"><Image src="/icons/star.svg" width={100} height={100} alt="star icon" /></div>
                    <div className="text-[#111111] text-base font-medium">Stepperly</div>
                </div>
                <div className="justify-start items-center gap-1 inline-flex">
                    <div className="text-right text-[#585858] text-base font-semibold">Sign in</div>
                    <div className="w-4 h-4 text-[#585858]"><MdArrowForwardIos /></div>
                </div>
            </div>
        </div>
    );
};

export default Header;