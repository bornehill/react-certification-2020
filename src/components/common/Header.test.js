import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import Header from './Header';
import WizeTubeProvider from '../../providers/wize-tube.provider';
import jwt from 'jsonwebtoken';

describe('Test Header component', () => {
  const selector = {
    btn: 'btn-primary',
    menu: 'side-menu',
    tg: 'toggle-checkbox',
  };

  it('Sould be create header', () => {
    const { btn, tg } = selector;

    render(
      <WizeTubeProvider>
        <Router>
          <Header />
        </Router>
      </WizeTubeProvider>
    );

    const loginBtn = document.querySelector(`.${btn}`);
    const toggle = document.querySelector(`.${tg}`);

    expect(loginBtn).toBeDefined();
    expect(toggle.checked).toBeFalsy();
  });

  it('Sould be create header with user logged', () => {
    const { menu } = selector;

    Storage.prototype.getItem = jest.fn(() => {
      return jwt.sign({ firstName: 'name' }, process.env.REACT_APP_JWT_SECRET, {
        expiresIn: '1d',
      });
    });

    render(
      <Router>
        <Header />
      </Router>
    );

    const userMenu = document.querySelector(`.${menu}`);
    expect(userMenu).toBeDefined();
  });

  it('Sould be change to dark mode', () => {
    Storage.prototype.getItem = jest.fn(() => null);
    const { tg } = selector;

    render(
      <WizeTubeProvider>
        <Router>
          <Header />
        </Router>
      </WizeTubeProvider>
    );

    const toggle = document.querySelector(`.${tg}`);
    expect(toggle.checked).toBeFalsy();

    fireEvent.click(toggle);
    expect(toggle.checked).toBeTruthy();
  });
});
