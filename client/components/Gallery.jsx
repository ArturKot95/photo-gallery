import React, { useState, useEffect } from 'react';

export default function Gallery() {
  const [photosList, setPhotosList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list')
      .then((res) => res.json())
      .then((res) => {
        setPhotosList(res);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <span>Loading...</span>;
  } else {
    return <span>Photos...</span>;
  }
}
