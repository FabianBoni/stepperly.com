import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-[732px] w-full box-border min-h-[103px] opacity-100 z-1 rotate-0 flex flex-col flex-nowrap justify-start items-center gap-6 p-0">
            <div className="max-w-[732px] w-full box-border min-h-[64px] opacity-100 z-0 rotate-0 flex flex-row flex-nowrap justify-start items-center p-2 rounded-[120px] bg-white shadow-[0px_12px_28px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.08)]">
                <div className="w-12 h-12 opacity-100 z-0 rotate-0 rounded-[72px] bg-center bg-contain bg-no-repeat"></div>
                <div className="flex flex-wrap items-center w-full text-xl max-md:max-w-full">
                    <img
                        src="/graphics/search-1.png"
                        alt="Search Icon"
                        className="w-6 h-6 mr-2"
                    />
                    <input
                        type="text"
                        id="searchInput"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="What's your goal?"
                        className="flex-grow bg-transparent border-none outline-none pl-2"
                    />
                </div>
            </div>
            <p className="max-w-[394px] w-full box-border min-h-[15px] opacity-100 z-1 rotate-0 text-center">
                <span className="text-[12px] leading-[12px] font-inter font-normal text-[#595959]">AI can make mistakes. Check important info and use at your own risk.</span>
            </p>
        </form>
    );
};

export default SearchBar;