import { USER_UPDATE_PROFILE_SUCCESS } from 'redux/actionTypes';
import { IUser, UserActionType } from './types';

const initialState: IUser = {
  name: '',
  uid: '',
  isAnonymous: false,
};

/**
 * Обработка событий состояния текущей игры
 */
export default function userReducer (state = initialState, action: UserActionType) {
  switch (action.type) {
    
    case USER_UPDATE_PROFILE_SUCCESS:
      const user = action.payload;
      return {...state,
        name: user.displayName || "",
        uid: user.uid,
        isAnonymous: user.isAnonymous,
      };
        
    default:
      return state;
  }
}