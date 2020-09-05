
import { GAME_UPDATE, GAME_CLEAR } from 'redux/actionTypes';

export interface IStoreGame {
    id?: string
    name: string
    playersForStart: number
    turns: number
    order: Array<string>
    winner?: string
    leader?: string
}

export interface IGame extends IStoreGame{
    playersCount: number
    isLoading: boolean
}

export interface IGameUpdate {
    type: typeof GAME_UPDATE
    payload: IGame
}

export interface IGameClear {
    type: typeof GAME_CLEAR
}

export interface IGameState {
    currentgame: IGame
}

export type GameActionType = IGameUpdate | IGameClear;