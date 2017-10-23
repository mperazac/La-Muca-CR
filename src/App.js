import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import FacebookLoginContainer from './components/facebook_login_container';
import EventsSection from './components/events_sections_container';
import Footer from './components/footer';
import Header from './components/header';
import './App.css';
import './shared/utilities.css'

const propTypes = {
  isConnected: PropTypes.bool
};

const defaultProps = {
  isConnected: false
};

class App extends Component {
  constructor() {
    super();
    if (process.env.NODE_ENV === 'production') {
      // Add your tracking ID created from https://analytics.google.com/analytics/web/#home/
      ReactGA.initialize('UA-45298262-13');
      // This just needs to be called once since w e have no routes in this case.
      ReactGA.pageview(window.location.pathname);
    }
  }

  render() {
    return (
      <div className="main-container">
        <Header/>
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
