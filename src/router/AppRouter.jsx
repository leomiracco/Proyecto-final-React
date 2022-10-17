import { Navigate, Route, Routes } from "react-router-dom";

import { HomeLoginPage, HomeLogoutPage, LoginPage, RegisterPage } from "../app/pages";
import { NavBar } from "../ui/components/navBar/NavBar";
import { SpinnerAuth } from "../ui/components/spinnerAuth";
import { useCheckAuth } from "../hooks";
import { PrivateRoute, PublicRoute } from "./";
import { PrivatePelisYaRoutes, PublicPelisYaRoutes } from "../app/appRoutes";

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

        {(status === 'not-authenticated' || status === 'checking') && <Route path="/login" element={ <LoginPage /> } />}

        {(status === 'not-authenticated' || status === 'checking') && <Route path="/register" element={ <RegisterPage /> } />}

        {(status === 'not-authenticated' || status === 'checking') && <Route path="/" element={ <HomeLogoutPage /> } />}

        {(status === 'authenticated' || status === 'checking') && <Route path="/" element={ <HomeLoginPage /> } />}

        {(status === 'authenticated' || status === 'checking') && <Route path="/*" element={ <Navigate to={"/"} /> } />}

        {/***************************************/}

        {/* <Route path="/*" element={
          <PrivateRoute>
            <Routes>
              <Route path="home" element={<HomeLoginPage />} />
            </Routes>
          </PrivateRoute>
        } /> */}

        {/* <Route path="/public/*" element={
          <PublicRoute>
            <Routes>
              <Route path="/home" element={
                <HomeLogoutPage />} />

              <Route path="/login" element={
                <LoginPage />} />

              <Route path="/register" element={
                <RegisterPage />} />
            </Routes>
          </PublicRoute>
        } /> */}

      </Routes>
    </>
  );
};