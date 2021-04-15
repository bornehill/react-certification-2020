import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactRouter from 'react-router';
import { render } from '@testing-library/react';
import * as hook from '../../providers/wize-tube.provider';
import CardView from './card-view';

describe('Test Card View component', () => {
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

  it('Should Card View created succesfully', () => {
    jest.spyOn(hook, 'useWizeTube').mockImplementation(() => ({
      state: { videos: { items: [video] } },
      darkMode: false,
    }));

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: 'nmXMgqjQzls' });

    render(
      <Router>
        <CardView />
      </Router>
    );
  });
});
