import { combineReducers } from 'redux';
import EventsReducer from './events';
import facebookLogin from './login-reducer.js';
import userInformation from './user-information.js'

const rootReducer = combineReducers({
  facebookLogin: facebookLogin,
  userInformation: userInformation,
  events: EventsReducer
});

export default rootReducer;
