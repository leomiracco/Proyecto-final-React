import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMovies } from '../../../store/pelisYa/thunks';
import { setTotalAmountOfTheLocalStorage, setLocalStorageCart } from '../../../store/shoppingCart/shoppingCartSlice';
import { MovieBox } from '../../components';

import './homeLoginPage.css';

export const HomeLoginPage = ()=>{

  const {isLogin, displayName} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();
  const {movies, totalPages, page, noRender, errorMessage} = useSelector((state)=> state.pelisYa);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem(displayName));
    if(isLogin && user !== null){
      dispatch(setTotalAmountOfTheLocalStorage(user));
      dispatch(setLocalStorageCart(user));
    }

    if(!noRender){
      dispatch(getMovies(1));
    }
  }, []);

  const onBackPage = ()=>{
    const pageNumber = page - 1;
    dispatch(getMovies(pageNumber));
  };

  const onNextPage = ()=>{
    if(totalPages < 1) return;

    const pageNumber = page + 1;
    dispatch(getMovies(pageNumber));
  };

  return(
    <main className="main-home-login-page">
      <div className="div-container-home-login-page">

        <section className="section-title">
          <h1 className="title-home-login-page">Películas Populares{/*  {errorMessage} */}</h1>
        </section>

        <h3 className="movies-page-number">Pág. {page}</h3>

        <section className="pagination-control-section-movie">
          <button className="back-button" onClick={onBackPage} style={page < 2 ? {display: "none"} : {display: "block"}} >
            Back
          </button>

          <button className="next-button" onClick={onNextPage} style={page < 2 ? {gridColumnStart: 6, gridColumnEnd: 8} : {gridColumnStart: 8}} >
            Next
          </button>
        </section>

        <section className="movie-pagination-section">
          {
            movies?.map((movie)=>{
              return(
                <div key={movie.id} className="movie-box-container">
                  <MovieBox {...movie} />
                </div>
              )
            })
          }
        </section>

        <section className="pagination-control-section-movie-bottom">
          <button className="back-button" onClick={onBackPage} style={page < 2 ? {display: "none"} : {display: "block"}} >
            Back
          </button>

          <button className="next-button" onClick={onNextPage} style={page < 2 ? {gridColumnStart: 6, gridColumnEnd: 8} : {gridColumnStart: 8}} >
            Next
          </button>
        </section>

        <h3 className="movies-page-number">Pág. {page}</h3>

      </div>
    </main>
  );
};