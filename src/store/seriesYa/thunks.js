import { apiKey, seriesYaURLPopular } from "../../apiPelisYa/config";
import { getRandomPrice } from "../../helpers/getRandomPrice";
import { errorSeriesQuery, setSeries, startLoadingSeries } from "./seriesYaSlice";

export const getSeries = (pageNumber = 1)=>{

  return async (dispatch, getState)=>{

    dispatch(startLoadingSeries());

    try {

      const response = await fetch(`${seriesYaURLPopular}=${apiKey}&language=en-US&page=${pageNumber}`);

      const data = await response.json();
      // console.log(data);

      if(data.total_pages
        ){

        const series = [];
      
        for (let i = 0; i < data.results.length; i++) {
          series[i] = {
            id: data.results[i].id,
            original_title: data.results[i].original_name,
            title: data.results[i].name,
            poster_path: data.results[i].poster_path,
            first_air_date: data.results[i].first_air_date,
            overview: data.results[i].overview,
            vote_average: data.results[i].vote_average,
            price: getRandomPrice(),
            totalPrice: 0,
            amount: 1
          };
        };

        // dispatch(setSeries({series: data.results, page: pageNumber, totalPages: data.total_pages}));
        dispatch(setSeries({series: series, page: pageNumber, totalPages: data.total_pages}));
      }else{
        throw data;
      }
  
    } catch (error) {
  
      if(error.status_code === 34) error.message = 'The resource you requested could not be found.';

      if(error.status_code === 7) error.message = 'Invalid API key: You must be granted a valid key.';

      dispatch(errorSeriesQuery({errorMessage: error.message}));
      
    };
  };
};