"use client"

import { SignUp } from '@clerk/nextjs';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function CustomSignUpPage() {
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
      <div className='z-[5] top-0 absolute w-full h-full bg-black opacity-[50%]'></div>
      <div className="absolute top-0 left-1/2 translate-x-[-50%] z-10 flex justify-center items-center min-h-screen bg-transparent">
        <div className="w-[474px] px-8 pt-8 pb-12 bg-white rounded-3xl shadow flex-col justify-start items-start gap-12 inline-flex">
          <div className="self-stretch flex-col justify-start items-start gap-10 flex">
            <div className="self-stretch h-[29px] p-0.5 justify-between items-center inline-flex">
              <div className="text-[#111111] text-2xl font-semibold font-inter">Sign Up</div>
              <div className="w-6 h-6 relative" />
            </div>
            <div className="self-stretch pb-2 flex-col justify-start items-start gap-4 flex">
              <SignUp
                fallbackRedirectUrl="/verification-sent"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "w-full shadow-none p-0",
                    header: "hidden",
                    footer: "hidden",
                    socialButtonsBlockButton: "w-full p-4 rounded-[40px] border-2 border-[#111111] justify-center items-center gap-2 inline-flex",
                    formButtonPrimary: "w-full p-4 bg-[#111111] rounded-[40px] justify-center items-center gap-3 inline-flex text-white text-base font-medium font-inter",
                  }
                }}
              />
              <div className="self-stretch h-14 p-4 rounded-[40px] justify-center items-center gap-2 inline-flex">
                <Link href="/sign-in" className="text-[#111111] text-base font-medium font-inter">Already have an account? Sign In</Link>
              </div>
            </div>
            <div className="self-stretch px-20 justify-center items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 text-center">
                <span className="text-[#585858] text-xs font-normal font-inter">By continuing you agree to Stepperly's </span>
                <span className="text-[#e0154e] text-xs font-normal font-inter">Terms of Service</span>
                <span className="text-[#585858] text-xs font-normal font-inter"> and </span>
                <span className="text-[#e0154e] text-xs font-normal font-inter">Privacy Policy</span>
                <span className="text-[#585858] text-xs font-normal font-inter">.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}