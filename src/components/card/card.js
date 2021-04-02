import React from 'react';
import { GrChannel } from 'react-icons/gr';
import { IconContext } from 'react-icons';

const Card = ({ video, showButton = true }) => {
  return (
    <div className="card card-white">
      <iframe
        className="w-full h-48 rounded-t-sm"
        frameBorder="0"
        title="rick roll"
        src={`https://www.youtube.com/embed/${video.id.videoId}?controls=0&autoplay=1`}
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      />
      <div className="px-4 py-2">
        <p className="text-2xl">{video.snippet.title}</p>
        <p className="font-bold">
          Description: <span className="text-onyx-300">{video.snippet.description}</span>
        </p>
        <div className="flex justify-between">
          <IconContext.Provider value={{ className: 'text-onyx-700 m-1', size: '1em' }}>
            <p className="font-bold flex flex-row items-center">
              Channel: <span className="text-onyx-300">{video.snippet.channelTitle}</span>
              <GrChannel />
            </p>
          </IconContext.Provider>
          <p className="font-bold">
            Content:{' '}
            <span className="text-onyx-300">{video.snippet.liveBroadcastContent}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
