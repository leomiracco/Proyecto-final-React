import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth/authSlice";

export const useCheckAuth = ()=>{

  const {status, isLogin} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  // acá para realizar lo siguiente, debemos
  // crear un customHook, y no dejar la lógica
  // aquí
  useEffect(()=>{
    // este método es de Firebase. Genera un
    // 'Observer'.
    onAuthStateChanged(FirebaseAuth, async (user)=>{
      
      if(!user){
        localStorage.clear();
        return dispatch(logout({}));
      }

      const {uid, displayName, email, photoURL} = user;

      dispatch(login({uid, displayName, email, photoURL}));
    });
  }, []);

  return{
    status,
    isLogin
  }

};