import React from 'react';
import { render, screen } from '@testing-library/react';
import Init from './Init';

describe('Test Init app', () => {
  it('Sould be create Init success', () => {
    render(<Init />);

    const header = screen.getByText('Tube');
    const loginBtn = screen.getByText('Login');
    const exploreBtn = screen.getByText('Explore videos');

    expect(header).toBeDefined();
    expect(loginBtn).toBeDefined();
    expect(exploreBtn).toBeDefined();
  });
});
