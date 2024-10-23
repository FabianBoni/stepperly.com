"use client"

import React from 'react';
import Footer from '../components/Footer';
import { useUser, useClerk } from "@clerk/nextjs";
import { MdArrowBackIosNew } from "react-icons/md";
import Link from 'next/link';

const AccountSettings = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const clerk = useClerk();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  if (isLoaded && isSignedIn) {
    console.log(user.firstName);
    console.log(user.lastName);
    console.log(user.emailAddresses[0].emailAddress);
  }

  const openUserProfile = () => {
    clerk.openUserProfile();
  };

  const InfoSection = ({ title, value, buttonText = "Edit" }: { title: string; value: string; buttonText?: string }) => (
    <div className="self-stretch flex-col justify-start items-start gap-6 flex">
      <div className="self-stretch flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch justify-center items-center gap-2 inline-flex">
          <div className="grow shrink basis-0 text-[#111111] text-sm md:text-base font-Inter">{title}</div>
          <div className="py-2 rounded-[40px] justify-center items-center gap-2 flex">
            <button onClick={openUserProfile} className="text-[#111111] text-sm md:text-base font-Inter">{buttonText}</button>
          </div>
        </div>
        <div className="self-stretch text-[#585858] text-sm md:text-base font-normal font-Inter">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen px-4 sm:px-[594px] bg-[#f3f3f3] flex justify-center">
      <div className="w-full max-w-[732px] py-12 flex-col justify-start items-start gap-8 md:gap-12">
        <div className="self-stretch flex-col justify-start items-start gap-6 flex">
          <div className="self-stretch py-2 justify-between items-center inline-flex relative">
            <div className="grow shrink basis-0 text-center text-[#111111] text-2xl md:text-[28px] font-Inter">Settings</div>
            <div className="py-2 left-0 top-[8px] absolute rounded-[40px] justify-center items-center gap-2 flex">
              <Link href={'/'} className="text-[#111111] text-sm md:text-base font-Inter flex flex-row items-center">
                <MdArrowBackIosNew /><div className='ml-[5px]'>Back</div>
              </Link>
            </div>
          </div>
          <div className="self-stretch p-1 bg-[#eaeaea] rounded-2xl justify-start items-center inline-flex">
            <div className="grow shrink basis-0 h-[41px] px-4 md:px-14 py-3 bg-white rounded-xl shadow justify-center items-center gap-2 flex">
              <div className="text-[#111111] text-sm font-Inter">Account</div>
            </div>
            <div className="grow shrink basis-0 h-[41px] px-4 md:px-14 py-3 rounded-[32px] justify-center items-center gap-2 flex">
              <div className="text-[#111111] text-sm font-Inter">Subscription</div>
            </div>
          </div>
        </div>

        <div className="self-stretch px-4 mt-[32px] md:mt-[48px] md:px-8 pb-10 bg-white rounded-3xl border border-[#dddddd] flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch pt-6 md:pt-8 pb-4 justify-center items-center gap-2 inline-flex">
            <div className="grow shrink basis-0 text-[#111111] text-xl md:text-2xl font-Inter">Personal Info</div>
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-8 flex">
            <InfoSection title="Full Name" value={user?.fullName ?? "Not Available"} />
            <InfoSection title="Email address" value={user.emailAddresses[0].emailAddress ?? ""} />
            <InfoSection title="Password" value="************" buttonText='Set new password' />
          </div>
        </div>

        <div className="self-stretch px-4 mt-[32px] mb-[32px] md:mt-[48px] md:mb-[48px] md:px-8 pb-10 bg-white rounded-3xl border border-[#dddddd] flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch pt-6 md:pt-8 pb-4 justify-center items-center gap-2 inline-flex">
            <div className="grow shrink basis-0 text-[#111111] text-xl md:text-2xl font-Inter">Manage Account</div>
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-6 flex">
            <div className="self-stretch flex-col justify-start items-start gap-8 flex">
              <div className="self-stretch flex-col justify-start items-start gap-1 flex">
                <div className="self-stretch justify-center items-center gap-2 inline-flex">
                  <div className="grow shrink basis-0 text-[#111111] text-sm md:text-base font-Inter">Delete account</div>
                  <div className="py-2 rounded-[40px] justify-center items-center gap-2 flex">
                    <button onClick={openUserProfile} className="text-[#e0154e] text-sm md:text-base font-Inter">Delete</button>
                  </div>
                </div>
                <div className="self-stretch text-[#585858] text-sm md:text-base font-normal font-Inter">Permanently delete your account and all your data.</div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AccountSettings;