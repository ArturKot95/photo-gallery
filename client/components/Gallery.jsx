import React, { useState, useEffect } from 'react';

const Photo = ({ id, download_url, sourceUrl, author }) => (
  <div key={id} className="p-2 md:w-1/2 lg:w-1/3 sm:w-1/2">
    <div className="relative p-2 overflow-hidden rounded">
      <a href={download_url} target="_blank">
        <img
          src={sourceUrl}
          alt="photo"
          className="w-full h-[500px] object-cover object-center rounded shadow-xl"
        />
      </a>
      <div className="text-center text-gray-600">{author}</div>
    </div>
  </div>
);

export default function Gallery({ view }) {
  const [photosList, setPhotosList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shown, setShown] = useState(3);

  const Grid = () => {
    return (
      <>
        <div className={`flex flex-wrap items-center py-3 px-4`}>
          {photosList.slice(0, shown).map((photo) => (
            <Photo key={photo.id} {...photo} />
          ))}
          {shown < photosList.length && (
            <button
              className="text-2xl my-5 bg-gray-100 rounded-xl py-3 px-5 mx-auto hover:bg-gray-200"
              onClick={loadMore}
            >
              Load more
            </button>
          )}
        </div>
      </>
    );
  };

  const Carousel = () => {
    return (
      <>
        <div className={`flex flex-wrap items-center py-3 px-4`}>
          {photosList.slice(shown - 3, shown).map((photo) => (
            <Photo key={photo.id} {...photo} />
          ))}
          {shown > 3 && (
            <button
              className="text-2xl my-5 bg-gray-100 rounded-xl py-3 px-5 mx-auto hover:bg-gray-200"
              onClick={() => setShown(shown - 3 >= 3 ? shown - 3 : 3)}
            >
              Back
            </button>
          )}
          {shown < photosList.length && (
            <button
              className="text-2xl my-5 bg-gray-100 rounded-xl py-3 px-5 mx-auto hover:bg-gray-200"
              onClick={loadMore}
            >
              Next
            </button>
          )}
        </div>
      </>
    );
  };

  const loadMore = () => {
    setShown(
      shown + 3 > photosList.length
        ? shown + (photosList.length - shown)
        : shown + 3
    );
  };

  useEffect(() => {
    fetch('https://picsum.photos/v2/list')
      .then((res) => res.json())
      .then((list) => {
        return list.map((photo) => {
          const slug = photo.url.split('/').pop();
          return {
            ...photo,
            sourceUrl: `http://source.unsplash.com/${slug}`,
          };
        });
      })
      .then((list) => setPhotosList(list))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <span>Loading...</span>;
  } else {
    return view ? <Carousel /> : <Grid />;
  }
}
