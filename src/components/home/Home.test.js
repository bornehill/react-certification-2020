import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Test Home Page', () => {
  const selector = {
    btn: 'btn-primary',
  };

  beforeEach(() => {
    render(
      <Router>
        <Home />
      </Router>
    );
  });

  it('Should create home page', () => {
    const { btn } = selector;

    const button = document.querySelector(`.${btn}`);
    expect(button).toBeDefined();
    expect(screen.getByRole('heading')).toBeTruthy();
  });
});
