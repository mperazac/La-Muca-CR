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
                  <h5 className="heading-subtitle">lamuca cr</h5>
                  <h1 className="heading-title">Recreativas MTB en Costa Rica <span role="img" aria-label="social">🇨🇷</span></h1>
                  <p className="heading-text">Somos un directorio de carreras de MTB
                    Recreativas para que sepás con facilidad cuales siguen.</p>
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