import { PLAYERS_SUBSCRIBE, PLAYERS_UNSUBSCRIBE } from 'redux/actionTypes';
import { ISubscribeGamePlayers, IUnsubscribeGamePlayers } from './types';

export const subscribeToGamePlayers = (gameId: string): ISubscribeGamePlayers => ({
  type: PLAYERS_SUBSCRIBE,
  gameId
})

export const unSubscribeFromGamePlayers = (): IUnsubscribeGamePlayers => ({
  type: PLAYERS_UNSUBSCRIBE,
})