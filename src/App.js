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
        <header>

        </header>
        <div className="intro">
          <div className="intro-image">
            <div className="container">
              <h3 className="intro-title">¡Hola!</h3>
              <div className="intro-description">
                Aquí encontrarás los próximos eventos de MTB en Costa Rica
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
