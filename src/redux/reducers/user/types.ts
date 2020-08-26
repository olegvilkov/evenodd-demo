
import { USER_UPDATE_PROFILE_SUCCESS } from 'redux/actionTypes';

export interface IUser {
    uid: string
    name: string
}

export interface IUserState {
    user: IUser
}

export interface IUserSetName {
    type: typeof USER_UPDATE_PROFILE_SUCCESS
    payload: firebase.User
}

export type UserActionType = IUserSetName;