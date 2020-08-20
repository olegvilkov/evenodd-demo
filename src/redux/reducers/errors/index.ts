import { APP_ERROR, CLEAR_APP_ERRORS } from '../../actionTypes';
import { IAppErrors, ActionTypes } from './types'

const initialState: IAppErrors = [];

/**
 * Обработка событий текущей игры
 */
export default function errorsReducer (state = initialState, action: ActionTypes) {
  switch (action.type) {
    
    case APP_ERROR:
     return [...state, action.error];

    case CLEAR_APP_ERRORS:
      return []
        
    default:
      return state;
  }
}