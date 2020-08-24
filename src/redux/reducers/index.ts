import { combineReducers } from 'redux';

import gameslist from './gameslist';
import errors from './errors';
import loading from './loading';
import currentgame from './currentgame';

const rootReducer = combineReducers({
  gameslist,
  errors,
  loading,
  currentgame,
})

export default rootReducer;
