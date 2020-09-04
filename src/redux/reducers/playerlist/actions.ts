import { PLAYERS_ADD_PLAYER, PLAYERS_CHANGE_PLAYER, PLAYERS_CLEAR } from 'redux/actionTypes';
import { IAddPlayer, IChangePlayer, IPlayer, IClearPlayers } from './types';

export const addPlayer = (payload: IPlayer): IAddPlayer => ({
  type: PLAYERS_ADD_PLAYER,
  payload,
})

export const changePlayer = (payload: IPlayer): IChangePlayer => ({
  type: PLAYERS_CHANGE_PLAYER,
  payload,
})

export const clearPlayers = (): IClearPlayers => ({
  type: PLAYERS_CLEAR,
})

