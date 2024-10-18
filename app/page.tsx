"use client"

import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Footer from './components/Footer';
import 'tailwindcss/tailwind.css'
import StepGuide from './components/StepGuide';

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
    <div className="w-full min-h-screen bg-[#f3f3f3] flex justify-center">
      <div className="w-full max-w-[732px] min-h-screen px-4 md:px-0 pt-12 pb-16 flex flex-col justify-between items-start">
        <Header />
        <div className="self-stretch flex-grow flex flex-col justify-center items-center gap-12 md:gap-14">
          <div className="self-stretch flex-col justify-start items-start gap-10 flex">
            <div className="self-stretch text-center text-[#111111] text-2xl md:text-[28px] font-semibold font-inter">
              Share your goal <br />and get guides to achieve it!
            </div>
            <SearchBar onSearch={handleSearch} />
          </div>
          {result && (
            <div className="self-stretch flex-grow">
              <StepGuide steps={result.steps} title={result.title} conclusion={result.conclusion} />
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainComponent;