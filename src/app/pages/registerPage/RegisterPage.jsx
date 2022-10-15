import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';
import { logout } from '../../../store/auth/authSlice';
import { startCreatingUserWithEmailPassword } from '../../../store/auth/thunks';

import './registerPage.css';

const formData = {
  displayName: '',
  email: '',
  password: ''
};

const formValidations = {
  displayName: [(value)=> value.length >= 1, 'El nombre es obligatorio.'],
  email: [(value)=> value.includes('@'), 'El correo debe contener el símbolo @.'],
  password: [(value)=> value.length >= 6, 'El password debe tener más de 6 símbolos.']
};

export const RegisterPage = ()=>{

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState();

  const {status, errorMessageCreateAccount} = useSelector((state)=>state.auth);

  // si ya estamos en el proceso de registro, ya le dimos al botón
  // crear cuenta, debemos bloquear los botones.
  const isCheckingAuthentication = useMemo(()=> status === 'checking', [status]);

  const {formState, displayName, email, password, onInputChange, onResetForm, isFormValid, displayNameValid, emailValid, passwordValid} = useForm(formData, formValidations);

  const onSubmit = (e)=>{
    e.preventDefault();
    
    
    setFormSubmitted(true);

    if(!isFormValid && !isCheckingAuthentication) return dispatch(logout({errorMessageCreateAccount: ''}));

    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  useEffect(()=>{
    if(status === 'authenticated'){
      onResetForm();
      setFormSubmitted(false);
    }
  }, [status]);

  return(
    <main className="main-register-page">

      <div className="div-container-register-page">

        <form onSubmit={onSubmit} className="form-register">
          
          <label htmlFor="">Nombre completo:</label>
          <input type="text" name="displayName" className="register-input" placeholder="Ingrese el correo" value={displayName} onChange={onInputChange} />

          <div className="name-error-container">
            <h4>{!!displayNameValid && formSubmitted ? displayNameValid : null}</h4>
          </div>

          <label htmlFor="">Correo:</label>
          <input type="email" name="email" className="register-input" placeholder="Ingrese el correo" value={email} onChange={onInputChange} />

          <div className="email-error-container">
            <h4>{!!emailValid && formSubmitted ? emailValid : null}</h4>
          </div>

          <label htmlFor="">Contraseña:</label>
          <input type="password" name="password" className="register-input" placeholder="Ingrese la constraseña" value={password} onChange={onInputChange} />

          <div className="password-error-container">
            <h4>{!!passwordValid && formSubmitted ? passwordValid : null}</h4>
          </div>

          <div className="container-error">
            <h4>{formSubmitted ? errorMessageCreateAccount : null}</h4>
          </div>

          <button type="submit" disabled={isCheckingAuthentication} >
            Crear Cuenta
          </button>

          <button type="button" disabled={isCheckingAuthentication} >
            <NavLink to="/login">
              Login
            </NavLink>
          </button>

        </form>

      </div>

    </main>
  );
};