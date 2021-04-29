import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { BsSearch } from 'react-icons/bs';
import Header from '../common/Header';
import Card from '../card/card';
import WizeTubeService from '../../services/wize-tube.service';
import { useWizeTube } from '../../providers/wize-tube.provider';
import { GET_VIDEOS_SUCCESS } from '../../actions/wize-request';

export const Home = React.memo(function Home() {
  const { state, dispatch, darkMode } = useWizeTube();
  const { videos } = state;
  const [search, setSearch] = useState('');

  const onTypeSearch = (text) => {
    setSearch(text.target.value);
  };

  const onSearch = (name) => {
    if (!search) {
      return;
    }

    WizeTubeService.getVideos(search)
      .then(({ data }) => {
        dispatch({
          payload: data,
          type: GET_VIDEOS_SUCCESS,
        });
      })
      .catch((err) => {
        console.error('service error: ', err);
      });
  };

  useEffect(() => {
    if (videos.items.length) {
      return;
    }

    WizeTubeService.getVideos('metallica')
      .then(({ data }) => {
        dispatch({
          payload: data,
          type: GET_VIDEOS_SUCCESS,
        });
      })
      .catch((err) => {
        console.error('service error: ', err);
      });
  }, [videos, dispatch]);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section
          className={darkMode ? 'bg-white text-onyx-700' : 'bg-onyx-700 text-white'}
        >
          <div className="max-w-screen-xl mx-auto p-4">
            <h1 className="font-emphasis font-thin text-3xl">
              The site where you can spend your free time.
            </h1>
            <div>
              <Link to="/" className="btn btn-primary my-4 inline-block">
                Explore videos
              </Link>
              <input
                className="text-black"
                id="search-video"
                placeholder="Search"
                onChange={onTypeSearch}
              />
              <IconContext.Provider
                value={{
                  className: 'm-1 inline text-flame-700',
                  size: '1.6em',
                }}
              >
                <BsSearch onClick={onSearch} />
              </IconContext.Provider>
            </div>
          </div>
        </section>
        <section className={'pt-5 ' + (darkMode ? 'bg-onyx-700' : 'bg-white')}>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos &&
              videos.items
                .filter((i) => i.id.videoId)
                .map((video) => <Card key={video.id.videoId} video={video} />)}
          </ul>
        </section>
      </main>
    </>
  );
});
