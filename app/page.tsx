"use client"

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import StepGuide from './components/StepGuide';
import UpgradePrompt from './components/UpgradePrompt';

const MainComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ steps: any[], title: string, conclusion: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setError(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });
      
      const data = await response.json();

      if (response.status === 403) {
        setError(data.error);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }

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
            <div className="self-stretch text-center text-[#111111] text-2xl md:text-[28px] font-inter">
              Share your goal <br />and get guides to achieve it!
            </div>
            <SearchBar onSearch={handleSearch} />
            {error && (
              <div className="w-full">
                <UpgradePrompt message={error} />
              </div>
            )}
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