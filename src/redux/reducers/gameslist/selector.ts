import { IGamesListState } from './types';

export const selectGamesList = (state: IGamesListState) => state.gameslist.list;
export const selectGamesListLoading = (state: IGamesListState) => state.gameslist.isLoading;
