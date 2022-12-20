import { apiKey } from '../../apiPelisYa/config';
import { getRandomPrice } from '../../helpers/getRandomPrice';
import { orderMovies } from '../../helpers/orderMovies';
import { errorSearchByYearQuery, setSearchByYear, startSearchByYearLoading } from './searchByYearSlice';

export const getSearchMoviesByYear = (pageNumber = 1, search)=>{

  return async (dispatch, getState)=>{

    dispatch(startSearchByYearLoading(search));
    // sort_by=primary_release_date.asc
    // sort_by=popularity.desc
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${pageNumber}&include_adult=false&primary_release_year=${search}`);

      const data = await response.json();
      // console.log(data);

      if(data.total_pages){

        const searchMovieByYear = [];
      
        for (let i = 0; i < data.results.length; i++) {
          searchMovieByYear[i] = {
            id: data.results[i].id,
            original_title: data.results[i].original_title,
            title: data.results[i].title,
            poster_path: data.results[i].poster_path,
            release_date: data.results[i].release_date,
            overview: data.results[i].overview,
            vote_average: data.results[i].vote_average,
            price: getRandomPrice(),
            totalPrice: 0,
            amount: 1
          };
        };
        let arrayMoviesCopy = [...searchMovieByYear];

        dispatch(setSearchByYear({searchMovieByYear: orderMovies(arrayMoviesCopy), page: pageNumber, totalPages: data.total_pages}));
      }else{
        throw data;
      }
  
    } catch (error) {
  
      if(error.status_code === 34) error.message = 'The resource you requested could not be found.';

      if(error.status_code === 7) error.message = 'Invalid API key: You must be granted a valid key.';

      dispatch(errorSearchByYearQuery({errorMessage: error.message}));
      
    };
  };
};