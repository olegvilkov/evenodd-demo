import { APP_LOADING_OFF, APP_LOADING_ON } from '../../actionTypes';
import { ActionTypes, ILoading } from './types';

const initialState: ILoading = {
  isLoading: false
};

/**
 * Обработка событий списка игр
 */
export default function gamesListReducer (state = initialState, action: ActionTypes) {
  switch (action.type) {

    case APP_LOADING_OFF:
      return {isLoading: false};
    
    case APP_LOADING_ON:
      return {isLoading: true};
        
    default:
      return state;
  }
}
