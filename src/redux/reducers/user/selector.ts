import { IUserState } from './types';

export const selectUser = (state: IUserState) => state.user;
export const selectUserName = (state: IUserState) => selectUser(state).name;
