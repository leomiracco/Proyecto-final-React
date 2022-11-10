import { apiKey, pelisYaApiURLPopular } from "../../apiPelisYa/config";
import { getRandomPrice } from "../../helpers/getRandomPrice";
import { errorQuery, setMovies, startLoadingMovies } from "./pelisYaSlice";

export const getMovies = (pageNumber = 1)=>{

  return async (dispatch, getState)=>{

    dispatch(startLoadingMovies());

    try {

      const response = await fetch(`${pelisYaApiURLPopular}=${apiKey}&language=en-US&page=${pageNumber}`);

      const data = await response.json();
      // console.log(data);

      if(data.total_pages
        ){

        const movies = [];
      
        for (let i = 0; i < data.results.length; i++) {
          movies[i] = {
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
          // movies[i].id = data.results[i].id;
          // movies[i].original_title = data.results[i].original_title;
          // movies[i].title = data.results[i].title;
          // movies[i].poster_path = data.results[i].poster_path;
          // movies[i].release_date = data.results[i].release_date;
          // movies[i].overview = data.results[i].overview;
          // movies[i].vote_average = data.results[i].vote_average;
          // movies[i].price = getRandomPrice();
          // movies[i].amount = 1;
        }

        dispatch(setMovies({movies: movies, page: pageNumber, totalPages: data.total_pages}));

      }else{
        throw data;
      }
  
    } catch (error) {
  
      if(error.status_code === 34) error.message = 'The resource you requested could not be found.';

      if(error.status_code === 7) error.message = 'Invalid API key: You must be granted a valid key.';

      dispatch(errorQuery({errorMessage: error.message}));
      
    };
  };
};