import React from 'react';
import Image from 'next/image';
import { MdArrowForwardIos } from "react-icons/md";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'

const Header: React.FC = () => {
    return (
        <div className="self-stretch h-[50px] mb-[32px] flex-col justify-start items-start gap-6 flex font-inter">
            <div className="self-stretch h-[50px] py-2 justify-between items-center inline-flex">
                <div className="p-2 rounded-[40px] justify-center items-center gap-1 inline-flex">
                    <div className="text-[#111111] text-base font-medium">
                        <SignedOut>
                            <div className='flex flex-row items-center'>
                                <div className="w-3.5 h-3.5 relative mr-[5px]"><Image src="/icons/star.svg" width={100} height={100} alt="star icon" /></div>
                                <div>Stepperly</div>
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <div className="h-[35px] px-6 py-2 bg-[#111111] rounded-[40px] justify-center items-center gap-2 inline-flex">
                                <div className="text-white text-base font-semibold font-Inter">Upgrade to Pro</div>
                            </div>
                        </SignedIn>
                    </div>
                </div>
                <div className="justify-start items-center gap-1 inline-flex">
                    <div className="text-right text-[#585858] text-base font-semibold">
                        <SignedOut>
                            <div className='flex flex-row items-center'>
                                <SignInButton />
                                <div className="w-4 h-4 ml-[5px] text-[#585858]"><MdArrowForwardIos /></div>
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;