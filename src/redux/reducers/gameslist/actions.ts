import { GAMES_LIST_ADD_GAME, GAMES_LIST_CHANGE_GAME, GAMES_LIST_DELETE_GAME, GAMES_LIST_CLEAR, GAMES_LIST_LOADING } from 'redux/actionTypes';
import { IGame } from '../currentgame/types';
import { IGameListDelete, IGameListClear, IGameListChange, IGameListAdd, IGameListLoading } from './types';

export const addGame = (payload: IGame): IGameListAdd => ({
  type: GAMES_LIST_ADD_GAME,
  payload,
})

export const changeGame = (payload: IGame): IGameListChange => ({
  type: GAMES_LIST_CHANGE_GAME,
  payload,
})

export const deleteGame = (payload: IGame): IGameListDelete => ({
  type: GAMES_LIST_DELETE_GAME,
  payload,
})

export const clearGamesList = (): IGameListClear => ({
  type: GAMES_LIST_CLEAR,
})

export const loadingGamesList = (payload: boolean): IGameListLoading => ({
  type: GAMES_LIST_LOADING,
  payload,
})
