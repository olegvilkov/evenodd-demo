import { JOIN_GAME } from 'redux/actionTypes';
import { IJoinGame } from './types';

export const joinGame = (gameId: string, username: string): IJoinGame => ({
  type: JOIN_GAME,
  gameId,
  username,
})