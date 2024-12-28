'use client';

import React from 'react';

// The topnavigation that is displayed horizontally at the top of the screen 
interface TopNavigationProps {
  title: string; // Title of the current page
  onAddNewClick: () => void; // Function to handle "Add New" button click
}

const TopNavigation: React.FC<TopNavigationProps> = ({ title, onAddNewClick }) => {
  return (
    <header className="bg-gradient text-white px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-3xl bg-white text-gray-700 text-sm focus:outline-none focus:ring"
        />
        <button
          onClick={onAddNewClick}
          className="bg-custom-blue px-4 py-2 rounded-3xl text-white text-sm"
        >
          Add New +
        </button>
      </div>
    </header>

    
  );
};

export default TopNavigation;
