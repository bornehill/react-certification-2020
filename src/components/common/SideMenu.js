import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import authService from '../../services/auth.service';
import { getIcon } from '../../common/tools/getIcon';

const SideMenu = ({ show }) => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    authService
      .userMenu()
      .then(({ data }) => {
        if (data.data?.length) {
          setMenu(data.data);
        }
      })
      .catch();
  }, []);

  return (
    <div className={`side-menu ${show ? 'open' : 'hide'}`}>
      <div>
        <IconContext.Provider value={{ className: 'm-1' }}>
          <p>What you want?</p>
          <ul>
            {menu?.length &&
              menu.map((m) => (
                <li className="flex items-center cursor-pointer">
                  {getIcon(m.icon)}
                  {m.label}
                </li>
              ))}
          </ul>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default SideMenu;
