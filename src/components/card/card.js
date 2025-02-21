import React from 'react';
import { Link } from 'react-router-dom';
import { GrChannel } from 'react-icons/gr';
import { IconContext } from 'react-icons';
import { useWizeTube } from '../../providers/wize-tube.provider';

const Card = ({ video, showButton = true }) => {
  const { darkMode } = useWizeTube();

  return (
    <div className={'card ' + (darkMode ? 'card-dark' : 'card-white')}>
      <iframe
        className="w-full h-48 rounded-t-sm"
        frameBorder="0"
        title="rick roll"
        src={`https://www.youtube.com/embed/${video.id.videoId}?controls=0`}
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      />
      <div className="px-4 py-2">
        <Link to={{ pathname: `/video/${video.id.videoId}` }} className="text-2xl">
          {video.snippet.title}
        </Link>
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
