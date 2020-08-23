import { CREATE_GAME } from 'redux/actionTypes';
import { ICreateGame } from './types';
import { takeLatest, call, put } from 'redux-saga/effects';
import { remoteConfig } from 'utils/firebase';
import { addAppError } from 'redux/reducers/errors/actions';
import { joinGame } from 'redux/sagas/joingame/actions';
import * as DB from 'database';


/**
 * saga which create game in db
 * and join game by creator
 * and if failed then dispatch error
 */
function* createGame({username, playersForStart}: ICreateGame) {
  const game = {
    playersForStart,
    name: `Создатель: ${username}`,
    roundsForWin: remoteConfig.getNumber('K'),
    playersCount: 0,
  };

  try {
    const createdGame = yield call(DB.createGame, game);
    yield joinGame(createdGame.id, username);
    yield put( joinGame(createdGame.id, username) );
  } catch (e) {
    yield put( addAppError(e) );
  }
}

export const createGameSagas = [
  takeLatest(CREATE_GAME, createGame),
];