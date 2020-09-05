import { GAME_ANSWER } from 'redux/actionTypes';
import { addAppError } from 'redux/reducers/errors/actions';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import { IMakeAnswer } from './types';
import { loadingOn, loadingOff } from 'redux/reducers/loading/actions';
import { selectCurrentGame } from 'redux/reducers/currentgame/selector';
import { selectUser } from 'redux/reducers/user/selector';
import { selectPlayers } from 'redux/reducers/playerlist/selector';
import { IPlayerList } from 'redux/reducers/playerlist/types';
import { isGameEnd, isUserGameLeader} from './helper';
import * as DB from 'database';
import { IUser } from 'redux/reducers/user/types';

/**
 * Saga wich
 * - Save user answer
 * - Increase player points if answer correct
 * - Finish player turn.
 * @param param0 
 */
function* makeAnswer({evenodd, number}: IMakeAnswer) {
  const game = yield select( selectCurrentGame );
  const user: IUser = yield select( selectUser );
  const players: IPlayerList = yield select ( selectPlayers );
  const nextOrder = [...game.order];

  // Текущий игрок уходит в конец очереди
  nextOrder.push(nextOrder.shift());

  yield put( loadingOn() );
  
  try {
    yield call(DB.setGameAnswerEvenOdd, game.id, evenodd);
  } catch (e) {
    yield put( addAppError(e) );
  }

  try {
    
    yield call(DB.runGameAnswerTransaction, game.id, (transaction, answerDoc) => {
      const prevNumber = (answerDoc as IMakeAnswer).number;
      const isAnswerCorrect = (
        (prevNumber % 2 === 1 && evenodd == DB.EvenOdd.Odd
          || prevNumber % 2 === 0 && evenodd == DB.EvenOdd.Even
        ) && prevNumber !== null
      );

      if (isAnswerCorrect) {
        DB.increaseGamePlayerPoints(game.id, user.uid, transaction);
      }

      DB.updateGameAnswerNumber(game.id, number, transaction);
      DB.decreaseGameTurns(game.id, transaction);
      DB.updateGameOrder(game.id, nextOrder, transaction);

      if (isUserGameLeader(user, game, players, isAnswerCorrect)) {

        DB.setGameLeader(game.id, user.uid, transaction);

        if (isGameEnd(game)) {
          DB.setGameWinner(game.id, user.name, transaction);
        }
      }

    });

  } catch (e) {
    yield put( addAppError(e) );
  }

  yield put ( loadingOff() );
}

export const answerSagas = [
  takeLatest(GAME_ANSWER, makeAnswer)
];