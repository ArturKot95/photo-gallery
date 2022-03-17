import React, { useState } from 'react';
import Header from 'components/Header.jsx';
import Gallery from 'components/Gallery.jsx';

export default function () {
  const [view, setView] = useState(false);

  return (
    <>
      <Header onViewChange={(v) => setView(v)} />
      <Gallery view={view} />
    </>
  );
}
