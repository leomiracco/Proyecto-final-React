import {configureStore} from '@reduxjs/toolkit';

import { authSlice } from './auth/authSlice';
import { pelisYaSlice } from './pelisYa/pelisYaSlice';
import { searchByYearSlice } from './searchByYear/searchByYearSlice';
import { searchMovieSlice } from './searchMovie/searchMovieSlice';
import { seriesYaSlice } from './seriesYa/seriesYaSlice';
import { shoppingCartSlice } from './shoppingCart/shoppingCartSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pelisYa: pelisYaSlice.reducer,
    seriesYa: seriesYaSlice.reducer,
    searchMovieYa: searchMovieSlice.reducer,
    shoppingCartYa: shoppingCartSlice.reducer,
    searchMovieByYearYa: searchByYearSlice.reducer
  }
});