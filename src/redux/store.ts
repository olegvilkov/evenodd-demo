import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'

const middlewares = [];

// Log only in development
if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`)

    middlewares.push(logger)
}

const store = createStore(reducer, applyMiddleware(...middlewares))

export default store
