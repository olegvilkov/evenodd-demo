import { APP_ERROR, CLEAR_APP_ERRORS } from '../../actionTypes';

export const addAppError = (error: string) => ({
  type: APP_ERROR,
  error,
});

export const clearAppErrors = () => ({
  type: CLEAR_APP_ERRORS,
});