import { createSlice } from '@reduxjs/toolkit';

export const pelisYaSlice = createSlice({
  name: 'pelisYa',
  initialState: {
    totalPages: null,
    selectedMovie: null,
    page: 0,
    movies: [],
    isLoading: false,
    errorMessage: null,
    noRender: false
  },
  reducers: {
    startLoadingMovies: (state)=> {
      state.isLoading = true;
    },
    setMovies: (state, {payload})=>{
      state.totalPages = payload.totalPages;
      state.selectedMovie = null;
      state.page = payload.page;
      state.movies = payload.movies;
      state.isLoading = false;
      state.errorMessage = null;
    },
    errorQuery: (state, {payload})=>{
      state.totalPages = null,
      state.selectedMovie = null,
      state.page = null;
      state.movies = null;
      state.isLoading = false;
      state.errorMessage = payload.errorMessage;
    },
    setSelectedMovie: (state, {payload})=>{
      state.selectedMovie = payload;
      state.isLoading = false;
      state.errorMessage = null;
    },
    preventRendering: (state, {payload})=>{
      state.noRender = payload;
    }
  }
});

export const { startLoadingMovies, setMovies, errorQuery, setSelectedMovie, preventRendering } = pelisYaSlice.actions;