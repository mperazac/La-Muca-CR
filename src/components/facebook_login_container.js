import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FacebookLogin from './facebook_login';
import { getLoginStatus, startFetching, getUserInformation } from '../actions/facebook';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getLoginStatus, startFetching, getUserInformation,
  }, dispatch);
}
function mapStateToProps(state) {
  return {
    userInformation: state.userInformation,
    facebookLogin: state.facebookLogin,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookLogin);
