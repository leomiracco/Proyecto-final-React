import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import { Input } from '../../../components/input/Input';

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

  const {status, errorMessage, isLogin} = useSelector((state)=> state.auth);

  const dispatch = useDispatch();

  const {email, hobbie, password, onInputChange, onResetForm} = useForm(formData);

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
    if(isLogin){
      onResetForm();
      setFormSubmitted(false);
    }
  }, [isLogin]);

  return(
    <main className="main-login-page">

      <div className="div-container-login-page">

        <form onSubmit={onSubmit} className="form-login">

          <div className="label-email-container">
            <label htmlFor="">Correo:</label>
          </div>

          <div className="input-email-container">
            <input type="email" name="email" className="peli-input" placeholder="Ingrese el correo..." value={email} onChange={onInputChange} />
          </div>

          <div className="label-password-container">
            <label htmlFor="">Contraseña:</label>
          </div>

          <div className="input-password-container">
            <input type="password" name="password" className="peli-input" placeholder="Ingrese la constraseña..." value={password} onChange={onInputChange} />
          </div>

          <div className="container-error">
            <h4>{formSubmitted && errorMessage}</h4>
          </div>

          <div className="button-login-container">
            <button disabled={isAuthenticated} type="submit" >
              Login
            </button>
          </div>

          <div className="button-google-container">
            <button type="button" onClick={onGoogleSignIn} disabled={isAuthenticated} >
            Google
            </button>
          </div>

          <div disabled={isAuthenticated} className="button-create-account-container">
            <NavLink to="/public/register">
              Crear Cuenta
            </NavLink>
          </div>

        </form>

      </div>

    </main>
  );
};