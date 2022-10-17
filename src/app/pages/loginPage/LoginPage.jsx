import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';
import { startGoogleSignIn, startLoginWithEmailAndPassword } from '../../../store/auth/thunks';

import './loginPage.css';

const formData = {
  email: '',
  password: ''
};

export const LoginPage = ()=>{

  // const {VITE_APIKEY} = import.meta.env;
  // console.log(VITE_APIKEY);
  // console.log(import.meta.env);

  const [formSubmitted, setFormSubmitted] = useState();

  const {status, errorMessage} = useSelector((state)=> state.auth);

  const dispatch = useDispatch();

  const {email, password, onInputChange, onResetForm} = useForm(formData);

  const isAuthenticated = useMemo(()=> status === 'checking', [status]);

  const onSubmit = (e)=>{
    e.preventDefault();

    setFormSubmitted(true);
    
    dispatch(startLoginWithEmailAndPassword(email, password));

  };

  const onGoogleSignIn = ()=>{
    
    dispatch(startGoogleSignIn());
  };

  useEffect(()=>{
    if(status === 'authenticated'){
      onResetForm();
      setFormSubmitted(false);
    }
  }, [status]);

  return(
    <main className="main-login-page">

      <div className="div-container-login-page">

        <form onSubmit={onSubmit} className="form-login">

          <label htmlFor="">Correo:</label>
          <input type="email" name="email" className="peli-input" placeholder="Ingrese el correo" value={email} onChange={onInputChange} />

          <label htmlFor="">Contraseña:</label>
          <input type="password" name="password" className="peli-input" placeholder="Ingrese la constraseña" value={password} onChange={onInputChange} />

          <div className="container-error">
            <h4>{formSubmitted && errorMessage}</h4>
          </div>

          <button disabled={isAuthenticated} type="submit" >
            Login
          </button>

          <button type="button" onClick={onGoogleSignIn} disabled={isAuthenticated} >
            Google
          </button>

          <button type="button" disabled={isAuthenticated} >
            <NavLink to="/register">
              Crear Cuenta
            </NavLink>
          </button>

        </form>

      </div>

    </main>
  );
};