import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Header from './Header';
import jwt from 'jsonwebtoken';

describe('Test Header component', () => {
  const selector = {
    btn: 'btn-primary',
    menu: 'side-menu',
  };

  it('Sould be create header', () => {
    const { btn } = selector;

    render(
      <Router>
        <Header />
      </Router>
    );

    const loginBtn = document.querySelector(`.${btn}`);

    expect(loginBtn).toBeDefined();
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
});
