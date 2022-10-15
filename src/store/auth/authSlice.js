import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // el status va a tener 3 estados:
    // 1) checking 2) not-authenticated y
    // 3) authenticated.
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
    errorMessageCreateAccount: null
  },
  reducers: {
    login: (state, {payload})=>{
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
      state.errorMessageCreateAccount = null;
    },
    logout: (state, {payload})=>{
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      // podemos preguntar si viene 'payload'
      // entonces, tomamos el errorMessage, si no
      // NO.
      // state.errorMessage = payload?.errorMessage;
      state.errorMessage = payload?.errorMessage;
      state.errorMessageCreateAccount = payload?.errorMessageCreateAccount;
    },
    checkingCredential: (state)=>{
      state.status = 'checking';
    }
  }
});

export const {login, logout, checkingCredential} = authSlice.actions;