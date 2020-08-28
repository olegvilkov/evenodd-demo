import { IPlayerListState } from './types';

export const selectPlayers = (state: IPlayerListState) => state.playerlist;
