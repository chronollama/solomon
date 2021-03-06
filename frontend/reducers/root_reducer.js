import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import friendsReducer from './friends_reducer';
import billsReducer from './bills_reducer';
import searchReducer from './search_reducer';
import errorReducer from './error_reducer';

export default combineReducers({
  session: sessionReducer,
  friends: friendsReducer,
  bills: billsReducer,
  search: searchReducer,
  errors: errorReducer
});
