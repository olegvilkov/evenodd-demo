import { CREATE_GAME } from 'redux/actionTypes';
import { ICreateGame } from './types';
import { takeLatest, call, put } from 'redux-saga/effects';
import { remoteConfig } from 'utils/firebase';
import { addAppError } from 'redux/reducers/errors/actions';
import { setUserName } from 'redux/reducers/user/actions';
import { loadingOn, loadingOff } from 'redux/reducers/loading/actions';
import { joinGame } from 'redux/sagas/joingame/actions';
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

  try {
    const { id: gameId } = yield call(DB.addGame, game);
    yield put ( loadingOn() );
    yield put( setUserName(username) );
    try {
      yield put( joinGame(gameId, username) );
    } catch (e) {
      yield call ( navigate, `/join/${gameId}` );
    }
  } catch (e) {
    yield put ( loadingOff() );
    yield put( addAppError(e) );
  }
}

export const createGameSagas = [
  takeLatest(CREATE_GAME, createGame),
];