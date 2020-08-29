import { GAME_SUBSCRIBE, GAME_UNSUBSCRIBE, GAME_ANSWER } from 'redux/actionTypes';
import { addAppError } from 'redux/reducers/errors/actions';
import { take, put, takeLatest, select, call, takeEvery } from 'redux-saga/effects';
import { eventChannel, EventChannel } from 'redux-saga';
import { ISubscribeToGame, IMakeAnswer } from './types';
import { loadingOn, loadingOff } from 'redux/reducers/loading/actions';
import { selectCurrentGame } from 'redux/reducers/currentgame/selector';
import { selectUser } from 'redux/reducers/user/selector';
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

/**
 * Saga wich
 * - Save user answer
 * - Increase player points if answer correct
 * - Finish player turn.
 * @param param0 
 */
function* makeAnswer({evenodd, number}: IMakeAnswer) {
  const {gameId} = yield select( selectCurrentGame );
  const {uid} = yield select( selectUser );

  yield put( loadingOn() );
  
  yield call(DB.setGameAnswerEvenOdd, gameId, evenodd);

  try {
    
    yield call(DB.runGameAnswerTransaction, gameId, (transaction, answerDoc) => {
      const prevNumber = (answerDoc as IMakeAnswer).number;
      const isAnswerCorrect = prevNumber % 2 && evenodd == DB.EvenOdd.Odd;

      DB.increaseGamePlayerPoints(gameId, uid, transaction);
      if (prevNumber && isAnswerCorrect) {
        DB.increaseGamePlayerPoints(gameId, uid, transaction);
      }

      // DB.updateGameAnswerNumber(gameId, number, transaction);
      // DB.increasePlayerRound(gameId, playerId, transaction);
    });

  } catch (e) {
    yield put( addAppError(e) );
  }

  yield put ( loadingOff() );
}

export const currentGameSagas = [
  takeEvery(GAME_SUBSCRIBE, subscribeToGame),
  takeLatest(GAME_UNSUBSCRIBE, unSubscribeFromGame),
  takeLatest(GAME_ANSWER, makeAnswer)
];