import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import WizeTubeService from '../../services/wize-tube.service';
import WizeTubeProvider from '../../providers/wize-tube.provider';
import { Home } from './Home';

describe('Test Home Page', () => {
  const selector = {
    btn: 'btn-primary',
  };

  const response = {
    items: [
      {
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

  const original = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = original;
  });

  it('Should create home page', async () => {
    const { btn } = selector;

    const promise = Promise.resolve({ data: response });

    WizeTubeService.instance.get = jest.fn((url, config) => {
      return promise;
    });

    render(
      <WizeTubeProvider>
        <Router>
          <Home />
        </Router>
      </WizeTubeProvider>
    );

    const button = document.querySelector(`.${btn}`);

    expect(button).toBeDefined();
    expect(screen.getByRole('heading')).toBeTruthy();

    await act(() => promise);
  });

  it('Should catch service exception', async () => {
    const promise = Promise.reject('service error');

    WizeTubeService.instance.get = jest.fn((url, config) => {
      return promise;
    });

    render(
      <WizeTubeProvider>
        <Router>
          <Home />
        </Router>
      </WizeTubeProvider>
    );

    await act(() => {
      try {
        promise;
      } catch {}
    });

    expect(console.error).toBeCalled();
  });
});
