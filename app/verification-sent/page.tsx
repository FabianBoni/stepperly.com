"use client"

import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Image from 'next/image';

export default function VerificationSentPage() {
    return (
        <>
            <div className="relative z-0 w-full min-h-screen bg-[#f3f3f3] flex justify-center">
                <div className="w-full max-w-[732px] min-h-screen px-4 md:px-0 pt-12 pb-16 flex flex-col justify-between items-start">
                    <Header />
                    <div className="self-stretch flex-grow flex flex-col justify-center items-center gap-12 md:gap-14">
                        <div className="self-stretch flex-col justify-start items-start gap-10 flex">
                            <div className="self-stretch text-center text-[#111111] text-2xl md:text-[28px] font-semibold font-inter">
                                Share your goal <br />and get guides to achieve it!
                            </div>
                            <SearchBar onSearch={() => { }} />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
            <div className='z-[5] top-0 left-0 absolute w-full h-full bg-black opacity-[50%]'></div>
            <div className="absolute top-0 left-1/2 translate-x-[-50%] z-10 flex justify-center items-center min-h-screen bg-transparent">
                <div className="w-[554px] h-[547px] px-8 pt-8 pb-12 bg-white rounded-3xl shadow flex-col justify-start items-center gap-12 inline-flex">
                    <div className="self-stretch h-[29px] flex-col justify-start items-start gap-10 flex">
                        <div className="self-stretch h-[29px] py-0.5 justify-between items-start inline-flex">
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
                                <div className="text-[#111111] text-2xl font-semibold font-Inter">We&apos;ve sent a verification email!</div>
                                <div className="self-stretch text-[#585858] text-base font-medium font-Inter leading-snug">Click the link in the email to start use your Stepperly account.</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[438px] flex items-center justify-center relative">
                        <Image width={350} height={350} src={"/graphics/mailbox1.svg"} alt='mailbox' />
                    </div>
                </div>
            </div>
        </>
    );
}