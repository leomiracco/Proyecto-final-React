import { Navigate, Route, Routes } from "react-router-dom";

import { HomeLoginPage, HomeLogoutPage, LoginPage, RegisterPage } from "../app/pages";
import { NavBar } from "../ui/components/navBar/NavBar";
import { SpinnerAuth } from "../ui/components/spinnerAuth";
import { useCheckAuth } from "../hooks";

export const AppRouter = ()=>{

  const {status} = useCheckAuth();

  // if(status === 'checking'){
    /* return <SpinnerAuth />; */ // acá le ponemos el componente no
    // es más que el 'spinner'...
  // }

  return (
    <>
      <NavBar />

        {/* {(status === 'checking') && <SpinnerAuth />} */}

      <Routes>

        {(status === 'not-authenticated' || status === 'checking') && <Route path="/" element={ <HomeLogoutPage /> } />}

        {(status === 'authenticated') && <Route path="/" element={ <HomeLoginPage /> } />}

        <Route path="/login" element={ <LoginPage /> } />

        <Route path="/register" element={ <RegisterPage /> } />

        <Route path="/*" element={ <Navigate to={"/"} /> } />

      </Routes>
    </>
  );
};