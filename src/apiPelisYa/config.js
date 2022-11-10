// import axios from 'axios';

// export const pelisYaApi = axios.create({
//   baseURL: 'https://pokeapi.co/api/v2/'
// });

// *********************************************************

// api themoviedb = https://api.themoviedb.org/3/account?api_key={{api_key}}
// Para que muestre películas: https://api.themoviedb.org/3/.....
// movie/{movie_id}?api_key={api_key}&language=en-US
// 'movie/1?api_key=api_key&language=en-US'

// pero si queremos las más populares:
// 'https://api.themoviedb.org/3/'
// 'movie/popular?api_key=api_key&language=en-US'

// imágenes:
// https://image.tmdb.org/t/p/w500/

// buscar película:
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false&query='text'

// Series más populares:
// https://api.themoviedb.org/3/tv/popular?api_key=api_key&language=en-US&page=1

const {VITE_THEMOVIEDB_API_KEY, VITE_THEMOVIEDB_URL, VITE_THEMOVIEDB_URL_MOVIE_POPULAR, VITE_URL_IMAGE, VITE_THEMOVIEDB_URL_SERIE_POPULAR, VITE_THEMOVIEDB_URL_SEARCH_MOVIE, VITE_THEMOVIEDB_URL_SEARCH_SERIE} = import.meta.env;

export const pelisYaApiURL = VITE_THEMOVIEDB_URL;
export const apiKey = VITE_THEMOVIEDB_API_KEY;
export const pelisYaApiURLPopular = VITE_THEMOVIEDB_URL_MOVIE_POPULAR;
export const apiURLImg = VITE_URL_IMAGE;

export const seriesYaURLPopular = VITE_THEMOVIEDB_URL_SERIE_POPULAR;

export const searchYaURLMovie = VITE_THEMOVIEDB_URL_SEARCH_MOVIE;
export const searchYaURLSerie = VITE_THEMOVIEDB_URL_SEARCH_SERIE;