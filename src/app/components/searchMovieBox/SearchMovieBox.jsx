import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { apiURLImg } from '../../../apiPelisYa/config';
import { setSelectedSearch } from '../../../store/searchMovie/searchMovieSlice';
import { addItemToCart, setAddCartTotal, setItem, startAddingItem } from '../../../store/shoppingCart/shoppingCartSlice';

import './searchMovieBox.css';

export const SearchMovieBox = ({id, original_title, title, poster_path, release_date, overview, vote_average, price})=>{

  const {displayName} = useSelector((state)=> state.auth);
  const {carts} = useSelector((state)=> state.shoppingCartYa);
  const {searchMovie} = useSelector((state)=> state.searchMovieYa);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(carts.length > 0){
      localStorage.setItem(displayName, JSON.stringify(carts));
    }
  }, [carts]);

  const onSelectedMovie = ()=>{
    const movie = searchMovie.find((movie)=>movie.id === id);
    dispatch(setSelectedSearch(movie));
  };

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
        };
      };
     dispatch(addItemToCart(cartsCopy));
    }else{
      const searchM = searchMovie.find((movie)=>movie.id === id);
      const searchMCopy = JSON.parse(JSON.stringify(searchM));
      searchMovie.map((movie)=>{
        if(movie.id === id){
          searchMCopy.totalPrice = movie.price;
          dispatch(setAddCartTotal(searchMCopy.totalPrice));
          return;
        }
      });
      dispatch(setItem(searchMCopy));
    }
  };

  return(
    <>
      <img src={`${apiURLImg}${poster_path}`} className="search-movie-img" alt={`Movie: ${title}. Puntuación: ${vote_average}`} />

      <p className="search-movie-price">{`$${price}`}</p>

      <Link className="see-more-details-search" to={'/home/search/movie'} onClick={onSelectedMovie}>
        View more...
      </Link>

      <button className="add-to-cart-button-search" onClick={onAddItemToShoppingCart} >
        Add to cart
      </button>
    </>
  );
};