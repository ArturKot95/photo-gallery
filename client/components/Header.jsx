import React from 'react';
import { Toggle } from 'components/ui/Toggle.jsx';

export default function ({ onViewChange }) {
  return (
    <header className="py-5 px-8 sticky top-0 z-20 bg-white">
      <div className="flex items-end justify-center">
        <div className="flex-1 seld-center">
          <h1 className="text-5xl inline-block">Photo Gallery</h1>
          <h2 className="text-xl inline-block ml-1">for Workate</h2>
        </div>
        <Toggle label="Carousel View" onChange={onViewChange} />
      </div>
    </header>
  );
}
