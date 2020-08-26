import { CREATE_GAME } from 'redux/actionTypes';
import { ICreateGame } from './types';
import { takeLatest, call, put } from 'redux-saga/effects';
import { remoteConfig } from 'utils/firebase';
import { addAppError } from 'redux/reducers/errors/actions';
import { updateUserProfile } from 'redux/sagas/user/actions';
import { loadingOn, loadingOff } from 'redux/reducers/loading/actions';
import { playerData } from '../joingame';
import { navigate } from 'utils/router';
import * as DB from 'database';

/**
 * saga which create game in db
 * and join game by creator
 * and if failed then dispatch error
 */
function* createGame({username, playersForStart}: ICreateGame) {
  const game = {
    playersForStart,
    name: `Создатель игры: ${username}`,
    roundsForWin: remoteConfig.getNumber('K'),
    playersCount: 0,
  };

  const player = playerData(username);

  try {
    yield put ( loadingOn() );
    const { id: gameId } = yield call(DB.addGameWithPlayer, game, player);
    yield put( updateUserProfile({displayName: username}) );
    yield call(navigate, `/game/${gameId}`);
    yield put ( loadingOff() );
  } catch (e) {
    yield put ( loadingOff() );
    yield put( addAppError(e) );
  }
}

export const createGameSagas = [
  takeLatest(CREATE_GAME, createGame),
];