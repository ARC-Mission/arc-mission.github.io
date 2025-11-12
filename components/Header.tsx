import React from 'react';
import { MenuIcon } from './Icons';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const marqueeText = "RESILIENCE REFERS TO THE CAPACITY TO RECOVER FROM DIFFICULTIES, ADAPT TO CHANGE, AND KEEP MOVING FORWARD DESPITE CHALLENGES.";

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-black bg-opacity-80 backdrop-blur-sm border-b border-neutral-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-neutral-400 hover:text-white mr-4"
            aria-label="Open sidebar"
          >
            <MenuIcon className="h-6 w-6" />
          </button>

          {/* Animated Marquee Text */}
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap text-lg lg:text-xl text-white font-light" style={{ letterSpacing: '0.5em' }}>
              <span className="inline-block">{marqueeText}</span>
              <span className="inline-block" style={{ marginLeft: '4rem' }}>{marqueeText}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;