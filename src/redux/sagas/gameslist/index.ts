import { GAMES_LIST_SUBSCRIBE, GAMES_LIST_UNSUBSCRIBE } from 'redux/actionTypes';
import { addAppError } from 'redux/reducers/errors/actions';
import { addGame, deleteGame, changeGame, clearGamesList, loadingGamesList } from 'redux/reducers/gameslist/actions';
import { take, put, takeLatest } from 'redux-saga/effects';
import { eventChannel, EventChannel } from 'redux-saga'
import * as DB from 'database';

let gamesListChannel: EventChannel<unknown> | null = null;

/**
 * saga which start listen changes ln list of games
 */
function* subscribeToGamesList() {
  yield put( loadingGamesList(true) );

  try {
    gamesListChannel = eventChannel(emit => {
      // return unsubscribe
      return DB.listenGamesCollection( emit );
    });

    while (true) {
      const action = yield take(gamesListChannel);
      
      switch (action.type) {
        case "added":
          yield put( addGame(action.payload) );
          break;
        case "removed":
          yield put( deleteGame(action.payload) );
          break;
        case "modified":
          yield put( changeGame(action.payload) );
          break;
        case "ready":
          yield put( loadingGamesList(false) );
          break;
      }
      
    }

  } catch (e) {
    yield put( addAppError(e.message) );
  }
}

/**
 * saga which stop listen changes ln list of games
 */
function* unSubscribeToGamesList() {
  if (gamesListChannel) {
    gamesListChannel.close();
    yield put ( clearGamesList() );
  }
}

export const gamesListSagas = [
  takeLatest(GAMES_LIST_SUBSCRIBE, subscribeToGamesList),
  takeLatest(GAMES_LIST_UNSUBSCRIBE, unSubscribeToGamesList),
];