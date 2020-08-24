import { GAME_SUBSCRIBE, GAME_UNSUBSCRIBE } from 'redux/actionTypes';
import { addAppError } from 'redux/reducers/errors/actions';
import { take, put, takeLatest, select } from 'redux-saga/effects';
import { eventChannel, EventChannel } from 'redux-saga';
import { ISubscribeToGame } from './types';
import * as DB from 'database';
import { selectCurrentGame } from 'redux/reducers/currentgame/selector';
import { updateCurrentGame } from 'redux/reducers/currentgame/actions';

let currentGameChannel: EventChannel<unknown> | null = null;

/**
 * saga which start listen current game changes
 */
function* subscribeToGame({gameId}: ISubscribeToGame) {

  const subscribedToGame = yield select( selectCurrentGame );

  if (subscribedToGame.id == gameId) {
    return;
  } else {
    yield unSubscribeFromGame();
  }

  try {
    currentGameChannel = eventChannel(emit => {
      // return unsubscribe
      return DB.subcribeToGame( gameId, emit );
    });

    while (true) {
      const game = yield take(currentGameChannel);
      yield put ( updateCurrentGame(game) );
    }

  } catch (e) {
    yield put( addAppError(e.message) );
  }
}

/**
 * saga which stop listen changes ln game
 */
function* unSubscribeFromGame() {
  if (currentGameChannel) {
    currentGameChannel.close();
  }
}

export const currentGameSagas = [
  takeLatest(GAME_SUBSCRIBE, subscribeToGame),
  takeLatest(GAME_UNSUBSCRIBE, unSubscribeFromGame),
];