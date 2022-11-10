import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { apiURLImg } from '../../../apiPelisYa/config';
import { setSelectedSearchByYear } from '../../../store/searchByYear/searchByYearSlice';
import { addItemToCart, setAddCartTotal, setItem, startAddingItem } from '../../../store/shoppingCart/shoppingCartSlice';

import './searchByYearBox.css';

export const SearchByYearBox = ({id, original_title, title, poster_path, release_date, overview, vote_average, price
})=>{

  const {displayName} = useSelector((state)=> state.auth);
  const {carts} = useSelector((state)=> state.shoppingCartYa);
  const {searchMovieByYear} = useSelector((state)=> state.searchMovieByYearYa);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(carts.length > 0){
      localStorage.setItem(displayName, JSON.stringify(carts));
    }
  }, [carts]);

  const onSelectedMovie = ()=>{
    const movie = searchMovieByYear.find((movie)=>movie.id === id);
    dispatch(setSelectedSearchByYear(movie));
  };

  const onAddItemToShoppingCart = ()=>{
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
      const movie = searchMovieByYear.find((movie)=>movie.id === id);
      const movieCopy = JSON.parse(JSON.stringify(movie));
      searchMovieByYear.map((movie)=>{
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
      <img src={`${apiURLImg}${poster_path}`} className="movie-by-year-img" alt={`Movie: ${title}. Puntuación: ${vote_average}`} />

      <p className="search-by-year-price">{`$${price}`}</p>

      <Link className="see-more-details-search-by-year" to={'/home/search/detailsByYear'} onClick={onSelectedMovie}>
        View more...
      </Link>

      <button className="add-to-cart-button-search-by-year" onClick={onAddItemToShoppingCart} >
        Add to cart
      </button>
    </>
  );
};