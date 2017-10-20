import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import ReactGA from 'react-ga';
import FacebookLoginContainer from './components/facebook_login_container';
import EventsSection from './components/events_sections_container';
import ContactUs from './components/contact_us';
import Footer from './components/footer';
import Header from './components/header';
import './App.css';
import './shared/utilites.css'

const propTypes = {
  isConnected: PropTypes.bool
};

const defaultProps = {
  isConnected: false
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      showContactUsModal: false
    };
    if (process.env.NODE_ENV === 'production') {
      // Add your tracking ID created from https://analytics.google.com/analytics/web/#home/
      ReactGA.initialize('UA-45298262-13');
      // This just needs to be called once since w e have no routes in this case.
      ReactGA.pageview(window.location.pathname);
    }
    this.openContactUsModal = this.openContactUsModal.bind(this);
    this.closeContactUsModal = this.closeContactUsModal.bind(this);
  }

  closeContactUsModal() {
    debugger;
    this.setState({ showContactUsModal: false });
  };

  openContactUsModal() {
    this.setState({ showContactUsModal: true });
  };

  render() {
    return (
      <div className="main-container">
        <Header/>
        <div className="container">
          { this.props.isConnected &&
          <EventsSection/>
          }
          <FacebookLoginContainer/>
          <Button
            onClick={this.openContactUsModal}
          > Contactenos
          </Button>
          <Footer/>
          <ContactUs
            showModal={this.state.showContactUsModal}
            onHide={this.closeContactUsModal}
          />
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
