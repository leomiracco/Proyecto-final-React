import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async ()=>{
  
  try {
    const response = await signInWithPopup(FirebaseAuth, googleProvider);

    const {displayName, email, photoURL, uid} = response.user;

    return{
      ok: true,
      displayName, email, photoURL, uid
    }

  } catch (error) {

    const errorCode = error.code;
    const errorMessage = error.message;

    const credentials = GoogleAuthProvider.credentialFromError(error);

    return{
      ok: false,
      errorMessage
    };
  };
};

export const registerUserWithEmailPassword = async ({displayName, email, password})=>{

  try {
    
    const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const {uid, photoURL} = response.user;

    // actualizamos el nuevo usuario en Firebase:
    // es decir, si el usuario nuevo se crea
    // exitosamente, al mismo tiempo, queda
    // logueado.
    await updateProfile(FirebaseAuth.currentUser, {displayName});
    
    return{
      ok: true,
      uid, displayName, email, photoURL
    };

  } catch (error) {

    // const errorCode = error.code;
    // let errorMessage = error.message;

    if(error.code === 'auth/email-already-in-use') error.message = 'El email ya esta en uso.';

    // if(error.code === 'auth/invalid-email') error.message = 'El correo no ha sido ingresado o es inválido.';

    // if(error.code === 'auth/internal-error') error.message = 'Asegurese de ingresar la contraseña.';

    if(error.code === 'auth/network-request-failed') error.message = 'Asegurese de tener conexión a Internet.';

    return{
      ok: false,
      errorMessageCreateAccount: error.message
    };
  };
};

export const loginWithEmailAndPassword = async (email, password)=>{
  try {
    
    const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);

    const {uid, displayName, photoURL} = response.user;

    return{
      ok: true,
      uid, displayName, photoURL
    };


  } catch (error) {

    if(error.code === 'auth/user-not-found') error.message = 'El email no se encuentra.';

    if(error.code === 'auth/invalid-email') error.message = 'El email es requerido.';

    if(error.code === 'auth/internal-error') error.message = 'La constraseña es requerida.';

    if(error.code === 'auth/wrong-password') error.message = 'El password es incorrecto.';

    if(error.code === 'auth/network-request-failed') error.message = 'Asegúrese de tener conexión a Internet.';

    return{
      ok: false,
      errorMessage: error.message
    };
  };
};

export const logoutFirebase = async ()=>{
  return await FirebaseAuth.signOut();
};