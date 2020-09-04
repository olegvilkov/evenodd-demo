import { CREATE_GAME } from 'redux/actionTypes';
import { ICreateGame } from './types';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { remoteConfig } from 'utils/firebase';
import { addAppError } from 'redux/reducers/errors/actions';
import { updateUserProfile } from 'redux/sagas/user/actions';
import { selectUser } from 'redux/reducers/user/selector';
import { loadingOn, loadingOff } from 'redux/reducers/loading/actions';
import { playerData } from '../joingame';
import { navigate } from 'utils/router';
import { IStoreGame } from 'redux/reducers/currentgame/types';
import * as DB from 'database';

/**
 * saga which create game in db
 * and join game by creator
 * and if failed then dispatch error
 */
function* createGame({username, playersForStart}: ICreateGame) {

  // Каждый участник в течение игры делает K-ходов
  const K = remoteConfig.getNumber('K');

  // Количество ходов до завершения игры
  // +1 так как у первого хода нет возможности заработать point.
  const turns = K*playersForStart + 1;

  const game: IStoreGame = {
    playersForStart,
    name: `Игра ${username}`,
    turns,
    order: []
  };

  const player = playerData(username);
  const {uid} = yield select( selectUser );

  try {
    yield put ( loadingOn() );
    const { id: gameId } = yield call(DB.addGameWithPlayer, game, uid, player);
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