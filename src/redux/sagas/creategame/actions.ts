import { CREATE_GAME } from 'redux/actionTypes';
import { ICreateGame } from './types';
import { IGame } from 'redux/reducers/game/types';

export const changeGameInList = (gameItem: IGame): ICreateGame => ({
  type: CREATE_GAME,
  payload: gameItem,
})