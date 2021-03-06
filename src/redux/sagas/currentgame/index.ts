import { GAME_SUBSCRIBE, GAME_UNSUBSCRIBE } from 'redux/actionTypes';
import { addAppError } from 'redux/reducers/errors/actions';
import { take, put, takeLatest, select, call, takeEvery } from 'redux-saga/effects';
import { eventChannel, EventChannel } from 'redux-saga';
import { ISubscribeToGame } from './types';
import { selectCurrentGame } from 'redux/reducers/currentgame/selector';
import { updateCurrentGame, clearCurrentGame } from 'redux/reducers/currentgame/actions';
import { navigate } from 'utils/router';
import * as DB from 'database';
import { IGame } from 'redux/reducers/currentgame/types';

let currentGameChannel: EventChannel<unknown> | null = null;

/**
 * Saga which start listener for current game
 */
function* subscribeToGame({gameId}: ISubscribeToGame) {

  const subscribedToGame = yield select( selectCurrentGame );

  if (subscribedToGame.id == gameId) {
    return;
  } else {
    yield unSubscribeFromGame();
  }

  yield put ( updateCurrentGame({ isLoading: true } as IGame) );

  try {
    currentGameChannel = eventChannel(emit => {
      // returns unsubscribe
      return DB.listenGame( gameId, emit );
    });

    while (true) {
      const game = yield take(currentGameChannel);
      
      if (!game.name) {
        yield unSubscribeFromGame();
        yield call(navigate, `/`);
        throw new Error('Game not exists!');
      }

      yield put ( updateCurrentGame({...game, isLoading: false}) );
    }

  } catch (e) {
    yield put( addAppError(e.message) );
  }
}

/**
 * Saga which stop listener for current game
 */
function* unSubscribeFromGame() {
  if (currentGameChannel) {
    currentGameChannel.close();
    yield put ( clearCurrentGame() );
  }
}

export const currentGameSagas = [
  takeEvery(GAME_SUBSCRIBE, subscribeToGame),
  takeLatest(GAME_UNSUBSCRIBE, unSubscribeFromGame)
];