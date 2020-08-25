import { GAME_SUBSCRIBE, GAME_UNSUBSCRIBE, GAME_ANSWER } from 'redux/actionTypes';
import { addAppError } from 'redux/reducers/errors/actions';
import { take, put, takeLatest, select, call } from 'redux-saga/effects';
import { eventChannel, EventChannel } from 'redux-saga';
import { ISubscribeToGame, IMakeAnswer } from './types';
import { loadingOn, loadingOff } from 'redux/reducers/loading/actions';
import { selectCurrentGame } from 'redux/reducers/currentgame/selector';
import { selectUser } from 'redux/reducers/user/selector';
import { updateCurrentGame, clearCurrentGame } from 'redux/reducers/currentgame/actions';
import * as DB from 'database';

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
      // returns unsubscribe
      return DB.listenGamesDoc( gameId, emit );
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
    yield put ( clearCurrentGame() );
  }
}

/**
 * Saga wich save user answer
 * and increase player points if answer correct
 * and finish player turn
 */
function* makeAnswer({evenodd, number}: IMakeAnswer) {
  const {gameId} = yield select( selectCurrentGame );
  const {playerId} = yield select( selectUser );

  yield put( loadingOn() );
  
  yield call(DB.setGameAnswerEvenOdd, gameId, evenodd);

  // In case if gameanswer wait for number write
  // Try this part not depend from setAnaswerEvenOdd success
  try {
    yield call(DB.runGameAnswerTransaction, gameId, (transaction, answerDoc) => {
      const prevNumber = (answerDoc as IMakeAnswer).number;
      const isAnswerCorrect = prevNumber % 2 && evenodd == DB.EvenOdd.Odd;
      if (isAnswerCorrect) {
        DB.increaseGamePlayerPoints(gameId, playerId, transaction);
      }
      DB.updateGameAnswerNumber(gameId, number, transaction);
      DB.increasePlayerRound(gameId, playerId, transaction);
    });
  } catch (e) {
    yield put( addAppError(e) );
  }

  yield put ( loadingOff() );
}

export const currentGameSagas = [
  takeLatest(GAME_SUBSCRIBE, subscribeToGame),
  takeLatest(GAME_UNSUBSCRIBE, unSubscribeFromGame),
  takeLatest(GAME_ANSWER, makeAnswer)
];