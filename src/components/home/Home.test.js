import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import WizeTubeService from '../../services/wize-tube.service';
import WizeTubeProvider from '../../providers/wize-tube.provider';
import Home from './Home';

describe('Test Home Page', () => {
  const selector = {
    btn: 'btn-primary',
  };

  const response = {
    items: [
      {
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
      },
    ],
  };

  beforeEach(() => {
    render(
      <WizeTubeProvider>
        <Router>
          <Home />
        </Router>
      </WizeTubeProvider>
    );
  });

  it('Should create home page', () => {
    const { btn } = selector;

    WizeTubeService.instance.get = jest.fn((url, config) => {
      return response;
    });

    const button = document.querySelector(`.${btn}`);
    expect(button).toBeDefined();
    expect(screen.getByRole('heading')).toBeTruthy();
  });
});
