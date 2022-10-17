import { Navigate, Route, Routes } from "react-router-dom";

import { HomeLoginPage } from "../pages";

export const PrivatePelisYaRoutes = ()=>{
  return(
    <>
      <Routes>

        <Route path="home" element={<HomeLoginPage />} />

        <Route path="/" element={<Navigate to='/home' />} />

      </Routes>
    </>
  );
};