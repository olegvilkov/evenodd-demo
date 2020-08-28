import { combineReducers } from 'redux';

import gameslist from './gameslist';
import errors from './errors';
import loading from './loading';
import currentgame from './currentgame';
import user from './user';
import playerlist from './playerlist';

const rootReducer = combineReducers({
  gameslist,
  errors,
  loading,
  currentgame,
  user,
  playerlist,
})

export default rootReducer;
