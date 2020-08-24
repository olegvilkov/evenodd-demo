import { GAME_SUBSCRIBE, GAME_UNSUBSCRIBE } from 'redux/actionTypes';
import { IGame } from 'redux/reducers/currentgame/types';

export interface ISubscribeToGame {
    type: typeof GAME_SUBSCRIBE
    gameId: string
}

export interface IUnSubscribeFromGame {
    type: typeof GAME_UNSUBSCRIBE
}

export type ChangeGameCallbackType = (game: IGame) => void;