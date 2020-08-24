import { IGameState } from './types';

export const selectCurrentGame = (state: IGameState) => state.currentgame;
export const selectCurrentGameName = (state: IGameState) => selectCurrentGame(state).name;
