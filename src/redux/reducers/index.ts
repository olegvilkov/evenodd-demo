import { combineReducers } from 'redux'

import games from './gameslist'

const rootReducer = combineReducers({
  games,
})

export default rootReducer
