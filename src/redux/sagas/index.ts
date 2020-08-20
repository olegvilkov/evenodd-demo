import { all } from 'redux-saga/effects';
import { createGameSagas } from './creategame';

/**
 * root saga
 */
export default function* sagas() {
  yield all([...createGameSagas]);
}