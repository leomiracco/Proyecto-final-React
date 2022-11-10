import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart, setDeleteItem, subtractItemToCart, setAddCartTotal, setSubtractCartTotal, setCardTotal } from '../../../store/shoppingCart/shoppingCartSlice';

import './shoppingCartItemBox.css';

export const ShoppingCartItemBox = (item)=>{

  const dispatch = useDispatch();
  const {displayName} = useSelector((state)=> state.auth);
  const {carts, cartTotalAmount} = useSelector((state)=> state.shoppingCartYa);

  const onDeleteItem = ()=>{
    const deleteItem = carts.filter((movie)=>movie.id !== item.id);
    dispatch(setDeleteItem(deleteItem));

    let totalAmount = null;

    deleteItem.map((film)=>{
      totalAmount += film.totalPrice;
    });
    dispatch(setCardTotal(totalAmount));
  };

  const onSubtractItem = ()=>{
    const cartsCopy = JSON.parse(JSON.stringify(carts));
    cartsCopy.map((film)=>{
      if(film.id === item.id && film.amount > 1){
        film.amount--;
        film.totalPrice = 0;
        film.totalPrice += film.price * film.amount;
        dispatch(setSubtractCartTotal(film.price));
        return;
      }
    });
    dispatch(subtractItemToCart(cartsCopy));
  };

  const onAddItem = ()=>{
    const cartsCopy = JSON.parse(JSON.stringify(carts));
    cartsCopy.map((film)=>{
      if(film.id === item.id){
        film.amount++;
        film.totalPrice = 0;
        film.totalPrice += film.price * film.amount;
        dispatch(setAddCartTotal(film.price));
        return;
      }
    });
    dispatch(addItemToCart(cartsCopy));
  };

  return(
    <>
      <h2 className="title-shopping-cart">{item.title}</h2>

      <div className="container-for-the-item-details-in-the-cart">
        <span className="price-span">{`$${item.price}`}</span>

        <div className="subtract-item-container">
          <span className="subtract-item" onClick={onSubtractItem} >{`(-)`}</span>
        </div>

        <div className="amount-item-container">
          <span>{item.amount}</span>
        </div>

        <div className="add-item-container">
          <span className="add-item" onClick={onAddItem} >{`(+)`}</span>
        </div>

        <span className="remove-item" onClick={onDeleteItem} ><img className="logo-to-remove-item-from-cart" src="../../../assets/img/02-cruz-roja.png" alt="" /></span>
      </div>
      
      <p>{`Precio total artículo: $${item.totalPrice}`}</p>
    </>
  );
};