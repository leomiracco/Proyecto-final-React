import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../../hooks';
import { getSearchMovies } from '../../../store/searchMovie/thunks';
import { SearchMovieBox } from '../../components';

import './searchPage.css';

const formData = {
  search: ''
};

export const SearchPage = ()=>{

  const dispatch = useDispatch();
  const {searchMovie, totalPages, page, noRender, errorMessage, isSearching, savedSearch} = useSelector((state)=> state.searchMovieYa);

  const {search, onInputChange, onResetForm} = useForm(formData);

  useEffect(()=>{
    if(!noRender){
      // dispatch(getSearchMovies(1));
    }
  }, []);

  const onSubmit = (e)=>{
    e.preventDefault();

    // setFormSubmitted(true);
    
    dispatch(getSearchMovies(1, search));

  };

  const onBackPage = ()=>{
    if(search === ''){
      const pageNumber = page - 1;
      dispatch(getSearchMovies(pageNumber, savedSearch));
    }else{
      const pageNumber = page - 1;
      dispatch(getSearchMovies(pageNumber, search));
    }
  };

  const onNextPage = ()=>{
    if(search === ''){
      const pageNumber = page + 1;
      dispatch(getSearchMovies(pageNumber, savedSearch));
    }else{
      const pageNumber = page + 1;
      dispatch(getSearchMovies(pageNumber, search));
    }
  };

  return(
    <main className="main-home-search-movie-page">
      <div className="div-container-home-search-movie-page">
        <section className="section-title">
          <h1 className="title-home-search-movie-page">Buscar Película por nombre {/* {errorMessage} */}</h1>
        </section>

        <form onSubmit={onSubmit} className="form-search-movie">
          <div className="container-search-movie-form">
            <label >Buscar:</label>
            <input type="text" name="search" className="search-input" placeholder="Nombre de la película..." value={search} onChange={onInputChange} />

            <button disabled={isSearching} type="submit" >
              Search
            </button>
          </div>
        </form>

        <h3 className="top-page-number" style={page === 0 ? {display: "none"} : {display: "block"}} >Pág. {page}</h3>

        <section className="pagination-control-search-section top">
          <button className="back-button" onClick={onBackPage} style={page < 2 ? {display: "none"} : {display: "block"}} >
            Back
          </button>

          <button className="next-button" onClick={onNextPage} style={searchMovie === null || searchMovie.length === 0 ? {display: 'none'} : page < 2 ? {display: 'block', gridColumnStart: 6, gridColumnEnd: 8} : {display: 'block', gridColumnStart: 8}} >
            Next
          </button>
        </section>

        <div className="message-search" style={searchMovie === null || searchMovie.length === 0 ? {display: 'flex'} : {display: 'none'}}>
          <h2>Esperando tu consulta maestro...</h2>
        </div>

        <section className="search-movie-pagination-section">
          {
            searchMovie?.map((movie)=>{
              return(
                <div key={movie.id} className="search-movie-box-container">
                  <SearchMovieBox {...movie} />
                </div>
              )
            })
          }
        </section>

        <section className="pagination-control-search-section bottom">
          <button className="back-button" onClick={onBackPage} style={page < 2 ? {display: "none"} : {display: "block"}} >
            Back
          </button>

          <button className="next-button" onClick={onNextPage} style={searchMovie === null || searchMovie.length === 0 ? {display: 'none'} : page < 2 ? {display: 'block', gridColumnStart: 6, gridColumnEnd: 8} : {display: 'block', gridColumnStart: 8}}  >
            Next
          </button>
        </section>

        <h3 className="bottom-page-number" style={page === 0 ? {display: "none"} : {display: "block"}} >Pág. {page}</h3>

        <footer className="footer">
          <a href="https://www.imdb.com/?ref_=nv_home" target="_blank" >IMDb</a>
        </footer>
      </div>
    </main>
  );
};