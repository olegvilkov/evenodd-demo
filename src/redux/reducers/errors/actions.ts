import { APP_ERROR, APP_DELETE_ERRORS } from '../../actionTypes';
import { IAddError, IDeleteErrors, IAppErrors } from './types';

export const addAppError = (error: Error): IAddError => ({
  type: APP_ERROR,
  error,
});

export const deleteAppErrors = (errors: IAppErrors): IDeleteErrors => ({
  type: APP_DELETE_ERRORS,
  errors,
});