
import { GAME_UPDATE } from 'redux/actionTypes';

export interface IGame {
    id?: string
    name: string
    playersCount: number
    playersForStart: number
    roundsForWin: number
    winner?: string
}

export interface IGameActionType {
    type: typeof GAME_UPDATE
    payload: IGame
}

export interface IGameState {
    currentgame: IGame
}