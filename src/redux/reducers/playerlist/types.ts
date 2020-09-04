import { PLAYERS_ADD_PLAYER, PLAYERS_CHANGE_PLAYER, PLAYERS_CLEAR } from 'redux/actionTypes';

export interface IPlayer {
    id?: string
    name: string
    points: number
}

export type IPlayerList = Array<IPlayer>

export interface IPlayerListState {
    playerlist: IPlayerList
}

export interface IChangePlayer {
    type: typeof PLAYERS_CHANGE_PLAYER
    payload: IPlayer
}

export interface IAddPlayer {
    type: typeof PLAYERS_ADD_PLAYER
    payload: IPlayer
}

export interface IClearPlayers {
    type: typeof PLAYERS_CLEAR
}

export type ActionTypes = IChangePlayer | IAddPlayer | IClearPlayers;