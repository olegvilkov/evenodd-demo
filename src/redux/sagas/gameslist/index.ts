import { GAMES_LIST_SUBSCRIBE, GAMES_LIST_UNSUBSCRIBE } from 'redux/actionTypes';
import { addAppError } from 'redux/reducers/errors/actions';
import { addGame, deleteGame, changeGame } from 'redux/reducers/gameslist/actions';
import { take, put, takeLatest } from 'redux-saga/effects';
import { eventChannel, EventChannel } from 'redux-saga'
import * as DB from 'database';

let gamesListChannel: EventChannel<unknown> | null = null;

/**
 * saga which start listen changes ln list of games
 */
function* subcribeToGamesList() {
  try {
    // const unsubscibe = yield call(DB.subcribeToGamesList, onGamesListChanged);

    gamesListChannel = eventChannel(emit => {
      // return unsubscribe
      return DB.subcribeToGamesList( emit );
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
      }
      
    }

  } catch (e) {
    yield put( addAppError(e.message) );
  }
}

/**
 * saga which stop listen changes ln list of games
 */
function* unSubcribeToGamesList() {
  if (gamesListChannel) {
    gamesListChannel.close();
  }
}

export const gamesListSagas = [
  takeLatest(GAMES_LIST_SUBSCRIBE, subcribeToGamesList),
  takeLatest(GAMES_LIST_UNSUBSCRIBE, unSubcribeToGamesList),
];