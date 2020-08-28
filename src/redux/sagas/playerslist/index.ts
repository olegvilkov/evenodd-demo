
import { PLAYERS_UNSUBSCRIBE, PLAYERS_SUBSCRIBE } from 'redux/actionTypes';
import { addAppError } from 'redux/reducers/errors/actions';
import { addPlayer, changePlayer } from 'redux/reducers/playerlist/actions';
import { take, put, takeLatest } from 'redux-saga/effects';
import { eventChannel, EventChannel } from 'redux-saga';
import { ISubscribeGamePlayers } from './types';
import * as DB from 'database';

let channel: EventChannel<unknown> | null;

/**
 * saga wich subscribe on aauthorization changes
 */
function* subscribeToGamePlayers ({gameId}: ISubscribeGamePlayers) {
  try {
    channel = eventChannel(emit => {
      // returns unsubscribe
      return DB.listenGamePlayers( gameId, emit );
    });

    while (true) {
      const action = yield take(channel);
      
      switch (action.type) {
        case "added":
          yield put( addPlayer(action.payload) );
          break;
        case "modified":
          yield put( changePlayer(action.payload) );
          break;
      }
    }

  } catch (e) {
    yield put( addAppError(e.message) );
  }
}

/**
 * saga which stop listen changes ln game players list
 */
function* unSubscribeFromGamePlayers() {
  if (channel) {
    channel.close();
  }
}

export const playerListSagas = [
    takeLatest(PLAYERS_SUBSCRIBE, subscribeToGamePlayers),
    takeLatest(PLAYERS_UNSUBSCRIBE, unSubscribeFromGamePlayers),
];