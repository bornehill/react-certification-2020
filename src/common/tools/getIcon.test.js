import React from 'react';
import { getIcon } from './getIcon';
import { AiFillEdit, AiFillShop, AiFillSetting } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

describe('Test return icon', () => {
  it('Should be return user icon', () => {
    const userIcon = <FaUserCircle />;

    const userIconFrom = getIcon('user');

    expect(userIconFrom).toStrictEqual(userIcon);
  });

  it('Should be return edit icon', () => {
    const userIcon = <AiFillEdit />;

    const userIconFrom = getIcon('AiFillEdit');

    expect(userIconFrom).toStrictEqual(userIcon);
  });

  it('Should be return shop icon', () => {
    const userIcon = <AiFillShop />;

    const userIconFrom = getIcon('AiFillShop');

    expect(userIconFrom).toStrictEqual(userIcon);
  });

  it('Should be return setings icon', () => {
    const userIcon = <AiFillSetting />;

    const userIconFrom = getIcon('AiFillSetting');

    expect(userIconFrom).toStrictEqual(userIcon);
  });
});
