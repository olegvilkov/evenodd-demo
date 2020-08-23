import { GAMES_LIST_SUBSCRIBE, GAMES_LIST_UNSUBSCRIBE } from 'redux/actionTypes';
import { IGamesListenerAction } from './types';

export const subcribeToGamesList = (): IGamesListenerAction => ({
  type: GAMES_LIST_SUBSCRIBE,
})

export const unSubcribeToGamesList = (): IGamesListenerAction => ({
  type: GAMES_LIST_UNSUBSCRIBE,
})