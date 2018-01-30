import { combineReducers } from 'redux';
import EventsReducer from './events';
import facebookLogin from './login-reducer';
import userInformation from './user-information';

const rootReducer = combineReducers({
  facebookLogin,
  userInformation,
  events: EventsReducer,
});

export default rootReducer;
