import { all } from 'redux-saga/effects';
import { createGameSagas } from './creategame';
import { joinGameSagas } from './joingame';

/**
 * root saga
 */
export default function* sagas() {
  yield all([...createGameSagas, ...joinGameSagas]);
}