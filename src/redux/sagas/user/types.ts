import { USER_AUTH, USER_UPDATE_PROFILE } from 'redux/actionTypes';

export interface IAuthUser {
    type: typeof USER_AUTH
}

export interface IUserProfile {
   displayName: string
}

export interface IUpdateUserProfile {
    type: typeof USER_UPDATE_PROFILE,
    profile: IUserProfile
}