import {configureStore} from '@reduxjs/toolkit';

import { authSlice } from './auth/authSlice';
import { prueba } from './pelisYa/pelisYaSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pelisYa: prueba.reducer
  }
});