import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { apiURLImg } from '../../../apiPelisYa/config';
import { preventRenderingSearch } from '../../../store/searchMovie/searchMovieSlice';

import './searchMoviePage.css';

export const SearchMoviePage = ()=>{

  const dispatch = useDispatch();
  const {selectedMovie} = useSelector((state)=> state.searchMovieYa);

  const onPreventRendering = ()=>{
    dispatch(preventRenderingSearch(true));
  };

  return (
    <main className="main-home-search-movie-page-card">
      <div className="div-container-search-movie-page-card">

        <section className="section-search-movie-data-card">
          <div className="img-container-card">
            <img src={`${apiURLImg}${selectedMovie.poster_path}`} alt="Img movie" />
          </div>
        </section>

        <section className="section-search-movie-data-details">
          <div className="search-movie-data-container-card">
            <h2>{`Title: ${selectedMovie.title}`}</h2>
            <h3 className="release-date-search">{`Release Date: ${selectedMovie.release_date}`}</h3>
            <p>{`Overview: ${selectedMovie.overview}`}</p>
            <h3 className="vote-search">{`Vote Average: ${selectedMovie.vote_average}`}</h3>

            <div className="button-back-container-search">
              <Link className="back-search" onClick={onPreventRendering} to={'/home/search'}>
                Back...
              </Link>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
};