/* global FB */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FacebookReduxLogin from 'facebook-login-redux-react';
import './facebook_login.css';

const propTypes = {
  getLoginStatus: PropTypes.func.isRequired,
  startFetching: PropTypes.func.isRequired,
  getUserInformation: PropTypes.func.isRequired,
  userInformation: PropTypes.object,
  facebookLogin: PropTypes.object.isRequired,
};

const defaultProps = {
  userInformation: {},
};

class FacebookLogin extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getUserInformation = this.getUserInformation.bind(this);
  }
  getUserInformation() {
    const {
      facebookLogin,
      userInformation,
      getUserInformation,
    } = this.props;
    if (facebookLogin.isConnected && !userInformation) {
      const userAccessToken = FB.getAuthResponse().accessToken;
      FB.api(
        '/me',
        'GET',
        { fields: 'id,name,email' },
        () => getUserInformation(userInformation, userAccessToken),
      );
    }
  }
  login(response) {
    this.props.getLoginStatus(response.status);
  }
  logout(response) {
    this.props.getLoginStatus(response.status);
    this.props.getUserInformation(null);
  }
  render() {
    this.getUserInformation();
    return (
      <div className="facebook-login-container">
        {!this.props.facebookLogin.isConnected &&
          <div className="facebook-login-description">
            Conéctate con tu cuenta de Facebook para
            poder listar los eventos de MTB.<br />Tranquilo(a), no guardaremos
            nada de tu información.
          </div>
        }
        <FacebookReduxLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          verbose={false}
          onWillMount={this.login}
          onLoginEvent={this.login}
          onLogoutEvent={this.logout}
          onClick={() => this.props.startFetching()}
        />
      </div>
    );
  }
}

FacebookLogin.propTypes = propTypes;
FacebookLogin.defaultProps = defaultProps;
export default FacebookLogin;
