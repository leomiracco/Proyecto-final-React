import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ShoppingCartComponent } from '../../../app/components/shoppingCartComponent/ShoppingCartComponent';

import { startLogout } from '../../../store/auth/thunks';
import { preventRendering } from '../../../store/pelisYa/pelisYaSlice';
import { activateDisarm, setEmptyCart } from '../../../store/shoppingCart/shoppingCartSlice';

import './navBar.css';

export const NavBar = ()=>{

  const {isActiveCart, carts} = useSelector((state)=> state.shoppingCartYa);
  const {isLogin} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  if(isActiveCart){
    document.addEventListener('mouseup', (e)=>{
      if(!e.target.matches('.container-shopping-cart') && !e.target.matches('.logo-container-to-close-the-cart') && !e.target.matches('.cart-container') && !e.target.matches('.cart-container *') && !e.target.matches('.add-to-cart-button') && !e.target.matches('.shopping-cart-icon-container *')){
        document.querySelector(".container-shopping-cart").classList.remove("csc-is-active");
        dispatch(activateDisarm(false));
      }
    });
  };

  const onLogout = ()=>{
    dispatch(setEmptyCart());
    return (isLogin)
    && dispatch(startLogout())
  };
  
  const onReload = ()=>{
    dispatch(preventRendering(false));
  };

  const onShoppingCart = ()=>{
    if(isActiveCart){
      document.querySelector(".container-shopping-cart").classList.remove("csc-is-active");
      dispatch(activateDisarm(false));
    }else{
      document.querySelector(".container-shopping-cart").classList.add("csc-is-active");
      dispatch(activateDisarm(true));
    }
  };

  const img = `../../assets/img/cine2.png`;

  return (
    <nav className="navbar">

      <div className="image-container">
        <NavLink to="/*" onClick={onReload}>
          <img src={`${img}`} alt="logo-nav" />
        </NavLink>
      </div>

      <div className="navigation-container" style={isLogin ? {display: 'flex'} : {display: 'none'}}>
        <NavLink to="/home/series" >
          Series
        </NavLink>

        <NavLink to="/home/search" className="link-search-by-name" >
          Search by name
        </NavLink>

        <NavLink to="/home/search/byYear" className="link-search-by-year" >
          Search by year
        </NavLink>
      </div>

      <div className="login-logout-container" style={!isLogin ? {justifyContent: 'flex-end'} : {justifyContent: 'space-between'}}>
        <NavLink className={({isActive})=>
          `logout ${isActive ? 'active' : ''}`
          } to={!isLogin && "/public/login"} onClick={onLogout} style={isLogin ? {color: 'hsl(345, 96%, 50%)'} : {color: 'white'}} >
          {isLogin ? 'Logout' : 'Login'}
        </NavLink>

        <div className="shopping-cart-icon-container" onClick={onShoppingCart} id="cart-icon" style={isLogin ? {display: 'flex'} : {display: 'none'}} >

          <img src="../../../assets/img/carrito-de-compras-2.png" alt="" />

          <div className="container-number-of-items-in-the-shopping-cart" >
            <span className={carts?.length > 9 ? "number-of-items-in-the-shopping-cart item-number-font-size" : "number-of-items-in-the-shopping-cart"} >{carts?.length}</span>
          </div>
        </div>

        <ShoppingCartComponent />

      </div>

    </nav>
  );
};