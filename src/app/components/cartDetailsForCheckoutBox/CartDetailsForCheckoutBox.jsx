import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart, setAddCartTotal, setCardTotal, setDeleteItem, setSubtractCartTotal, subtractItemToCart } from '../../../store/shoppingCart/shoppingCartSlice';

import './cartDetailsForCheckoutBox.css';

export const CartDetailsForCheckoutBox = ({id, title, price, amount, totalPrice})=>{

  const dispatch = useDispatch();
  const {carts} = useSelector((state)=> state.shoppingCartYa);

  const onSubtractItem = ()=>{
    const cartsCopy = JSON.parse(JSON.stringify(carts));
    cartsCopy.map((film)=>{
      if(film.id === id && film.amount > 1){
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
      if(film.id === id){
        film.amount++;
        film.totalPrice = 0;
        film.totalPrice += film.price * film.amount;
        dispatch(setAddCartTotal(film.price));
        return;
      }
    });
    dispatch(addItemToCart(cartsCopy));
  };

  const onDeleteItem = ()=>{
    const deleteItem = carts.filter((movie)=>movie.id !== id);
      dispatch(setDeleteItem(deleteItem));

      let totalAmount = null;

      deleteItem.map((film)=>{
        totalAmount += film.totalPrice;
      });
      dispatch(setCardTotal(totalAmount));
  };

  return (
    <>
      <h3>{title}</h3>

      <div className="container-to-group-item-data">
        <div className="container-price-span">
          <span className="price-span">{`$${price}`}</span>
        </div>
        <div className="container-subtract-item" >
          <img onClick={onSubtractItem} className="logo-to-subtract-item-from-cart" src="../../../assets/img/restar.png" alt="" />
        </div>
        <span>{amount}</span>
        <div className="container-add-item" >
          <img onClick={onAddItem} className="logo-to-add-item-from-cart" src="../../../assets/img/sumar.png" alt="" />
        </div>
        <div className="container-remove-item" >
          <img onClick={onDeleteItem} 
          className="logo-to-remove-item-from-cart" src="../../../assets/img/02-cruz-roja.png" alt="" />
        </div>
      </div>

      <p>{`Total artículo: $${totalPrice}`}</p>
    </>
  );
};