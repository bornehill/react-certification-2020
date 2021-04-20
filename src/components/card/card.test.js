import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import WizeTubeProvider from '../../providers/wize-tube.provider';
import Header from '../common/Header';
import Card from './card';

describe('Test Card component', () => {
  const selector = {
    frm: 'w-full',
    title2x1: 'text-2xl',
    tg: 'toggle-checkbox',
    dark: 'card-dark',
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
    render(
      <Router>
        <Card video={video} />
      </Router>
    );

    const { frm, title2x1 } = selector;

    const frameVideo = document.querySelector(`.${frm}`);
    const titleVideo = document.querySelector(`.${title2x1}`);

    expect(frameVideo).toBeDefined();
    expect(titleVideo).toBeDefined();
  });

  it('Sould be dark mode', () => {
    render(
      <WizeTubeProvider>
        <Router>
          <Header />
          <Card video={video} />
        </Router>
      </WizeTubeProvider>
    );

    const { tg, dark } = selector;

    const toggle = document.querySelector(`.${tg}`);
    fireEvent.click(toggle);

    const darkCard = document.querySelector(`.${dark}`);
    expect(darkCard).toBeDefined();
  });
});
