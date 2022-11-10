import { createSlice } from '@reduxjs/toolkit';

export const searchByYearSlice = createSlice({
  name: 'searchMovieByYearYa',
  initialState: {
    totalPages: null,
    selectedFilm: null,
    page: 0,
    searchMovieByYear: [],
    savedSearch: null,
    isSearching: false,
    errorMessage: null
  },
  reducers: {
    startSearchByYearLoading: (state, {payload})=> {
      state.isSearching = true;
      state.savedSearch = payload;
    },
    setSearchByYear: (state, {payload})=>{
      state.totalPages = payload.totalPages;
      state.page = payload.page;
      state.searchMovieByYear = payload.searchMovieByYear;
      state.isSearching = false;
      state.errorMessage = null;
    },
    errorSearchByYearQuery: (state, {payload})=>{
      state.totalPages = null,
      state.searchMovieByYear = null,
      state.page = null;
      state.isSearching = false;
      state.errorMessage = payload.errorMessage;
    },
    setSelectedSearchByYear: (state, {payload})=>{
      state.selectedFilm = payload;
      state.isSearching = false;
      state.errorMessage = null;
    },
    preventRenderingSearchByYear: (state, {payload})=>{
      state.noRender = payload;
    }
  }
});

export const { startSearchByYearLoading, setSearchByYear, errorSearchByYearQuery, setSelectedSearchByYear, preventRenderingSearchByYear } = searchByYearSlice.actions;