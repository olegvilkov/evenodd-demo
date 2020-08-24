import { GAME_UPDATE } from 'redux/actionTypes';
import { IGame } from '../currentgame/types';
import { IGameActionType } from './types';

export const updateCurrentGame = (payload: IGame): IGameActionType => ({
  type: GAME_UPDATE,
  payload,
})

