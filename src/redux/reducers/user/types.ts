
import { USER_SET_NAME } from 'redux/actionTypes';

export interface IUser {
    id?: string
    name: string
}

export interface IUserState {
    user: IUser
}

export interface IUserSetName {
    type: typeof USER_SET_NAME
    payload: string
}

export type UserActionType = IUserSetName;