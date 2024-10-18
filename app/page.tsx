"use client"

import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import 'tailwindcss/tailwind.css'
import Header from './components/Header';

const MainComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ steps: any[], title: string, conclusion: string } | null>(null);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult(null);
    }
  };

  return (
    <div className="w-[1920px] h-[1080px] relative bg-[#f3f3f3]">
      <div className="w-[732px] h-[1080px] pt-12 pb-16 left-[595px] top-0 absolute flex-col justify-between items-start inline-flex">
        <Header />
        <div className="self-stretch h-[325px] pb-20 flex-col justify-start items-start gap-14 flex">
          <div className="self-stretch h-[245px] pt-8 flex-col justify-start items-start gap-10 flex">
            <div className="self-stretch h-[68px] flex-col justify-center items-center gap-6 flex">
              <div className="self-stretch text-center text-[#111111] text-[28px] font-semibold font-inter">Share your goal <br/>and get guides to achieve it!</div>
            </div>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        {result && (
          <div className="self-stretch flex-grow">
            {/* Add your StepGuide component here */}
          </div>
        )}
        <div className="w-full pt-10 flex-col justify-start items-start gap-6 flex">
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="text-center text-[#585858] text-sm font-normal font-inter">© 2024 Stepperly. All rights reserved.</div>
            <div className="justify-end items-center gap-6 flex">
              <div className="text-center text-[#111111] text-sm font-normal font-inter">Terms of Service</div>
              <div className="text-center text-[#111111] text-sm font-normal font-inter">Privacy Policy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;