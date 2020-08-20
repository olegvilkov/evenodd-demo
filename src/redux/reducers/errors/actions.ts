import { APP_ERROR, DELETE_APP_ERRORS } from '../../actionTypes';
import { IAddError, IDeleteErrors, IAppErrors } from './types';

export const addAppError = (error: Error): IAddError => ({
  type: APP_ERROR,
  error,
});

export const deleteAppErrors = (errors: IAppErrors): IDeleteErrors => ({
  type: DELETE_APP_ERRORS,
  errors,
});