import { APP_ERROR, DELETE_APP_ERRORS } from '../../actionTypes';
import { IAppErrors, ActionTypes } from './types'

const initialState: IAppErrors = [];

/**
 * Обработка событий текущей игры
 */
export default function errorsReducer (state = initialState, action: ActionTypes) {
  switch (action.type) {
    
    case APP_ERROR:
      return [...state, action.error];

    case DELETE_APP_ERRORS:
      return state.filter(e => !action.errors.includes(e))
        
    default:
      return state;
  }
}