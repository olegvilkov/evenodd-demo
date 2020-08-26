import { USER_UPDATE_PROFILE_SUCCESS } from 'redux/actionTypes';
import { IUserSetName } from './types';

export const updateUserProfileSuccess = (payload: firebase.User): IUserSetName => ({
  type: USER_UPDATE_PROFILE_SUCCESS,
  payload,
})
