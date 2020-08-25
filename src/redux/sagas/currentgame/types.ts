import { GAME_SUBSCRIBE, GAME_UNSUBSCRIBE, GAME_ANSWER } from 'redux/actionTypes';
import { IGame } from 'redux/reducers/currentgame/types';
import { EvenOdd } from "database";

export interface IMakeAnswer {
    type: typeof GAME_ANSWER
    evenodd: EvenOdd
    number: number
}

export interface ISubscribeToGame {
    type: typeof GAME_SUBSCRIBE
    gameId: string
}

export interface IUnSubscribeFromGame {
    type: typeof GAME_UNSUBSCRIBE
}

export type ChangeGameCallbackType = (game: IGame) => void;