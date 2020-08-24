
import { GAME_UPDATE, GAME_CLEAR } from 'redux/actionTypes';

export interface IGame {
    id?: string
    name: string
    playersCount: number
    playersForStart: number
    roundsForWin: number
    winner?: string
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