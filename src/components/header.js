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
                  <h1 className="heading-title">Recreativas MTB en Costa Rica</h1>
                  <p className="heading-text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                    euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
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