import { GAMES_LIST_SUBSCRIBE, GAMES_LIST_UNSUBSCRIBE } from 'redux/actionTypes';
import { IGame } from 'redux/reducers/game/types';

export interface IGamesListenerAction {
    type: typeof GAMES_LIST_SUBSCRIBE | typeof GAMES_LIST_UNSUBSCRIBE
}

export interface GamesListActionType {
    type: string
    payload: IGame
}

export type ChangeGamesListType = (action: GamesListActionType) => void;