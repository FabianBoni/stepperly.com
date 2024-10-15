"use client"

import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FeatureCard from './components/FeatureCard';
import StepGuide from './components/StepGuide';
import Footer from './components/Footer';
import 'tailwindcss/tailwind.css'

const MainComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ steps: any[], title: string, conclusion: string } | null>(null);

  const features = [
    {
      title: "Loose 20 pounds",
      description: "Search for any goal or task.",
      imageUrl: "/graphics/image-2.png",
      bgColor: "bg-pink-600 bg-opacity-10"
    },
    {
      title: "Get step-by-step guides.",
      description: "Get step-by-step guides.",
      imageUrl: "/graphics/image-1.png",
      bgColor: "bg-blue-600 bg-opacity-10"
    },
    {
      title: "Get step-by-step guides.",
      description: "Get step-by-step guides.",
      imageUrl: "/graphics/image-3.png",
      bgColor: "bg-blue-600 bg-opacity-10"
    },
  ];

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
    <div className="relative max-w-[1920px] mx-auto p-0 box-border">
      <div className="max-w-[1920px] w-full box-border min-h-[1241px] opacity-100 z-[1] rotate-0 overflow-hidden flex flex-row flex-nowrap justify-start items-center gap-2 px-[594px] py-0 bg-[#f3f3f3]">
        <div className="w-[732px] min-h-[1241px] opacity-100 z-0 rotate-0 flex flex-col flex-nowrap justify-start items-start gap-12 pb-16">
          <Header />
          <SearchBar onSearch={handleSearch} />
          <div className="w-[732px] min-h-[295px] top-0 left-0 opacity-100 z-[1] rotate-0">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <FeatureCard {...features[0]} />
              <FeatureCard {...features[1]} />
            </div>
            <div className="grid grid-cols-1">
              <FeatureCard {...features[2]} />
            </div>
          </div>
          {result && <StepGuide steps={result.steps} title={result.title} conclusion={result.conclusion} />}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;