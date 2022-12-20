import { apiKey, searchYaURLMovie, searchYaURLSerie } from "../../apiPelisYa/config";
import { getRandomPrice } from "../../helpers/getRandomPrice";
import { orderMovies } from "../../helpers/orderMovies";
import { errorSearchQuery, setSearch, startSearchLoading } from "./searchMovieSlice";


export const getSearchMovies = (pageNumber = 1, search)=>{

  return async (dispatch, getState)=>{

    dispatch(startSearchLoading(search));

    try {
      // const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${pageNumber}&include_adult=false&primary_release_year=${search}`);
      
      // const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=vote_average.desc&page=${pageNumber}&include_adult=false&primary_release_year=${search}`);

      // const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=primary_release_date.asc&page=${pageNumber}&include_adult=false&primary_release_year=${search}`);

      // const response = await fetch(`${searchYaURLSerie}=${apiKey}&sort_by=popularity.desc&language=en-US&page=${pageNumber}&include_adult=false&query=${search}`);

      // https://api.themoviedb.org/3/discover/movie?api_key=THE_KEY&language=pt-BR&sort_by=primary_release_date.asc&primary_release_year=1951

      const response = await fetch(`${searchYaURLMovie}=${apiKey}&language=en-US&sort_by=primary_release_date.asc&page=${pageNumber}&include_adult=false&query=${search}`);

      const data = await response.json();

      if(data.total_pages
        ){

        const searchMovie = [];
      
        for (let i = 0; i < data.results.length; i++) {
          searchMovie[i] = {
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
        
        let arrayMoviesCopy = [...searchMovie];

        dispatch(setSearch({searchMovie: orderMovies(arrayMoviesCopy), page: pageNumber, totalPages: data.total_pages}));
      }else{
        throw data;
      }
  
    } catch (error) {
  
      if(error.status_code === 34) error.message = 'The resource you requested could not be found.';

      if(error.status_code === 7) error.message = 'Invalid API key: You must be granted a valid key.';

      dispatch(errorSearchQuery({errorMessage: error.message}));
      
    };
  };
};