import { ILoadingState } from './types';

export const selectLoading = (state: ILoadingState) => state.loading;
export const selectIsLoading = (state: ILoadingState) => selectLoading(state).isLoading;
