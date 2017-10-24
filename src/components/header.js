import React from 'react';
import './header.css';

const Header = props => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12 no-padding">
        <div className="a-banner">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10">
                <section className="banner-heading t-left">
                  <h5 className="heading-subtitle">la muca cr</h5>
                  <h1 className="heading-title">Calendario de Recreativas de MTB <span role="img" aria-label="social">🇨🇷</span></h1>
                  <p className="heading-text">Conocé en un sólo lugar todas las recreativas de MTB en Costa Rica
                  y compartilas con tus amigos</p>
                </section>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Header;