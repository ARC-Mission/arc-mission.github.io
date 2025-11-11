import React from 'react';
import type { Page } from '../types';
import { NAV_LINKS } from '../constants';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen, setIsOpen }) => {
  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setIsOpen(false); // Close sidebar on mobile after navigation
  };
  
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-black transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="pt-16 pl-2 space-y-2 text-sm">
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                    className={`flex items-center p-2 rounded-lg transition-colors ${
                      activePage === link.id
                        ? 'bg-neutral-800 text-white'
                        : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                    }`}
                  >
                    <span className="ml-3">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;