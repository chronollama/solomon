import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import friendsReducer from './friends_reducer';

export default combineReducers({
  session: sessionReducer,
  friends: friendsReducer
});
