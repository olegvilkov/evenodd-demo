import { GAME_ANSWER } from 'redux/actionTypes';
import { addAppError } from 'redux/reducers/errors/actions';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import { IMakeAnswer } from './types';
import { loadingOn, loadingOff } from 'redux/reducers/loading/actions';
import { selectCurrentGame } from 'redux/reducers/currentgame/selector';
import { selectUser } from 'redux/reducers/user/selector';
import * as DB from 'database';

/**
 * Saga wich
 * - Save user answer
 * - Increase player points if answer correct
 * - Finish player turn.
 * @param param0 
 */
function* makeAnswer({evenodd, number}: IMakeAnswer) {
  const {id: gameId, order} = yield select( selectCurrentGame );
  const {uid} = yield select( selectUser );
  const nextOrder = [...order];

  // Текущий игрок уходит в конец очереди
  nextOrder.push(nextOrder.shift());

  yield put( loadingOn() );
  
  yield call(DB.setGameAnswerEvenOdd, gameId, evenodd);

  try {
    
    yield call(DB.runGameAnswerTransaction, gameId, (transaction, answerDoc) => {
      const prevNumber = (answerDoc as IMakeAnswer).number;
      const isAnswerCorrect = (
        prevNumber % 2 === 1 && evenodd == DB.EvenOdd.Odd
        || prevNumber % 2 === 0 && evenodd == DB.EvenOdd.Even
      );

      if (prevNumber !== null && isAnswerCorrect) {
        DB.increaseGamePlayerPoints(gameId, uid, transaction);
      }

      DB.updateGameAnswerNumber(gameId, number, transaction);
      DB.decreaseGameTurns(gameId, transaction);
      DB.updateGameOrder(gameId, nextOrder, transaction);
    });

  } catch (e) {
    yield put( addAppError(e) );
  }

  yield put ( loadingOff() );
}

export const answerSagas = [
  takeLatest(GAME_ANSWER, makeAnswer)
];