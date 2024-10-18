import React from 'react';

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
        <div className="w-full h-52 px-8 py-10 bg-white rounded-3xl border border-[#dddddd] flex-col justify-start items-start gap-2 inline-flex relative">
            <div className="self-stretch h-32 flex-col justify-start items-start gap-8 flex">
                <div className="self-stretch text-[#111111] text-xl font-semibold font-inter">{title}</div>
                <div className="self-stretch h-[72px] flex-col justify-start items-start gap-6 flex">
                    {steps.map((step, index) => (
                        <div key={index} className="self-stretch justify-start items-start gap-3 inline-flex">
                            <div className="w-6 h-6 relative">
                                <div className="w-6 h-6 left-0 top-0 absolute rounded-full border border-[#dddddd]" />
                            </div>
                            <div className="grow shrink basis-0 h-[23px] pt-px justify-start items-start gap-2 flex">
                                <div className="grow shrink basis-0 text-[#111111] text-base font-medium font-inter leading-snug">{step.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2 left-[32px] top-[-16px] absolute bg-[#111111] rounded-xl justify-center items-center gap-2 inline-flex">
                <div className="text-white text-sm font-semibold font-inter">Step 1</div>
            </div>
        </div>
    );
};

export default StepGuide;