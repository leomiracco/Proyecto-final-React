import { Navigate, Route, Routes } from "react-router-dom";

import { HomeLogoutPage, LoginPage, RegisterPage } from "../pages";

export const PublicPelisYaRoutes = ()=>{
  return(
    <>
      <Routes>

        <Route path="/" element={
        <HomeLogoutPage />} />

        <Route path="/login" element={
        <LoginPage />} />

        <Route path="/register" element={
        <RegisterPage />} />

        <Route path="/" element={<Navigate to='/' />} />

      </Routes>
    </>
  );
};