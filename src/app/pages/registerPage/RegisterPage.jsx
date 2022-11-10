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
  email: [(value)=> value.includes('@') && value.includes('.'), 'El correo debe contener el símbolo @ y el punto'],
  password: [(value)=> value.length >= 6, 'El password debe tener más de 6 símbolos.']
};

export const RegisterPage = ()=>{

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState();

  const {status, errorMessageCreateAccount, isLogin} = useSelector((state)=>state.auth);

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
    if(isLogin){
      onResetForm();
      setFormSubmitted(false);
    }
  }, [isLogin]);

  return(
    <main className="main-register-page">

      <div className="div-container-register-page">

        <form onSubmit={onSubmit} className="form-register">
          
          <div className="label-name-container">
            <label htmlFor="">Nombre completo:</label>
          </div>

          <div className="input-name-container">
            <input type="text" name="displayName" className="register-input" placeholder="Ingrese el correo" value={displayName} onChange={onInputChange} />
          </div>

          <div className="name-error-container">
            <h4 style={!!displayNameValid && formSubmitted ? {display: 'flex'} : {display: 'none'}} >{!!displayNameValid && formSubmitted ? displayNameValid : null}</h4>
          </div>

          <div className="label-email-container">
            <label htmlFor="">Correo:</label>
          </div>

          <div className="input-email-container">
            <input type="email" name="email" className="register-input" placeholder="Ingrese el correo" value={email} onChange={onInputChange} />
          </div>

          <div className="email-error-container">
            <h4>{!!emailValid && formSubmitted ? emailValid : null}</h4>
          </div>

          <div className="label-password-container">
            <label htmlFor="">Contraseña:</label>  
          </div>

          <div className="input-password-container">
            <input type="password" name="password" className="register-input" placeholder="Ingrese la constraseña" value={password} onChange={onInputChange} />
          </div>

          <div className="password-error-container">
            <h4>{!!passwordValid && formSubmitted ? passwordValid : null}</h4>
          </div>

          <div className="container-error">
            <h4>{formSubmitted ? errorMessageCreateAccount : null}</h4>
          </div>

          <div className="button-create-account-container">
            <button type="submit" disabled={isCheckingAuthentication} >
            Crear Cuenta
            </button>
          </div>

          <div disabled={isCheckingAuthentication} className="button-create-account-container">
            <NavLink to="/public/login">
              Login
            </NavLink>
          </div>

        </form>

      </div>

    </main>
  );
};