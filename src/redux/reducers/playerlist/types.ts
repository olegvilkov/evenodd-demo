import { PLAYERS_ADD_PLAYER, PLAYERS_CHANGE_PLAYER } from 'redux/actionTypes';

export interface IPlayer {
    id?: string
    name: string
    order: number
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

export type ActionTypes = IChangePlayer | IAddPlayer;