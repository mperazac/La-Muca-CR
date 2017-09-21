import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FacebookLoginContainer from './components/facebook_login_container';
import EventsSection from './components/events_sections_container';
import Footer from './components/footer';
import './App.css';
import './shared/utilites.css'

const propTypes = {
  isConnected: PropTypes.bool
};

const defaultProps = {
  isConnected: false
};

class App extends Component {
  render() {
    return (
      <div className="main-container">
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
        <div className="container">
          { this.props.isConnected &&
          <EventsSection/>
          }
          <FacebookLoginContainer/>
          <Footer/>
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

function mapStateToProps(state) {
  const { isConnected } = state.facebookLogin;
  return { isConnected };
}

export default connect(mapStateToProps)(App);
