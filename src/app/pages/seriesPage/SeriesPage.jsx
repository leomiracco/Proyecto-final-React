import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSeries } from '../../../store/seriesYa/thunks';
import { SerieBox } from '../../components';

import './seriesPage.css';

export const SeriesPage = ()=>{

  const dispatch = useDispatch();
  const {series, totalPages, page, noRender, errorMessage} = useSelector((state)=> state.seriesYa);

  useEffect(()=>{
    if(!noRender){
      dispatch(getSeries(1));
    }
  }, []);

  const onBackPage = ()=>{
    const pageNumber = page - 1;
    dispatch(getSeries(pageNumber));
  };

  const onNextPage = ()=>{
    if(totalPages < 1) return;

    const pageNumber = page + 1;
    dispatch(getSeries(pageNumber));
  };

  return(
    <main className="main-home-series-page">
      <div className="div-container-home-series-page">
        <section className="section-title-series">
          <h1 className="title-home-series-page">Series Populares {/* {errorMessage} */}</h1>
        </section>

        <h3 className="series-page-number">Pág. {page}</h3>

        <section className="pagination-control-section-series">
          <button className="back-button" onClick={onBackPage} style={page < 2 ? {display: "none"} : {display: "block"}} >
            Back
          </button>

          <button className="next-button" onClick={onNextPage} style={page < 2 ? {gridColumnStart: 6, gridColumnEnd: 8} : {gridColumnStart: 8}} >
            Next
          </button>
        </section>

        <section className="serie-pagination-section">
          {
            series?.map((serie)=>{
              return(
                <div key={serie.id} className="serie-box-container">
                  <SerieBox {...serie} />
                </div>
              )
            })
          }
        </section>

        <section className="pagination-control-section-series-bottom">
          <button className="back-button" onClick={onBackPage} style={page < 2 ? {display: "none"} : {display: "block"}} >
            Back
          </button>

          <button className="next-button" onClick={onNextPage} style={page < 2 ? {gridColumnStart: 6, gridColumnEnd: 8} : {gridColumnStart: 8}} >
            Next
          </button>
        </section>

        <h3 className="series-page-number">Pág. {page}</h3>
      </div>
    </main>
  );
};