import { createSlice } from '@reduxjs/toolkit';

export const seriesYaSlice = createSlice({
  name: 'seriesYa',
  initialState: {
    totalPages: null,
    selectedSerie: null,
    page: 0,
    series: [],
    isLoading: false,
    errorMessage: null,
    noRender: false
  },
  reducers: {
    startLoadingSeries: (state)=> {
      state.isLoading = true;
    },
    setSeries: (state, {payload})=>{
      state.totalPages = payload.totalPages;
      state.selectedSerie = null;
      state.page = payload.page;
      state.series = payload.series;
      state.isLoading = false;
      state.errorMessage = null;
    },
    errorSeriesQuery: (state, {payload})=>{
      state.totalPages = null,
      state.selectedSerie = null,
      state.page = null;
      state.series = null;
      state.isLoading = false;
      state.errorMessage = payload.errorMessage;
    },
    setSelectedSerie: (state, {payload})=>{
      state.selectedSerie = payload;
      state.isLoading = false;
      state.errorMessage = null;
    },
    preventRenderingSeries: (state, {payload})=>{
      state.noRender = payload;
    }
  }
});

export const { startLoadingSeries, setSeries, errorSeriesQuery, setSelectedSerie, preventRenderingSeries } = seriesYaSlice.actions;