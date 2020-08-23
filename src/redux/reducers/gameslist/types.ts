import { GAMES_LIST_CHANGE_GAME, GAMES_LIST_ADD_GAME, GAMES_LIST_DELETE_GAME } from 'redux/actionTypes';
import { IGame } from './../game/types';

export type IGameList = Array<IGame>;

export interface IGameListAction {
    type: typeof GAMES_LIST_ADD_GAME | typeof GAMES_LIST_CHANGE_GAME | typeof GAMES_LIST_DELETE_GAME
    payload: IGame
}

export interface IGamesListState {
    gameslist: IGameList
}

export type ActionTypes = IGameListAction;