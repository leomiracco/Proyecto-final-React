import { createSlice } from '@reduxjs/toolkit';

export const pelisYaSlice = createSlice({
  name: 'pelisYa',
  initialState: {
    id: null
  },
  reducers: {
    prueba: (state, {payload}) => {
      state.id = '';
      console.log('hola');
    }
  }
});

export const { prueba } = pelisYaSlice.actions;