import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../../hooks';
import { getSearchMoviesByYear } from '../../../store/searchByYear/thunks';
import { SearchByYearBox } from '../../components/searchByYearBox/SearchByYearBox';

import './searchByYearPage.css';

const formData = {
  searchByYear: ''
};

export const SearchByYearPage = ()=>{

  const dispatch = useDispatch();
  const {searchMovieByYear, totalPages, page, noRender, errorMessage, isSearching, savedSearch} = useSelector((state)=> state.searchMovieByYearYa);

  const {searchByYear, onInputChange, onResetForm} = useForm(formData);

  useEffect(()=>{
    // if(!noRender){
    //   dispatch(getSearchMovies(1));
    // }
    

    // console.log({searchMovieByYear});
  }, []);

  const onSubmit = (e)=>{
    e.preventDefault();
    // setFormSubmitted(true);
    
    dispatch(getSearchMoviesByYear(1, searchByYear));
    
  };

  const onBackPage = ()=>{
    if(searchByYear === ''){
      const pageNumber = page - 1;
      dispatch(getSearchMoviesByYear(pageNumber, savedSearch));
    }else{
      const pageNumber = page - 1;
      dispatch(getSearchMoviesByYear(pageNumber, searchByYear));
    }
  };

  const onNextPage = ()=>{
    if(searchByYear === ''){
      const pageNumber = page + 1;
      dispatch(getSearchMoviesByYear(pageNumber, savedSearch));
    }else{
      const pageNumber = page + 1;
      dispatch(getSearchMoviesByYear(pageNumber, searchByYear));
    }
  };

  return(
    <main className="main-home-search-movie-by-year-page">
      <div className="div-container-home-search-movie-by-year-page">
        <section className="section-title-search-by-year">
          <h1 className="title-home-search-movie-by-year-page">Buscar Película por año {/* {errorMessage} */}</h1>
        </section>

        <form onSubmit={onSubmit} className="form-search-movie-by-year">
          <label >Buscar:</label>
          <input type="text" name="searchByYear" className="search-input" placeholder="Año de la película" value={searchByYear} onChange={onInputChange} />

          <button disabled={isSearching} type="submit" >
            Search
          </button>
        </form>

        <h3 className="top-page-number" style={page === 0 ? {display: "none"} : {display: "block"}} >Pág. {page}</h3>

        <section className="pagination-control-search-by-year-section top">
          <button className="back-button" onClick={onBackPage} style={page < 2 ? {display: "none"} : {display: "block"}} >
            Back
          </button>

          <button className="next-button" onClick={onNextPage} style={searchMovieByYear === null || searchMovieByYear.length === 0 ? {display: 'none'} : page < 2 ? {display: 'block', gridColumnStart: 6, gridColumnEnd: 8} : {display: 'block', gridColumnStart: 8}} >
            Next
          </button>
        </section>

        <div className="message-search" style={searchMovieByYear === null || searchMovieByYear.length === 0 ? {display: 'flex'} : {display: 'none'}}>
          <h2>Esperando tu consulta maestro...</h2>
        </div>

        <section className="search-movie-by-year-pagination-section">
          {
            searchMovieByYear?.map((film)=>{
              return(
                <div key={film.id} className="movie-by-year-box-container">
                  <SearchByYearBox {...film} />
                </div>
              )
            })
          }
        </section>

        <section className="pagination-control-search-by-year-section bottom">
          <button className="back-button" onClick={onBackPage} style={page < 2 ? {display: "none"} : {display: "block"}} >
            Back
          </button>

          <button className="next-button" onClick={onNextPage} style={searchMovieByYear === null || searchMovieByYear.length === 0 ? {display: 'none'} : page < 2 ? {display: 'block', gridColumnStart: 6, gridColumnEnd: 8} : {display: 'block', gridColumnStart: 8}} >
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