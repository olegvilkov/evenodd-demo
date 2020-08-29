import { GAMES_LIST_CHANGE_GAME, GAMES_LIST_ADD_GAME, GAMES_LIST_DELETE_GAME, GAMES_LIST_CLEAR } from 'redux/actionTypes';
import { IGame } from '../currentgame/types';

export type IGameList = Array<IGame>;

export interface IGameListAdd {
    type: typeof GAMES_LIST_ADD_GAME
    payload: IGame
}

export interface IGameListChange {
    type: typeof GAMES_LIST_CHANGE_GAME
    payload: IGame
}

export interface IGameListDelete {
    type: typeof GAMES_LIST_DELETE_GAME
    payload: IGame
}

export interface IGameListClear {
    type: typeof GAMES_LIST_CLEAR
}

export interface IGamesListState {
    gameslist: IGameList
}

export type ActionTypes = IGameListAdd | IGameListChange | IGameListDelete | IGameListClear;