import { ADD_GAME_TO_LIST } from 'redux/actionTypes';
import { IGameItem, IAddGameToList } from './types';

export const addGameToList = (gameItem: IGameItem): IAddGameToList => ({
  type: ADD_GAME_TO_LIST,
  payload: gameItem,
})