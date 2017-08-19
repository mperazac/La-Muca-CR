/* global FB */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FacebookReduxLogin from 'facebook-login-redux-react';
import { FacebookAppId } from '../shared/variables';

const propTypes = {
  getLoginStatus: PropTypes.func.isRequired,
  startFetching: PropTypes.func.isRequired,
  getUserInformation: PropTypes.func.isRequired,
  userInformation: PropTypes.object,
  facebookLogin: PropTypes.object.isRequired
};

const defaultProps = {
  userInformation: {}
};

class FacebookLogin extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getUserInformation = this.getUserInformation.bind(this);
    this.styles = {};
  }

  login(response) {
    this.props.getLoginStatus(response.status);
  }
  logout(response) {
    this.props.getLoginStatus(response.status);
    this.props.getUserInformation(null);
  }
  getUserInformation() {
    if (this.props.facebookLogin.isConnected && !this.props.userInformation) {
      const user_access_token = FB.getAuthResponse()['accessToken'];
      FB.api('/me', 'GET', { fields: 'id,name,email' },
        userInformation => {
          this.props.getUserInformation(userInformation, user_access_token);
        }
      );
    }
  }
  render() {
    //const { id, name, email } = this.props.userInformation || { id: null, name: null, email: null };
    this.getUserInformation();
    return (
      <div style={styles.container}>
        <FacebookReduxLogin
          appId={FacebookAppId}
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
};