
import { IGame } from 'redux/reducers/game/types';

export type IGameList = Array<IGame>;

export interface ICreateGame {
    type: string
    payload: IGame
}

export type ActionTypes = ICreateGame;