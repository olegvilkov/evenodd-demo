import { IGamesListState } from './types';

export const selectGamesList = (state: IGamesListState) => state.gameslist;
