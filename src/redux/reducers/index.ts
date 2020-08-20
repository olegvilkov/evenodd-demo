import { combineReducers } from 'redux'

import gameslist from './gameslist'
import errors from './errors'

const rootReducer = combineReducers({
  gameslist,
  errors,
})

export default rootReducer
