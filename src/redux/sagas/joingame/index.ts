import { JOIN_GAME } from 'redux/actionTypes';
import { IJoinGame } from './types';
import { addAppError } from 'redux/reducers/errors/actions';
import { setUserName } from 'redux/reducers/user/actions';
import { navigate } from 'utils/router';
import { loadingOn, loadingOff } from 'redux/reducers/loading/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as DB from 'database';

/**
 * Prepare and return player data for add in game players
 * @param username 
 */
export const playerData = (username: string) => ({
  name: username,
  order: 0,
  points: 0,
  round: 0,
});

/**
 * saga which add user to game
 * and if failed then dispatch error
 */
function* joinGame({gameId, username}: IJoinGame) {
  const player = playerData(username);
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