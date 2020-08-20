import { IAppErrorsState } from './types';

export const selectErrors = (state: IAppErrorsState) => state.errors;
