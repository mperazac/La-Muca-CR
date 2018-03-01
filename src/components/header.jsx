import React from 'react';
import logo from './../img/la_muca_cr_logo.png';
import './header.css';

const Header = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12 no-padding">
        <div className="a-banner">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-12">
                <section className="banner-heading t-left">
                  <div className="row">
                    <div className="col-xs-12 col-md-4 mg-r-lg">
                      <img src={logo} alt="Logo" width="280" />
                    </div>
                    <div className="col-xs-12 col-md-7">
                      <h1 className="heading-title">
                        Calendario de Recreativas de MTB
                      </h1>
                    </div>
                  </div>
                  <p className="heading-text mg-t-lg">
                    Conocé en un sólo lugar todas las recreativas de MTB en Costa Rica y
                    compartílas con tus amigos
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
