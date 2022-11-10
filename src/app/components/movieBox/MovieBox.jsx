import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { apiURLImg } from '../../../apiPelisYa/config';
import { setSelectedMovie } from '../../../store/pelisYa/pelisYaSlice';
import { addItemToCart, setAddCartTotal, setItem, startAddingItem } from '../../../store/shoppingCart/shoppingCartSlice';

import './movieBox.css';

export const MovieBox = ({id, original_title, title, poster_path, release_date, overview, vote_average, price
})=>{

  const {displayName} = useSelector((state)=> state.auth);
  const {carts} = useSelector((state)=> state.shoppingCartYa);
  const {movies} = useSelector((state)=> state.pelisYa);
  const dispatch = useDispatch();

  useEffect(()=>{
    localStorage.setItem(displayName, JSON.stringify(carts));
    // if(carts.length > 0){
    // }
  }, [carts]);

  const onSelectedMovie = ()=>{
    const movie = movies.find((movie)=>movie.id === id);
    dispatch(setSelectedMovie(movie));
  };

  const onAddItemToShoppingCart = ()=>{
    // dispatch(prueba(id)); haciendo todo esto directamente en el slice
    // sí que funciona y es lo correcto.
    dispatch(startAddingItem());
    const itemCart = carts.find((movie)=>movie.id === id);
    // para crear una copia del array 'carts' editable.
    // por defecto al utilizar el useSelect el array 'carts'
    // es de solo lectura.
    const cartsCopy = JSON.parse(JSON.stringify(carts));
    if(itemCart){
      for (let i = 0; i < cartsCopy.length; i++) {
        if(cartsCopy[i].id === id){
          cartsCopy[i].amount++;
          cartsCopy[i].totalPrice = 0;
          cartsCopy[i].totalPrice += (cartsCopy[i].price * cartsCopy[i].amount);
          dispatch(setAddCartTotal(cartsCopy[i].price));
          break;
        };
      };
     dispatch(addItemToCart(cartsCopy));
    }else{
      const movie = movies.find((movie)=>movie.id === id);
      const movieCopy = JSON.parse(JSON.stringify(movie));
      movies.map((movie)=>{
        if(movie.id === id){
          movieCopy.totalPrice = movie.price;
          dispatch(setAddCartTotal(movieCopy.totalPrice));
          return;
        }
      });
      dispatch(setItem(movieCopy));
    }
  };

  return(
    <>
      <img src={`${apiURLImg}${poster_path}`} className="movie-img" alt={`Movie: ${title}. Puntuación: ${vote_average}`} />

      <p className="price">{`$${price}`}</p>

      <Link className="see-more-details" to={'/home/movie'} onClick={onSelectedMovie}>
        View more...
      </Link>

      <button className="add-to-cart-button" onClick={onAddItemToShoppingCart} >
        Add to cart
      </button>
    </>
  );
};