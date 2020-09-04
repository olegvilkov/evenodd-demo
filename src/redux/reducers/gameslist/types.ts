import { GAMES_LIST_CHANGE_GAME, GAMES_LIST_ADD_GAME, GAMES_LIST_DELETE_GAME, GAMES_LIST_CLEAR, GAMES_LIST_LOADING_START, GAMES_LIST_LOADING_STOP } from 'redux/actionTypes';
import { IGame } from '../currentgame/types';

export type IGameList = {
    isLoading: boolean
    list: Array<IGame>
}

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

export interface IGameListLoadingStart {
    type: typeof GAMES_LIST_LOADING_START
}

export interface IGameListLoadingStop {
    type: typeof GAMES_LIST_LOADING_STOP
}

export interface IGamesListState {
    gameslist: IGameList
}

export type ActionTypes = IGameListAdd | IGameListChange | IGameListDelete | IGameListClear | IGameListLoadingStart | IGameListLoadingStop;