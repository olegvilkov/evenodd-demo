import { GAMES_LIST_SUBSCRIBE, GAMES_LIST_UNSUBSCRIBE } from 'redux/actionTypes';
import { IGamesListenerAction } from './types';

export const subscribeToGamesList = (): IGamesListenerAction => ({
  type: GAMES_LIST_SUBSCRIBE,
})

export const unSubscribeToGamesList = (): IGamesListenerAction => ({
  type: GAMES_LIST_UNSUBSCRIBE,
})