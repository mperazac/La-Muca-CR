import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventsSections from './events_section';
import { fetchAllBatchEvents } from '../actions/events';

function mapStateToProps(state) {
  const { meta, data, paging } = state.events;
  const access_token = state.userInformation !== null
    ? state.userInformation.access_token
    : null;
  const { isConnected } = state.facebookLogin;
  return { meta, data, access_token, isConnected, paging };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAllBatchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsSections);
