"use client"

import React, { useState } from "react";
import axios from 'axios';
import Checkbox from "./components/Checkbox";
// import { IconComponentNode } from "./IconComponentNode";
import { ListItem } from "./components/ListItem";
import { SearchBarDesktop } from "./components/SearchBarDesktop";
import divider from "./divider.svg";
import image from "./image.svg";
import indicator from "./indicator.svg";

interface Step {
  title: string;
  substeps: string[];
}

interface StepperlyResult {
  title: string;
  steps: Step[];
  conclusion: string;
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<StepperlyResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  const handleSearch = async () => {
    setLoading(true)
    try {
      const response = await axios.post('/api/search', { query })
      setResult(response.data)
    } catch (error) {
      console.error('Error:', error)
      setResult(null)
    }
    setLoading(false)
  }

  const toggleStepCompletion = (stepTitle: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev)
      if (newSet.has(stepTitle)) {
        newSet.delete(stepTitle)
      } else {
        newSet.add(stepTitle)
      }
      return newSet
    })
  }

  return (
    <div className="flex flex-col w-[732px] items-start gap-12 pt-0 pb-16 px-0 relative">
      <div className="flex flex-col items-start gap-14 pt-20 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-14 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col items-center justify-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 relative flex-[0_0_auto] bg-[#111111] rounded-[32px]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-[normal]">
                Powered by AI
              </div>
            </div>
            <p className="relative self-stretch [font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-[28px] text-center tracking-[0] leading-[normal]">
              The Google For Step-by-Step Guides
            </p>
          </div>
          <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
            <SearchBarDesktop
              className="!self-stretch !flex-[0_0_auto] !shadow-inputfield !w-full"
              label="What's your goal?"
              searchButton="search-button-2.svg"
              state="default"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              onSearch={handleSearch}
            />
            <p className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-gray-400 text-xs text-center tracking-[0] leading-[normal]">
              AI can make mistakes. Check important info and use at your own risk.
            </p>
          </div>
        </div>
        <img
          className="mb-[-0.50px] relative w-[733px] h-px ml-[-0.50px] mr-[-0.50px] object-cover"
          alt="Divider"
          src={divider}
        />
      </div>
      {result && (
        <div className="relative self-stretch w-full h-[614px]">
          <div className="w-[732px] gap-4 p-2 absolute top-[319px] left-0 rounded-3xl shadow-[0px_12px_28px_#0000000d,0px_4px_8px_#0000000a] flex flex-col items-start bg-[#ffffff]">
            <div className="bg-[#159fe926] shadow-[inset_0px_-4px_20px_#dee9ef] relative self-stretch w-full h-[191px] rounded-2xl overflow-hidden">
              <div className="w-[726px] gap-[7.93px] px-[31.74px] py-[46.61px] relative top-2.5 left-6 rounded-[23.8px] shadow-[0px_11.9px_27.77px_#0000000d,0px_3.97px_7.93px_#0000000a] flex flex-col items-start bg-[#ffffff]">
                <div className="flex-col gap-[31.74px] flex items-start relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative self-stretch mt-[-0.99px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-[19.8px] tracking-[0] leading-[normal]">
                    {result.title}
                  </div>
                  <div className="flex flex-col items-start gap-[23.8px] relative self-stretch w-full flex-[0_0_auto]">
                    {result.steps.map((step, index) => (
                      <ListItem
                        key={index}
                        className="!gap-[11.9px] !flex-[0_0_auto] !w-[662.52px]"
                        divClassName="!mt-[-0.99px] !text-[15.9px] !leading-[22.2px]"
                        icon={
                          completedSteps.has(step.title) 
                            ? <Checkbox className="!relative !w-[23.8px] !h-[23.8px]" />
                            : <IconComponentNode className="!relative !w-[23.8px] !h-[23.8px]" />
                        }
                        rightClassName="!gap-[7.93px] !pt-[0.99px] !pb-0 !px-0"
                        state={completedSteps.has(step.title) ? "completed" : "default"}
                        text={step.title}
                        onClick={() => toggleStepCompletion(step.title)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 pt-4 pb-8 px-6 relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative w-fit mt-[-1.00px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
                Tick off what you've already done.
              </p>
            </div>
          </div>
        </div>
      )}
      <footer className="inline-flex flex-col items-start gap-6 pt-10 pb-0 px-0 relative flex-[0_0_auto] bg-transparent">
        <img
          className="mt-[-0.50px] relative w-[733px] h-px ml-[-0.50px] mr-[-0.50px] object-cover"
          alt="Divider"
          src={image}
        />
        <div className="flex items-start justify-center gap-12 relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-gray-400 text-sm text-center tracking-[0] leading-[normal]">
            © Do Anything, 2024
          </div>
        </div>
      </footer>
    </div>
  );
}