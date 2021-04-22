import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import Card from '../card/card';
import WizeTubeService from '../../services/wize-tube.service';
import { useWizeTube } from '../../providers/wize-tube.provider';

export default () => {
  const { state, darkMode } = useWizeTube();
  const { videos } = state;
  const [youtube, setYoutube] = useState([]);

  useEffect(() => {
    const mock = WizeTubeService.getFavVideos();
    setYoutube(mock);
  }, [videos]);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section
          className={darkMode ? 'bg-white text-onyx-700' : 'bg-onyx-700 text-white'}
        >
          <div className="max-w-screen-xl mx-auto p-4">
            <h1 className="font-emphasis font-thin text-3xl">
              Now you can watch your favorite videos again!.
            </h1>
          </div>
        </section>
        <section className={'pt-5 ' + (darkMode ? 'bg-onyx-700' : 'bg-white')}>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtube &&
              youtube.length > 0 &&
              youtube
                .filter((i) => i.id.videoId)
                .map((video) => <Card key={video.etag} video={video} />)}
          </ul>
        </section>
      </main>
    </>
  );
};
