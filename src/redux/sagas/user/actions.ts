import { USER_AUTH, USER_UPDATE_PROFILE } from 'redux/actionTypes';
import { IAuthUser, IUpdateUserProfile, IUserProfile } from './types';

export const updateUserProfile = (profile: IUserProfile): IUpdateUserProfile => ({
  type: USER_UPDATE_PROFILE,
  profile,
})

export const subscribeToAuth = (): IAuthUser => ({
  type: USER_AUTH,
})
