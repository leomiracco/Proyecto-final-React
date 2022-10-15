import { useSelector } from 'react-redux';

import './homeLoginPage.css';

export const HomeLoginPage = ()=>{

  const {displayName} = useSelector((state)=> state.auth);

  return(
    <main className="main-home-login-page">
      <div className="div-container-home-login-page">
        <section className="section-title">
          <h1 className="title-home-login-page">Home Login Page {displayName}</h1>
        </section>
      </div>
    </main>
  );
};