import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { apiURLImg } from '../../../apiPelisYa/config';
import { preventRenderingSeries } from '../../../store/seriesYa/seriesYaSlice';

import './seriesDetailPage.css';

export const SeriesDetailPage = ()=>{

  const dispatch = useDispatch();
  const {selectedSerie} = useSelector((state)=> state.seriesYa);

  const onPreventRendering = ()=>{
    dispatch(preventRenderingSeries(true));
  };

  return (
    <main className="main-home-serie-page-details">
      <div className="div-container-serie-page">

        <section className="section-serie-data">
          <div className="img-container-serie">
            <img src={`${apiURLImg}${selectedSerie.poster_path}`} alt="Img serie" />
          </div>
        </section>

        <section className="section-serie-data-details">
          <div className="serie-data-container">
            <h2>{`Title: ${selectedSerie.title}`}</h2>
            <h3 className="release-date-serie">{`Release Date: ${selectedSerie.first_air_date}`}</h3>
            <p>{`Overview: ${selectedSerie.overview}`}</p>
            <h3 className="vote-serie">{`Vote Average: ${selectedSerie.vote_average}`}</h3>

            <div className="button-back-container-serie">
              <Link className="back-serie" onClick={onPreventRendering} to={'/home/series'}>
                Back...
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};