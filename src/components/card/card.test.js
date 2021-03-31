import React from 'react';
import { render } from '@testing-library/react';
import Card from './card';

describe('Test Card component', () => {
  const selector = {
    frm: 'w-full',
    title2x1: 'text-2xl',
  };

  const video = {
    etag: 'erqeM78PZDWIBe8qOGHGM2WdSE8',
    id: {
      videoId: 'nmXMgqjQzls',
    },
    snippet: {
      title: 'Video Tour | Welcome to Wizeline Guadalajara',
      description:
        'Follow Hector Padilla, Wizeline Director of Engineering, for a lively tour of our office. In 2018, Wizeline opened its stunning new office in Guadalajara, Jalisco, ...',
      channelTitle: 'Wizeline',
      liveBroadcastContent: 'none',
    },
  };

  it('Sould be create card', () => {
    render(<Card video={video} />);

    const { frm, title2x1 } = selector;

    const frameVideo = document.querySelector(`.${frm}`);
    const titleVideo = document.querySelector(`.${title2x1}`);

    expect(frameVideo).toBeDefined();
    expect(titleVideo).toBeDefined();
  });
});
