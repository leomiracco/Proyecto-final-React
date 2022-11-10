import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { activateDisarm, setEmptyCart } from '../../../store/shoppingCart/shoppingCartSlice';
import { ShoppingCartItemBox } from '../ShoppingCartItemBox/ShoppingCartItemBox';

import './shoppingCartComponent.css';

export const ShoppingCartComponent = ()=>{

  const dispatch = useDispatch();
  const {carts, cartTotalAmount} = useSelector((state)=> state.shoppingCartYa);
  
  const onEmptyCart = ()=>{
    dispatch(setEmptyCart());
  };

  const onGoToThePageToMakeThePayment = ()=>{
    document.querySelector(".container-shopping-cart").classList.remove("csc-is-active");
    dispatch(activateDisarm(false));
  };

  return(
    <div className="container-shopping-cart" id="shopp-cart" >
      
      <div className="logo-container-to-close-the-cart">
        <img className="logo-to-close-the-cart" src="../../../assets/img/02-cruz-roja.png" alt="" />
      </div>

      <div className="cart-container" style={carts?.length < 1 ? {overflowY: "hidden"} : {overflowY: "scroll", scrollbarColor: "hsl(345, 96%, 50%) hsl(0, 1%, 20%)", scrollbarWidth: "thin"}} >

        <div className="empty-shopping-cart-container" style={carts?.length < 1 ? {display: "flex"} : {display: "none"}} >
          <h2>Carrito vacío...</h2>
        </div>

        <div className="cart-item-details">
          {
            carts?.map((item)=>{
              return(
                <div key={item.id} className="shopping-cart-item-container">
                  <ShoppingCartItemBox {...item} />
                </div>
              )
            })
          }

          <div className="global-cart-data" style={carts?.length < 1 ? {display: "none"} : {display: "flex"}} >

            <p className="total-units" >{`Total artículos: ${carts?.length}`}</p>
            <p className="total-amount" >{`Total carrito: $${cartTotalAmount}`}</p>

            <div className="button-to-make-the-payment-container">
              <Link className="button-to-make-the-payment" to="/home/payment" onClick={onGoToThePageToMakeThePayment} >Realizar pago</Link>
            </div>

            <div className="empty-cart-button-container">
              <button className="empty-cart-button" onClick={onEmptyCart} >Vaciar carrito</button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};