import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'

import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// Log only in development
if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`)

    middlewares.push(logger)
}

const store = createStore(reducer, applyMiddleware(...middlewares));

sagaMiddleware.run(sagas);

export default store;