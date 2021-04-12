import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import Card from '../card/card';
import WizeTubeService from '../../services/wize-tube.service';
import { useWizeTube } from '../../providers/wize-tube.provider';
import { GET_VIDEOS_SUCCESS } from '../../actions/wize-request';

export default () => {
  const { state, dispatch } = useWizeTube();
  const { videos } = state;
  const [youtube, setYoutube] = useState(videos);

  const onSearch = (name) => {
    if (!name.target.value) {
      setYoutube(videos);
      return;
    }

    const filterVideos = youtube.items.filter((v) =>
      v.snippet.title.includes(name.target.value)
    );
    setYoutube({ items: [...filterVideos] });
  };

  useEffect(() => {
    WizeTubeService.getVideos()
      .then(({ data }) => {
        dispatch({
          payload: data,
          type: GET_VIDEOS_SUCCESS,
        });
        setYoutube(data);
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }, [videos]);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-onyx-700 text-white mb-5">
          <div className="max-w-screen-xl mx-auto p-4">
            <h1 className="font-emphasis font-thin text-3xl">
              The site where you can spend your free time.
            </h1>
            <Link to="/centres" className="btn btn-primary my-4 inline-block">
              Explore videos
            </Link>
            <input
              className="text-black"
              id="search-video"
              placeholder="Search"
              onChange={onSearch}
            />
          </div>
        </section>
        <section>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtube &&
              youtube.items
                .filter((i) => i.id.videoId)
                .map((video) => <Card key={video.etag} video={video} />)}
          </ul>
        </section>
      </main>
    </>
  );
};
