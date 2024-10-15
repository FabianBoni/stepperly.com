import React from 'react';
import Image from 'next/image';

interface FeatureCardProps {
    title: string;
    description: string;
    imageUrl: string;
    bgColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageUrl, bgColor }) => {
    return (
        <div className="w-full box-border min-h-[295px] opacity-100 z-0 rotate-0 flex flex-col flex-nowrap justify-start items-start gap-4 p-2 rounded-3xl bg-white shadow-[0px_12px_28px_0px_rgba(0,0,0,0.05),0px_4px_8px_0px_rgba(0,0,0,0.04)]">
            <div className={`w-full h-[191px] relative opacity-100 z-0 rotate-0 overflow-hidden rounded-2xl ${bgColor} shadow-[inset_0px_-4px_20px_0px_rgba(248,230,236,1)]`}>
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    objectFit="contain"
                    className="absolute inset-0"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-[176px] w-full box-border min-h-[33px] opacity-100 z-10 rotate-0 text-center">
                    </div>
                </div>
            </div>
            <div className="w-full box-border min-h-[72px] opacity-100 z-1 rotate-0 flex flex-row flex-nowrap justify-center items-center gap-2 py-4 px-0">
                <div className="max-full w-full box-border min-h-[24px] opacity-100 z-0 rotate-0 text-center">
                    <span className="text-[20px] text-center leading-[20px] font-inter font-semibold text-[#111111]">{description}</span>
                </div>
            </div>
        </div>
    );
};
export default FeatureCard;