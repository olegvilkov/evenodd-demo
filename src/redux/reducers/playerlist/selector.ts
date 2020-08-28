import { IPlayerListState } from './types';

export const selectGamesList = (state: IPlayerListState) => state.playerlist;
