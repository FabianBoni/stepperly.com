"use client"

import React from 'react';
import Footer from '../components/Footer';
import { useUser, useClerk } from "@clerk/nextjs";

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
    <div className="self-stretch h-[82px] flex-col justify-start items-start gap-6 flex">
      <div className="self-stretch h-[58px] flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch justify-center items-center gap-2 inline-flex">
          <div className="grow shrink basis-0 text-[#111111] text-base  font-Inter">{title}</div>
          <div className="py-2 rounded-[40px] justify-center items-center gap-2 flex">
            <button onClick={openUserProfile} className="text-[#111111] text-base  font-Inter">{buttonText}</button>
          </div>
        </div>
        <div className="self-stretch text-[#585858] text-base font-normal font-Inter">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="w-[1920px] h-[1114px] px-[594px] bg-[#f3f3f3] justify-start items-center gap-2 inline-flex">
      <div className="w-[732px] h-[1114px] pt-12 pb-16 flex-col justify-start items-start gap-12 inline-flex">
        <div className="self-stretch h-[123px] flex-col justify-start items-start gap-6 flex">
          <div className="self-stretch py-2 justify-between items-center inline-flex">
            <div className="grow shrink basis-0 text-center text-[#111111] text-[28px]  font-Inter">Settings</div>
            <div className="py-2 left-0 top-[8px] absolute rounded-[40px] justify-center items-center gap-2 flex">
              <div className="w-4 h-4 relative" />
              <div className="text-[#111111] text-base  font-Inter">Back</div>
            </div>
          </div>
          <div className="self-stretch p-1 bg-[#eaeaea] rounded-2xl justify-start items-center inline-flex">
            <div className="grow shrink basis-0 h-[41px] px-14 py-3 bg-white rounded-xl shadow justify-center items-center gap-2 flex">
              <div className="text-[#111111] text-sm  font-Inter">Account</div>
            </div>
            <div className="grow shrink basis-0 h-[41px] px-14 py-3 rounded-[32px] justify-center items-center gap-2 flex">
              <div className="text-[#111111] text-sm  font-Inter">Subscription</div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[435px] px-8 pb-10 bg-white rounded-3xl border border-[#dddddd] flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch pt-8 pb-4 justify-center items-center gap-2 inline-flex">
            <div className="grow shrink basis-0 text-[#111111] text-2xl  font-Inter">Personal Info</div>
          </div>
          <div className="self-stretch h-[310px] flex-col justify-start items-start gap-8 flex">
            <InfoSection title="Full Name" value={user?.fullName ?? "Not Available"} />
            <InfoSection title="Email address" value={user.emailAddresses[0].emailAddress ?? ""} />
            <InfoSection title="Password" value="************" buttonText='Set new password' />
          </div>
        </div>
        <div className="self-stretch h-[215px] px-8 pb-10 bg-white rounded-3xl border border-[#dddddd] flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch pt-8 pb-4 justify-center items-center gap-2 inline-flex">
            <div className="grow shrink basis-0 text-[#111111] text-2xl  font-Inter">Manage Account</div>
          </div>
          <div className="self-stretch h-[90px] flex-col justify-start items-start gap-6 flex">
            <div className="self-stretch h-[90px] flex-col justify-start items-start gap-8 flex">
              <div className="self-stretch h-[58px] flex-col justify-start items-start gap-1 flex">
                <div className="self-stretch justify-center items-center gap-2 inline-flex">
                  <div className="grow shrink basis-0 text-[#111111] text-base  font-Inter">Delete account</div>
                  <div className="py-2 rounded-[40px] justify-center items-center gap-2 flex">
                    <button onClick={openUserProfile} className="text-[#e0154e] text-base  font-Inter">Delete</button>
                  </div>
                </div>
                <div className="self-stretch text-[#585858] text-base font-normal font-Inter">Permanently delete your account and all your data.</div>
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