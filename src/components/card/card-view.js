import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWizeTube } from '../../providers/wize-tube.provider';
import { GrChannel } from 'react-icons/gr';
import { IconContext } from 'react-icons';
import Header from '../common/Header';

const CardView = () => {
  const { state, darkMode } = useWizeTube();
  const { videos } = state;

  const [video, setVideo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const founded = videos.items.find((v) => v.id.videoId === id);
    if (founded) {
      setVideo(founded);
    }
  }, [video]);

  return (
    <>
      <Header />
      {video.id && (
        <main className={'min-h-screen pt-5 ' + (darkMode ? 'bg-onyx-700' : 'bg-white')}>
          <section className="max-w-screen-xl mx-auto">
            <div className="max-w-lg mx-auto">
              <div className={'card ' + (darkMode ? 'card-dark' : 'card-white')}>
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
                        <span className="text-onyx-300">
                          {video.snippet.channelTitle}
                        </span>
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
      )}
    </>
  );
};

export default CardView;
