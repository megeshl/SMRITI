import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Botanical Memory Tree / Neural Branching Emblem */}
      <div
        className={`${iconSizes[size]} rounded-2xl bg-gradient-to-br from-[#167D83] to-[#075B60] flex items-center justify-center text-white shadow-sm ring-1 ring-[#167D83]/20 shrink-0`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="w-3/5 h-3/5 text-[#E5EFE7]"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Central Trunk */}
          <path d="M16 28V14" />
          {/* Left Branch & Foliage Node */}
          <path d="M16 20C12 18 8 16 7 11C11 10 14 13 16 16" />
          {/* Right Branch & Foliage Node */}
          <path d="M16 18C20 16 24 14 25 9C21 8 18 11 16 14" />
          {/* Top Crown Bud */}
          <circle cx="16" cy="8" r="3" fill="#DDF5EB" stroke="#167D83" strokeWidth="1.5" />
          {/* Left Leaflet */}
          <circle cx="7" cy="11" r="2" fill="#DDF5EB" stroke="#167D83" strokeWidth="1.2" />
          {/* Right Leaflet */}
          <circle cx="25" cy="9" r="2" fill="#DDF5EB" stroke="#167D83" strokeWidth="1.2" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-serif tracking-wider text-[#17324D] font-bold ${textSizes[size]} leading-none`}
        >
          SMRITI
        </span>
        {showTagline && (
          <span className="text-xs text-[#617386] tracking-wide mt-1">
            Personal Cognitive Care
          </span>
        )}
      </div>
    </div>
  );
};
