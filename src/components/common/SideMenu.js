import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { Link, useHistory } from 'react-router-dom';
import authService from '../../services/auth.service';
import { getIcon } from '../../common/tools/getIcon';

const SideMenu = ({ show }) => {
  const history = useHistory();
  const [menu, setMenu] = useState([]);

  function logOut() {
    authService.signOut();
    history.push('/');
  }

  useEffect(() => {
    authService
      .userMenu()
      .then(({ data }) => {
        if (data.data?.length) {
          setMenu(data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className={`side-menu ${show ? 'open' : 'hide'}`}>
      <div>
        <IconContext.Provider value={{ className: 'm-1' }}>
          <p>What you want?</p>
          <ul>
            {menu?.length &&
              menu.map((m) => (
                <li className="flex items-center cursor-pointer" key={m.id}>
                  <Link to={{ pathname: m.url }} className="inline-flex">
                    {getIcon(m.icon)}
                    {m.label}
                  </Link>
                </li>
              ))}
          </ul>
          <button onClick={logOut}>Logout</button>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default SideMenu;
