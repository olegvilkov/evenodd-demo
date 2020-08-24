import { GAME_UPDATE, GAME_CLEAR } from 'redux/actionTypes';
import { IGame, IGameClear, IGameUpdate } from './types';

export const updateCurrentGame = (payload: IGame): IGameUpdate => ({
  type: GAME_UPDATE,
  payload,
})

export const clearCurrentGame = (): IGameClear => ({
  type: GAME_CLEAR,
})
