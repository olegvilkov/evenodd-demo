import { all } from 'redux-saga/effects';
import { createGameSagas } from './creategame';
import { joinGameSagas } from './joingame';
import { gamesListSagas } from './gameslist';
import { currentGameSagas } from './currentgame';
import { userSagas } from './user';
import { playerListSagas } from './playerslist';

/**
 * root saga
 */
export default function* sagas() {
  yield all([
    ...createGameSagas,
    ...joinGameSagas,
    ...gamesListSagas,
    ...currentGameSagas,
    ...userSagas,
    ...playerListSagas
  ]);
}