import { GAMES_LIST_ADD_GAME, GAMES_LIST_CHANGE_GAME, GAMES_LIST_DELETE_GAME } from 'redux/actionTypes';
import { IGame } from '../currentgame/types';
import { IGameListAction } from './types';

export const addGame = (payload: IGame): IGameListAction => ({
  type: GAMES_LIST_ADD_GAME,
  payload,
})

export const changeGame = (payload: IGame): IGameListAction => ({
  type: GAMES_LIST_CHANGE_GAME,
  payload,
})

export const deleteGame = (payload: IGame): IGameListAction => ({
  type: GAMES_LIST_DELETE_GAME,
  payload,
})

