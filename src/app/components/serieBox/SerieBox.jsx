import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { apiURLImg } from '../../../apiPelisYa/config';
import { setSelectedSerie } from '../../../store/seriesYa/seriesYaSlice';
import { addItemToCart, setAddCartTotal, setItem, startAddingItem } from '../../../store/shoppingCart/shoppingCartSlice';

import './serieBox.css';

export const SerieBox = ({id, original_name, name, poster_path, first_air_date, overview, vote_average, price
})=>{

  const {displayName} = useSelector((state)=> state.auth);
  const {series} = useSelector((state)=> state.seriesYa);
  const {carts} = useSelector((state)=> state.shoppingCartYa);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(carts.length > 0){
      localStorage.setItem(displayName, JSON.stringify(carts));
    }
  }, [carts]);

  const onSelectedSerie = ()=>{
    const serie = series.find((serie)=>serie.id === id);
    dispatch(setSelectedSerie(serie));
  }

  const onAddItemToShoppingCart = ()=>{
    dispatch(startAddingItem());
    const itemCart = carts.find((movie)=>movie.id === id);
    const cartsCopy = JSON.parse(JSON.stringify(carts));

    if(itemCart){
     for (let i = 0; i < cartsCopy.length; i++) {
      if(cartsCopy[i].id === id){
        cartsCopy[i].amount++;
        cartsCopy[i].totalPrice = 0;
        cartsCopy[i].totalPrice += (cartsCopy[i].price * cartsCopy[i].amount);
        dispatch(setAddCartTotal(cartsCopy[i].price));
        break;
      }
     }
     dispatch(addItemToCart(cartsCopy));
    }else{
      const serie = series.find((serie)=>serie.id === id);
      const serieCopy = JSON.parse(JSON.stringify(serie));
      series.map((serie)=>{
        if(serie.id === id){
          serieCopy.totalPrice = serie.price;
          dispatch(setAddCartTotal(serieCopy.totalPrice));
          return;
        }
      });
      dispatch(setItem(serieCopy));
    }
  };

  return(
    <>
      <img src={`${apiURLImg}${poster_path}`} className="serie-img" alt={`Serie: ${name}. Puntuación: ${vote_average}`} />

      <p className="price-serie">{`$${price}`}</p>

      <Link className="see-more-details-serie" to={'/home/serie'} onClick={onSelectedSerie}>
        View more...
      </Link>

      <button className="add-to-cart-button-serie" onClick={onAddItemToShoppingCart} >
        Add to cart
      </button>
    </>
  );
};