import { CREATE_GAME } from 'redux/actionTypes';
import { ICreateGame } from './types';

export const createGame = (username: string, playersForStart: number): ICreateGame => ({
  type: CREATE_GAME,
  username,
  playersForStart,
})