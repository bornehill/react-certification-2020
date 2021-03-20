import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import Card from '../card/card';
import { youtube } from "../../repository/youtube-videos-mock";

export default () => {
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
          </div>
        </section>
        <section>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {youtube && youtube.items.filter(i => i.id.videoId).map(video =>
                        <Card key={video.etag} video={video} />
                    )}
          </ul>            
        </section>
      </main>
    </>
  );
};
