import { USER_SET_NAME } from 'redux/actionTypes';
import { IUserSetName } from './types';

export const setUserName = (payload: string): IUserSetName => ({
  type: USER_SET_NAME,
  payload,
})
