import React from 'react';
import { AiFillEdit, AiFillShop, AiFillSetting } from 'react-icons/ai';
import { FaUserCircle, FaVoteYea } from 'react-icons/fa';

export function getIcon(icon) {
  switch (icon) {
    case 'AiFillEdit':
      return <AiFillEdit />;
    case 'AiFillShop':
      return <AiFillShop />;
    case 'AiFillSetting':
      return <AiFillSetting />;
    case 'FaVoteYea':
      return <FaVoteYea />;
    default:
      return <FaUserCircle />;
  }
}
