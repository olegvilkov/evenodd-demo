import { PLAYERS_ADD_PLAYER, PLAYERS_CHANGE_PLAYER } from 'redux/actionTypes';
import { IAddPlayer, IChangePlayer, IPlayer } from './types';

export const addPlayer = (payload: IPlayer): IAddPlayer => ({
  type: PLAYERS_ADD_PLAYER,
  payload,
})

export const changePlayer = (payload: IPlayer): IChangePlayer => ({
  type: PLAYERS_CHANGE_PLAYER,
  payload,
})

