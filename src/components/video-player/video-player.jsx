import React from 'react';
import './video-player.css';
import ReactPlayer from 'react-player/lazy'

const CustomVideoPlayer = ({ src }) => {
  return (
<div className='video'>
      <ReactPlayer
        url={src}
        className="video"
        controls
        
      />
</div>
  );
};

export default CustomVideoPlayer;