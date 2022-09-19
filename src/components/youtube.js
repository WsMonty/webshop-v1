import React from 'react';

const Youtube = ({ url }) => {
  const id = url.replace(/https:\/\/www.youtube.com\/watch\?v=/, '');

  return (
    <div className="youtube_container">
      <iframe
        className="youtube"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Youtube;
