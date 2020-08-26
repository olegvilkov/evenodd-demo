import { USER_UPDATE_PROFILE_SUCCESS } from 'redux/actionTypes';
import { IUser, UserActionType } from './types';

const initialState: IUser = {
  name: '',
  uid: ''
};

/**
 * Обработка событий состояния текущей игры
 */
export default function userReducer (state = initialState, action: UserActionType) {
  switch (action.type) {
    
    case USER_UPDATE_PROFILE_SUCCESS:
      return {...state, name: action.payload.displayName, uid: action.payload.uid};
        
    default:
      return state;
  }
}