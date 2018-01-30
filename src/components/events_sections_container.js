import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventsSections from './events_section';
import { fetchAllBatchEvents } from '../actions/events';

function mapStateToProps(state) {
  const { meta, data, paging } = state.events;
  const accessToken = state.userInformation !== null
    ? state.userInformation.accessToken
    : null;
  const { isConnected } = state.facebookLogin;
  return {
    meta,
    data,
    accessToken,
    isConnected,
    paging,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAllBatchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsSections);
