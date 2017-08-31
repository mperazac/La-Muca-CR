import React, { Component } from 'react';
//import logo from './logo.svg';
import FacebookLoginContainer from './components/facebook_login_container';
import EventsSection from './components/events_sections_container';
import Footer from './components/footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <FacebookLoginContainer/>
        <EventsSection/>
        <Footer/>
      </div>
    );
  }
}

export default App;