import { CREATE_GAME } from 'redux/actionTypes';
import { ICreateGame } from './types';
// import { TemplateLibrary, Template } from '@accordproject/cicero-core';
import { takeLatest, call, put, select, takeEvery } from 'redux-saga/effects';
import { remoteConfig } from 'utils/firebase';
import { addAppError } from 'redux/reducers/errors/actions';
import * as DB from 'database';

// import * as actions from '../actions/templatesActions';
// import * as selectors from '../selectors/templatesSelectors';


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
  } catch (e) {
    yield put( addAppError(e) );
  }
}

/**
 * saga which add user to game
 * and if failed then dispatch error
 */
function* joinGame(gameId: string, username: string) {
  const player = {
    name: username,
    order: 0,
    points: 0,
  };
  try {
    yield call(DB.addPlayerToGame, gameId, player);
  } catch (e) {
    yield put( addAppError(e) );
  }  
}


export const createGameSagas = [
  takeLatest(CREATE_GAME, createGame),
];