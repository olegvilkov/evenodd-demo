import { GAME_SUBSCRIBE, GAME_UNSUBSCRIBE } from 'redux/actionTypes';
import { ISubscribeToGame, IUnSubscribeFromGame } from './types';

export const subscribeToGame = (gameId: string): ISubscribeToGame => ({
  type: GAME_SUBSCRIBE,
  gameId,
})

export const unSubscribeFromGame = (): IUnSubscribeFromGame => ({
  type: GAME_UNSUBSCRIBE,
})