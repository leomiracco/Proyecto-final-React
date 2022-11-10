import { createSlice } from '@reduxjs/toolkit';

export const searchMovieSlice = createSlice({
  name: 'searchMovieYa',
  initialState: {
    totalPages: null,
    selectedMovie: null,
    page: 0,
    searchMovie: [],
    isSearching: false,
    errorMessage: null,
    noRender: false,
    savedSearch: null
  },
  reducers: {
    startSearchLoading: (state, {payload})=> {
      state.isSearching = true;
      state.savedSearch = payload;
    },
    setSearch: (state, {payload})=>{
      state.totalPages = payload.totalPages;
      state.selectedMovie = null;
      state.page = payload.page;
      state.searchMovie = payload.searchMovie;
      state.isSearching = false;
      state.errorMessage = null;
    },
    errorSearchQuery: (state, {payload})=>{
      state.totalPages = null,
      state.selectedMovie = null,
      state.page = null;
      state.searchMovie = null;
      state.isSearching = false;
      state.errorMessage = payload.errorMessage;
    },
    setSelectedSearch: (state, {payload})=>{
      state.selectedMovie = payload;
      state.isSearching = false;
      state.errorMessage = null;
    },
    preventRenderingSearch: (state, {payload})=>{
      state.noRender = payload;
    }
  }
});

export const { startSearchLoading, setSearch, errorSearchQuery, setSelectedSearch, preventRenderingSearch } = searchMovieSlice.actions;