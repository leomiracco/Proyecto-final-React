import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { apiURLImg } from "../../../apiPelisYa/config";
import { preventRenderingSearchByYear } from "../../../store/searchByYear/searchByYearSlice";

import './searchDetailsByYearPage.css';

export const SearchDetailsByYearPage = ({id, original_title, title, poster_path, release_date, overview, vote_average})=>{

  const dispatch = useDispatch();
  const {selectedFilm} = useSelector((state)=> state.searchMovieByYearYa);

  const onPreventRendering = ()=>{
    dispatch(preventRenderingSearchByYear(true));
  };

  return (
    <main className="main-home-search-movie-by-year-page">
      <div className="div-container-search-movie-by-year-page">

        <section className="section-search-movie-by-year-data-card">
          <div className="img-container-by-year-data">
            <img src={`${apiURLImg}${selectedFilm.poster_path}`} alt="Img movie" />
          </div>
        </section>

        <section className="section-search-movie-by-year-data-details">
          <div className="search-movie-by-year-data-container">
            <h2>{`Title: ${selectedFilm.title}`}</h2>
            <h3 className="release-date-search-movie-by-year" >{`Release Date: ${selectedFilm.release_date}`}</h3>
            <p>{`Overview: ${selectedFilm.overview}`}</p>
            <h3 className="vote-search-movie-by-year" >{`Vote Average: ${selectedFilm.vote_average}`}</h3>

            <div className="button-back-container-search-by-year">
              <Link className="back-search-by-year" onClick={onPreventRendering} to={'/home/search/byYear'}>
                Back...
              </Link>
            </div>

          </div>
        </section>


      </div>
    </main>
  );
};