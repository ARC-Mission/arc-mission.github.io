import React from 'react';
import { MenuIcon, ArcmLogo } from './Icons';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const marqueeText = "R  E  S  I  L  I  E  N  C  E    R  E  F  E  R  S    T  O    T  H  E    C  A  P  A  C  I  T  Y    T  O    R  E  C  O  V  E  R    F  R  O  M    D  I  F  F  I  C  U  L  T  I  E  S  ,    A  D  A  P  T    T  O    C  H  A  N  G  E  ,    A  N  D    K  E  E  P    M  O  V  I  N  G    F  O  R  W  A  R  D    D  E  S  P  I  T  E    C  H  A  L  L  E  N  G  E  S  .";

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

          {/* Logo - hidden on mobile */}
          <div className="hidden lg:block">
            <ArcmLogo />
          </div>

          {/* Animated Marquee Text */}
          <div className="flex-1 overflow-hidden lg:ml-8">
            <div className="animate-marquee whitespace-nowrap text-lg lg:text-xl text-white font-light">
              <span className="inline-block">{marqueeText}</span>
              <span className="inline-block ml-32">{marqueeText}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;