
import { IGame } from './../game/types';

export type IGameList = Array<IGame>;

export interface IChangeGameInList {
    type: string
    payload: IGame
}

export type ActionTypes = IChangeGameInList;