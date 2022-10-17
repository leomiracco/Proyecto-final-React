// children es una desestructuración de
// los objetos que van a estar dentro de
// este componentes, es decir, los componentes

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useCheckAuth } from "../hooks";

// hijos de este componente padre.
export const PublicRoute = ({children})=>{

  // const {status} = useCheckAuth();
  const {status} = useSelector((state)=> state.auth);

  return(
    (status === 'not-authenticated')
      ? children
      : (status === 'authenticated')
        && <Navigate to="/home" />
  );
};