import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWizeTube } from '../../providers/wize-tube.provider';
import WizeTubeService from '../../services/wize-tube.service';
import AuthService from '../../services/auth.service';
import Header from '../common/Header';
import Card from '../card/card';
import { GrChannel } from 'react-icons/gr';
import { FaVoteYea } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { ADD_FAV_VIDEO, REMOVE_FAV_VIDEO } from '../../actions/wize-request';
import { parseFavVideo } from '../../common/tools/parseFavVideo';

const CardView = () => {
  const { authenticated } = AuthService.isAuthenticated();
  const [hover, setHover] = useState(false);
  const [like, setLike] = useState(false);
  const [relVideos, setRelVideos] = useState([]);

  const { state, dispatch, darkMode } = useWizeTube();
  const { videos } = state;

  const [video, setVideo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const founded = videos.items.find((v) => v.id.videoId === id);
    if (founded) {
      setVideo(founded);
      const favVideos = WizeTubeService.getFavVideos();
      const isFav = favVideos
        ? favVideos.find((f) => f.id.videoId === founded.id.videoId)
        : null;
      if (isFav) {
        setLike(true);
      } else {
        setLike(false);
      }
    }

    const related = videos.items.filter((v) => v.id.videoId !== id);
    setRelVideos(related);
  }, [video, id, videos.items]);

  useEffect(() => {
    WizeTubeService.setFavVideos(state.fav);
  }, [state.fav]);

  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

  const onLike = () => {
    if (like) {
      dispatch({ payload: video.id.videoId, type: REMOVE_FAV_VIDEO });
    } else {
      const payload = parseFavVideo(video);
      dispatch({ payload, type: ADD_FAV_VIDEO });
    }

    setLike(!like);
  };

  return (
    <>
      <Header />
      {video.id && (
        <main className={'min-h-screen pt-5 ' + (darkMode ? 'bg-onyx-700' : 'bg-white')}>
          <section className="inline-flex">
            <div className="max-w-4x1 p-10">
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
                    {authenticated && (
                      <IconContext.Provider
                        value={{
                          className:
                            (like
                              ? 'text-flame-500'
                              : hover
                              ? 'text-flame-100'
                              : 'text-onyx-100') + ' cursor-pointer',
                          size: '1.5em',
                        }}
                      >
                        <FaVoteYea
                          onMouseEnter={onHover}
                          onMouseLeave={onLeave}
                          onClick={onLike}
                        />
                      </IconContext.Provider>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-sm p-2">
              <ul>
                {relVideos &&
                  relVideos.length > 0 &&
                  relVideos
                    .filter((i) => i.id.videoId)
                    .map((video) => <Card key={video.etag} video={video} />)}
              </ul>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default CardView;
