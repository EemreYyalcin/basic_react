import React from 'react';

const VideoDetail = ({video}) => {
    if (!video) {
        return <div>Loading ...</div>;
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}` + '?autoplay=1&mute=1';
    return (
        <div>
            <div className='ui embed'>
                <iframe id="videoXX" src={videoSrc} allowFullScreen title='Video player'  width="640" height="360"/>
            </div>
            <div className='ui segment'>
                <h4 className='ui header'>{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
            </div>
        </div>

    )
};

export default VideoDetail;