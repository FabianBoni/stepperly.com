import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { MdArrowForwardIos } from "react-icons/md";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    useUser,
    useClerk
} from '@clerk/nextjs';
import { useClickOutside } from '../hooks/useClickOutside';
import Link from 'next/link';

const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        },
        mode: 'same-origin'
    });

    if (response.ok) {
        window.location.href = response.url;
    }
};

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useUser();
    const { signOut } = useClerk();
    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(menuRef, () => setIsMenuOpen(false));

    return (
        <div className="self-stretch h-[50px] mb-[32px] flex-col justify-start items-start gap-6 flex font-inter">
            <div className="self-stretch h-[50px] py-2 justify-between items-center inline-flex">
                <div className="p-2 rounded-[40px] justify-center items-center gap-1 inline-flex">
                    <div className="text-[#111111] text-base font-medium">
                        <SignedOut>
                            <div className='flex flex-row items-center'>
                                <div className="w-3.5 h-3.5 relative mr-[5px]">
                                    <Image src="/icons/star.svg" width={100} height={100} alt="star icon" />
                                </div>
                                <div>Stepperly</div>
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <div className="h-[35px] px-6 py-2 bg-[#111111] rounded-[40px] justify-center items-center gap-2 inline-flex">
                                <form onSubmit={handleCheckout}>
                                    <input type="hidden" name="priceId" value="price_1QDBkXHmVldeJPIKWaaqdBON" />
                                    <button type="submit" className="text-white text-base font-Inter">
                                        Upgrade to Pro
                                    </button>
                                </form>
                            </div>
                        </SignedIn>
                    </div>
                </div>
                <div className="justify-start items-center gap-1 inline-flex">
                    <div className="text-right text-[#585858] text-base">
                        <SignedOut>
                            <div className='flex flex-row items-center'>
                                <SignInButton />
                                <div className="w-4 h-4 ml-[5px] text-[#585858]">
                                    <MdArrowForwardIos />
                                </div>
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center"
                                >
                                    <Image
                                        src={user?.imageUrl || '/default-profile-image.png'}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full"
                                    />
                                </button>

                                {isMenuOpen && (
                                    <div ref={menuRef} className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                                        <div className="px-4 py-2">
                                            <div className="font-medium text-gray-900">
                                                {user?.fullName}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {user?.primaryEmailAddress?.emailAddress}
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <Link href={'/account'}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            Settings
                                        </Link>
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Header;