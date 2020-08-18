import { GAMES_LIST_CHANGE } from 'redux/actionTypes';
import { IChangeGameInList } from './types';
import { IGame } from './../game/types';

export const changeGameInList = (gameItem: IGame): IChangeGameInList => ({
  type: GAMES_LIST_CHANGE,
  payload: gameItem,
})