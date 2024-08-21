import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Search tasks..."
        className="p-3 border border-gray-300 rounded w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none pl-10"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-3 top-3" />
    </div>
  );
};

export default SearchBar;
