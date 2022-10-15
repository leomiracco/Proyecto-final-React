import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";

import { checkingCredential, logout, login } from "./authSlice";

export const checkingAuthentication = (email, password)=>{

  return async (dispatch, getState)=>{

    dispatch(checkingCredential());

  };
};

export const startGoogleSignIn = ()=>{

  return async (dispatch, getState)=>{

    dispatch(checkingCredential());

    const response = await signInWithGoogle();

    if(!response.ok) return dispatch(logout(response.errorMessage));

    dispatch(login(response));
  };
};

export const startCreatingUserWithEmailPassword = ({displayName, email, password})=>{

  return async (dispatch, getState)=>{

    dispatch(checkingCredential());

    // en response, vamos a tener todo el objeto
    // que devuelve, es decir, {ok, uid, photoURL
    // , etc}
    const {ok, uid, photoURL, errorMessageCreateAccount} = await registerUserWithEmailPassword({displayName, email, password});

    if(!ok) return dispatch(logout({errorMessageCreateAccount}));

    dispatch(login({uid, displayName, email, photoURL}));
  };
};

export const startLoginWithEmailAndPassword = (email, password)=>{
  return async (dispatch, getState)=>{
    dispatch(checkingCredential());

    const response = await loginWithEmailAndPassword(email, password);

    if(!response.ok) return dispatch(logout(response));

    dispatch(login(response));
  };
};

export const startLogout = ()=>{
  return async (dispatch, getState)=>{
    
    await logoutFirebase();

    dispatch(logout({}));
  };
};