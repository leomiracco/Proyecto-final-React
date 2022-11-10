import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import './homeLogoutPage.css';

export const HomeLogoutPage = ()=>{

  return (
    <main className="main-home-logout-page">
      <div className="div-container-home-logout-page">

        <div className="container-for-everything-except-the-footer">

          <section className="section-title-home-logout">
            <h1 className="title-home-logout-page">Bienvenidos al mundo de la cinefilia.</h1>
          </section>

          <section className="page-information">
            <p className="page-info-paragraph p-data" >Catálogo completo de miles de películas y series...</p>
            <p className="purchase-information-paragraph p-data" >Compra una vez, descarga el film y véalo cuantas veces quiera.</p>
          </section>

          <section className="compatible-devices">
            <div className="device-information-container">
              <h2 className="title-compatibility-information p-device" >Puedes disfrutar tus películas y series en cualquier tipo de dispositivo y sistema opetativo.</h2>
              <h2 className="title-type-of-supported-devices p-device" >Smart TV - Tablet - smartPhone</h2>
            </div>

            <div className="device-image-container">
              <img className="device-image" src="../../assets/img/smart-tablet-phone.png" alt="" />
            </div>
          </section>
        </div>
        
      </div>

      <footer className="footer-home-logout">
        <div className="global-footer-container">

          <section className="section-footer" >
            <h2>Preguntas? Llamá al: 0800 345 8536</h2>
          </section>

          <section className="footer-help-section" >
            <ul>
              <li>Preguntas</li>
              <li>Relaciones con inversionistas</li>
              <li>Privacidad</li>
              <li>Términos de uso</li>
            </ul>
          </section>

        </div>
      </footer>

    </main>
  );
};