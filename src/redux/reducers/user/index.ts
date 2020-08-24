import { USER_SET_NAME } from 'redux/actionTypes';
import { IUser, UserActionType } from './types';

const initialState: IUser = {
  name: ''
};

/**
 * Обработка событий состояния текущей игры
 */
export default function userReducer (state = initialState, action: UserActionType) {
  switch (action.type) {
    
    case USER_SET_NAME:
      return {...state, name: action.payload};
        
    default:
      return state;
  }
}