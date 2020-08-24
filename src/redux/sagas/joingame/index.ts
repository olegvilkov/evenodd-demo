import { JOIN_GAME } from 'redux/actionTypes';
import { IJoinGame } from './types';
import { addAppError } from 'redux/reducers/errors/actions';
import { setUserName } from 'redux/reducers/user/actions';
import { navigate } from 'utils/router';
import { loadingOn, loadingOff } from 'redux/reducers/loading/actions';
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
    yield put( loadingOn() );
    yield put( setUserName(username) );
    yield call(DB.addGamePlayer, gameId, player);
    yield call(navigate, `/game/${gameId}`);
    yield put( loadingOff() );
  } catch (e){
    yield put( loadingOff() );
    yield put( addAppError(e.message) );
  }
}

export const joinGameSagas = [
  takeLatest(JOIN_GAME, joinGame),
];