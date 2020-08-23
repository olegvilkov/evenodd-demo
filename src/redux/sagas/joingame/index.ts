import { JOIN_GAME } from 'redux/actionTypes';
import { IJoinGame } from './types';
import { addAppError } from 'redux/reducers/errors/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as DB from 'database';

/**
 * saga which add user to game
 * and if failed then dispatch error
 */
function* joinGame({gameId, username}: IJoinGame) {
  const player = {
    name: username,
    order: 0,
    points: 0,
  };
  try {
    yield call(DB.addPlayerToGame, gameId, player);
  } catch (e) {
    yield put( addAppError(e.message) );
  }  
}

export const joinGameSagas = [
  takeLatest(JOIN_GAME, joinGame),
];