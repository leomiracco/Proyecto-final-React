import { createSlice } from '@reduxjs/toolkit';

export const shoppingCartSlice = createSlice({
  name: 'shoppingCartYa',
  initialState: {
    selectedItem: null,
    carts: [],
    isSearching: false,
    errorMessage: null,
    isActiveCart: false,
    noRender: false,
    cartTotalAmount: 0,
    successfulPurchase: false
  },
  reducers: {
    startAddingItem: (state, {payload})=> {
      state.isSearching = true;
    },
    setItem: (state, {payload})=>{
      state.carts = [...state.carts, payload];
      state.isSearching = false;
    },
    errorItem: (state, {payload})=>{
      state.isSearching = false;
      state.errorMessage = payload.errorMessage;
    },
    setDeleteItem: (state, {payload})=>{
      state.carts = payload;
      state.errorMessage = null;
    },
    addItemToCart: (state, {payload})=>{
      state.carts = payload;
    },
    subtractItemToCart: (state, {payload})=>{
      state.carts = payload;
    },
    activateDisarm: (state, {payload})=>{
      state.isActiveCart = payload;
    },
    setAddCartTotal: (state, {payload})=>{
      state.cartTotalAmount += payload;
    },
    setSubtractCartTotal: (state, {payload})=>{
      state.cartTotalAmount -= payload;
    },
    setCardTotal: (state, {payload})=>{
      state.cartTotalAmount = payload;
    },
    setEmptyCart: (state)=>{
      state.carts = [];
      state.cartTotalAmount = 0;
    },
    setSuccessfulPurchase: (state, {payload})=>{
      state.successfulPurchase = payload;
    },
    setLocalStorageCart: (state, {payload})=>{
      state.carts = payload;
    },
    setTotalAmountOfTheLocalStorage: (state, {payload})=>{
      state.cartTotalAmount = 0;
      payload.map((item)=>{
        state.cartTotalAmount += item.price * item.amount;
      });
    }
    /* ,
    prueba: (state, {payload})=>{
      for (let i = 0; i < state.carts.length; i++) {
        if(state.carts[i].id === payload){
          state.carts[i].amount++;
        }
      }
    } */
  }
});

export const { startAddingItem, setItem, errorItem, setDeleteItem, addItemToCart, subtractItemToCart, activateDisarm, setAddCartTotal, setSubtractCartTotal, setCardTotal, setEmptyCart, setSuccessfulPurchase, setLocalStorageCart, setTotalAmountOfTheLocalStorage } = shoppingCartSlice.actions;