import { all } from 'redux-saga/effects';
import { createGameSaga } from './creategame';

/**
 * saga to yield all others
 */
export default function* sagas() {
  yield all([...createGameSaga]);
}