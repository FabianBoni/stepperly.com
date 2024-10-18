import React from 'react';
import { FaCheck } from "react-icons/fa6";

interface Step {
    title: string;
    substeps: string[];
}

interface StepGuideProps {
    steps: Step[];
    title: string;
    conclusion: string;
}

const StepGuide: React.FC<StepGuideProps> = ({ steps, title, conclusion }) => {
    return (
        <div className="w-full flex-col justify-start items-start gap-6 inline-flex">
            {steps.map((step, index) => (
                <div key={index} className="w-full px-8 py-10 bg-white rounded-3xl border border-[#dddddd] flex-col justify-start items-start gap-2 inline-flex relative">
                    <div className="self-stretch flex-col justify-start items-start gap-8 flex">
                        <div className="self-stretch justify-start items-start gap-3 inline-flex">
                            <div className="grow shrink basis-0 pt-px justify-start items-start gap-2 flex">
                                <div className="grow shrink basis-0 text-[#111111] text-xl font-semibold font-inter leading-snug">{step.title}</div>
                            </div>
                        </div>
                        <div className="self-stretch flex-col justify-start items-start gap-3 flex">
                            {step.substeps.map((substep, subIndex) => (
                                <div key={subIndex} className="self-stretch justify-start items-start gap-3 inline-flex ml-8">
                            <div className="w-6 h-6 relative">
                                <div className="w-6 h-6 left-0 top-0 absolute rounded-full border border-[#dddddd] flex flex-row items-center justify-center"><FaCheck className='text-[#dddddd] text-sm' /></div>
                            </div>
                                    <div className="grow shrink basis-0 pt-px justify-start items-start gap-2 flex">
                                        <div className="grow shrink basis-0 text-[#111111] text-sm font-normal font-inter leading-snug">{substep.replace(/^-\s*/, '')}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="px-3 py-2 left-[32px] top-[-16px] absolute bg-[#111111] rounded-xl justify-center items-center gap-2 inline-flex">
                        <div className="text-white text-sm font-semibold font-inter">Step {index + 1}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StepGuide;