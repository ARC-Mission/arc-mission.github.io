import React from 'react';
import { SearchIcon, MenuIcon, ArcmLogo } from './Icons';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-black bg-opacity-80 backdrop-blur-sm border-b border-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-neutral-400 hover:text-white mr-4"
              aria-label="Open sidebar"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <ArcmLogo />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;