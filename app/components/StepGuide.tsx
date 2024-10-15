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
        <div className="w-[732px] h-[614px] opacity-100 z-1 rotate-0">
            <div className="w-[732px] min-h-[295px] top-[319px] left-0 opacity-100 z-0 rotate-0 flex flex-col flex-nowrap justify-start items-start gap-4 p-2 rounded-3xl bg-white shadow-[0px_12px_28px_0px_rgba(0,0,0,0.05),0px_4px_8px_0px_rgba(0,0,0,0.04)]">
                <div className="w-[716px] h-[191px] opacity-100 z-0 rotate-0 overflow-hidden rounded-2xl bg-[#159fea26] shadow-[inset_0px_-4px_20px_0px_rgba(222,233,239,1)]">
                    <div className="w-[726px] min-h-[220.38px] top-[10px] left-[24px] opacity-100 z-0 rotate-0 flex flex-col flex-nowrap justify-start items-start gap-[7.93px] p-[46px_31px] rounded-[23.8px] bg-white shadow-[0px_11.9px_27.77px_0px_rgba(0,0,0,0.05),0px_3.97px_7.93px_0px_rgba(0,0,0,0.04)]">
                        <div className="max-w-[662.52px] w-full box-border min-h-[127.15px] opacity-100 z-0 rotate-0 flex flex-col flex-nowrap justify-start items-start gap-[31.74px] p-0">
                            <div className="max-w-[662.52px] w-full box-border min-h-[24px] opacity-100 z-0 rotate-0 text-left">
                                <span className="text-[19.84px] leading-[19.84px] font-inter font-semibold text-[#111111] whitespace-pre-wrap">{title}</span>
                            </div>
                            <div className="max-w-[662.52px] w-full box-border min-h-[71.41px] opacity-100 z-1 rotate-0 flex flex-col flex-nowrap justify-start items-start gap-[23.8px] p-0">
                                {steps.map((step, index) => (
                                    <div key={index} className="w-[662.52px] min-h-[23.8px] opacity-100 z-0 rotate-0 flex flex-row flex-nowrap justify-start items-start gap-[11.9px] p-0">
                                        <div className="w-[23.8px] h-[23.8px] opacity-100 z-0 rotate-0 bg-center bg-contain bg-no-repeat"></div>
                                        <div className="max-w-[626.82px] w-full box-border min-h-[22.99px] opacity-100 z-1 rotate-0 flex flex-row flex-nowrap justify-start items-start gap-[7.93px] p-0">
                                            <div className="max-w-[626.82px] w-full box-border min-h-[22px] opacity-100 z-0 rotate-0 text-left">
                                                <span className="text-[15.87px] leading-[22.22px] font-inter font-normal text-[#111111] whitespace-pre-wrap">{step.title}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-[716px] w-full box-border min-h-[72px] opacity-100 z-1 rotate-0 flex flex-row flex-nowrap justify-center items-center gap-2 py-4 px-0">
                    <p className="max-w-[332px] w-full box-border min-h-[24px] opacity-100 z-0 rotate-0 text-center">
                        <span className="text-[20px] leading-[20px] font-inter font-semibold text-[#111111]">Tick off what you've already done.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StepGuide;