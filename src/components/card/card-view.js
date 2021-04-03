import React, { useState } from 'react';
import { GrChannel } from 'react-icons/gr';
import { IconContext } from 'react-icons';
import Header from '../common/Header';

const CardView = (props) => {
  const [video, setVideo] = useState(props.location.query?.video);

  return (
    <>
      <Header />
      <main>
        <section className="max-w-screen-xl mx-auto">
          <div className="max-w-lg mx-auto">
            <div className="card card-white">
              <iframe
                className="w-full h-64 rounded-t-sm"
                frameBorder="0"
                title="rick roll"
                src={`https://www.youtube.com/embed/${video.id.videoId}?controls=0&autoplay=1`}
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              />
              <div className="px-4 py-2 text-justify">
                <p className="text-2xl">{video.snippet.title}</p>
                <p className="font-bold">
                  Description:{' '}
                  <span className="text-onyx-300">{video.snippet.description}</span>
                </p>
                <div className="flex justify-between">
                  <IconContext.Provider
                    value={{ className: 'text-onyx-700 m-1', size: '1em' }}
                  >
                    <p className="font-bold flex flex-row items-center">
                      Channel:{' '}
                      <span className="text-onyx-300">{video.snippet.channelTitle}</span>
                      <GrChannel />
                    </p>
                  </IconContext.Provider>
                  <p className="font-bold">
                    Content:{' '}
                    <span className="text-onyx-300">
                      {video.snippet.liveBroadcastContent}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CardView;
