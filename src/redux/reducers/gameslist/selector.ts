import { IGameList } from './types';

export interface IGamesState {
    games: IGameList
}

export const selectGamesList = (state: IGamesState) => state.games;
