import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IconContext } from 'react-icons';
import Toggle from './Toggle';
import { useWizeTube } from '../../providers/wize-tube.provider';
import authService from '../../services/auth.service';
import SideMenu from './SideMenu';

const Header = () => {
  const { darkMode, setDarkMode } = useWizeTube();
  const [openMenu, setOpenMenu] = useState(false);

  const auth = authService.isAuthenticated();

  function handleDarkMode() {
    setDarkMode(!darkMode);
  }

  function handleOpenMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <header>
      {auth.authenticated ? (
        <div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <IconContext.Provider value={{ className: 'm-3 text-onyx-700' }}>
                <GiHamburgerMenu onClick={handleOpenMenu} />
              </IconContext.Provider>
              <Link className="font-emphasis" to="/">
                <span className="text-xl text-flame-600">Wize</span>
                <span className="font-light text-2xl text-onyx-700">Tube</span>
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <IconContext.Provider value={{ className: 'text-onyx-700' }}>
                <FaUserCircle />
              </IconContext.Provider>
              {auth.firstName}
            </div>
          </div>
          <SideMenu show={openMenu} />
        </div>
      ) : (
        <div
          className={
            'flex items-center justify-between p-4 ' +
            (darkMode ? 'bg-onyx-700' : 'bg-white')
          }
        >
          <Link className="font-emphasis" to="/">
            <span className="text-xl text-flame-600">Wize</span>
            <span
              className={
                'font-light text-2xl ' + (darkMode ? 'text-white' : 'text-onyx-700')
              }
            >
              Tube
            </span>
          </Link>
          <div className="inline-flex">
            <Toggle label="Dark mode" onChange={handleDarkMode} />
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
