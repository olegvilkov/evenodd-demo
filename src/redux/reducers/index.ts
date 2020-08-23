import { combineReducers } from 'redux';

import gameslist from './gameslist';
import errors from './errors';
import loading from './loading';

const rootReducer = combineReducers({
  gameslist,
  errors,
  loading,
})

export default rootReducer;
