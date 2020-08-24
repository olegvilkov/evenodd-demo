import { GAMES_LIST_SUBSCRIBE, GAMES_LIST_UNSUBSCRIBE } from 'redux/actionTypes';
import { IGame } from 'redux/reducers/currentgame/types';

export interface IGamesListenerAction {
    type: typeof GAMES_LIST_SUBSCRIBE | typeof GAMES_LIST_UNSUBSCRIBE
}

export interface IGamesListAction {
    type: string
    payload: IGame
}

export type ChangeGamesListType = (action: IGamesListAction) => void;