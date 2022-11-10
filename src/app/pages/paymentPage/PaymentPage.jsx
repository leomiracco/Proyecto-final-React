import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';
import { setEmptyCart, setSuccessfulPurchase } from '../../../store/shoppingCart/shoppingCartSlice';
import { CartDetailsForCheckoutBox } from '../../components/cartDetailsForCheckoutBox/cartDetailsForCheckoutBox';

import './paymentPage.css';

const formData = {
  fullName: '',
  address: ''
};

export const PaymentPage = ()=>{

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {fullName, address, onInputChange, onResetForm} = useForm(formData);
  const {carts, cartTotalAmount, successfulPurchase} = useSelector((state)=> state.shoppingCartYa);

  useEffect(()=>{
    dispatch(setSuccessfulPurchase(false));
    setFormSubmitted(false);
  }, []);

  const onSubmit = (e)=>{
    e.preventDefault();
    if(carts.length === 0) return;
    setFormSubmitted(true);

    if(fullName === '' || address === '') return;

    dispatch(setSuccessfulPurchase(true));
    dispatch(setEmptyCart());
  };

  const onEmptyCart = ()=>{
    dispatch(setEmptyCart());
  };

  const stylesAdd = {
    backgroundColor: 'red',
    borderRadius: '7px',
		color: 'white',
    fontFamily: 'Times New Roman',
    padding: '1rem',
    width: '40rem'
  }

  return(
    <main className="main-home-payment-page">
      <div className="div-container-home-payment-page">

        <section className="section-payment-title">
          <h1 className="title-home-payment-page">Realizar la compra</h1>
        </section>

        <div className="empty-cart-message-payment-container" style={(carts.length === 0 && !successfulPurchase ? {display: 'flex'} : {display: 'none'})}>
          <h2>Lo siento, debe incorporar productos al carrito, antes de comprar.</h2>
        </div>

        <section className="section-to-display-cart-payment-items">
          {
            carts?.map((film)=>{
              return(
                <div key={film.id} className="payment-box-container" >
                  <CartDetailsForCheckoutBox {...film} />
                </div>
              )
            })
          }

          <div className="global-cart-payment-data" style={carts.length < 1 ? {display: "none"} : {display: "flex"}} >

            <button className="empty-cart-payment-button" onClick={onEmptyCart} >Vaciar carrito</button>
            
            <p className="total-payment-units" >{`Total artículos: ${carts.length}`}</p>
            
            <p className="total-payment-amount" >{`Total carrito: $${cartTotalAmount}`}</p>

          </div>

        </section>
        
        <div className="container-to-display-successful-payment" style={successfulPurchase ? {display: 'flex'} : {display: 'none'}}>
          <div className="container-title-successful-payment" >
            <h2>PAGO REALIZADO CON ÉXITO!!!</h2>
          </div>

          <div className="ok-button-payment-container" >
            <Link to="/home" >
              OK
            </Link>
          </div>
        </div>

        <h2 className="title-to-complete-payment-data" >Completar los siguientes datos:</h2>

        <form onSubmit={onSubmit} className="form-payment">
          <label >Nombre completo:</label>

          <div className="full-name-error-payment-container">
            <h4 style={(fullName === '' && formSubmitted) ? stylesAdd : null} >{(fullName === '' && formSubmitted) && 'El nombre completo es requerido'}</h4>
          </div>

          <input disabled={successfulPurchase || carts.length === 0} type="text" name="fullName" className="name-payment-input input-payment" placeholder="Nombre completo..." value={fullName} onChange={onInputChange} />

          <label >Domicilio postal:</label>

          <div className="address-error-payment-container">
            <h4 style={(address === '' && formSubmitted) ? stylesAdd : null} >{(address === '' && formSubmitted) && 'La dirección es requerida'}</h4>
          </div>

          <input disabled={successfulPurchase || carts.length === 0} type="text" name="address" className="address-payment-input input-payment" placeholder="Domicilio postal..." value={address} onChange={onInputChange} />

          <button disabled={successfulPurchase || carts.length === 0} type="submit" className="button-payment" >
            Pagar
          </button>
        </form>


      </div>
    </main>
  );
};