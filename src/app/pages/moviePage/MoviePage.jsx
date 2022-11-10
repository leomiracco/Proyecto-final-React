import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { apiURLImg } from '../../../apiPelisYa/config';
import { preventRendering } from '../../../store/pelisYa/pelisYaSlice';

import './moviePage.css';

export const MoviePage = ()=>{

  const dispatch = useDispatch();
  const {selectedMovie} = useSelector((state)=> state.pelisYa);

  const onPreventRendering = ()=>{
    dispatch(preventRendering(true));
  };

  return (
    <main className="main-home-movie-page-details">
      <div className="div-container-movie-page">

        <section className="section-movie-data">
          <div className="img-container">
            <img src={`${apiURLImg}${selectedMovie.poster_path}`} alt="Img movie" />
          </div>
        </section>

        <section className="section-movie-data-details">
          <div className="movie-data-container">
            <h2>{`Title: ${selectedMovie.title}`}</h2>
            <h3 className="release-date">{`Release Date: ${selectedMovie.release_date}`}</h3>
            <p>{`Overview: ${selectedMovie.overview}`}</p>
            <h3 className="vote">{`Vote Average: ${selectedMovie.vote_average}`}</h3>

            <div className="button-back-container">
              <Link className="back" onClick={onPreventRendering} to={'/home'}>
                Back...
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};