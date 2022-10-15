import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { startLogout } from '../../../store/auth/thunks';

import './navBar.css';

export const NavBar = ()=>{

  const dispatch = useDispatch();

  const onLogout = ()=>{
    dispatch(startLogout());
  };

  const img = `./assets/img/logo-white.png`;

  return (
    <nav className="navbar">

      <div className="image-container">
        <NavLink to="/">
          <img src={`${img}`} alt="logo-nav" />
        </NavLink>
      </div>

      <div className="navigation-container">
        <NavLink className={({isActive})=>
          `login ${isActive ? 'active' : ''}`
          }
          to="/login"
        >
          Login
        </NavLink>

        <NavLink className={({isActive})=>
          `logout ${isActive ? 'active' : ''}`
          }
          onClick={onLogout}
        >
          Logout
        </NavLink>

      </div>

    </nav>
  );
};