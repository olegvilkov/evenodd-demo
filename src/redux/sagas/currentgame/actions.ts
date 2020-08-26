import { GAME_SUBSCRIBE, GAME_UNSUBSCRIBE, GAME_ANSWER } from 'redux/actionTypes';
import { ISubscribeToGame, IUnSubscribeFromGame, IMakeAnswer } from './types';
import { EvenOdd } from 'database';

export const subscribeToGame = (gameId: string): ISubscribeToGame => ({
  type: GAME_SUBSCRIBE,
  gameId,
})

export const unSubscribeFromGame = (): IUnSubscribeFromGame => ({
  type: GAME_UNSUBSCRIBE,
})

export const makeAnswer = (evenodd: EvenOdd, number: number): IMakeAnswer => ({
  type: GAME_ANSWER,
  evenodd,
  number
})