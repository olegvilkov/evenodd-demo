import { GAME_UPDATE } from 'redux/actionTypes';
import { IGame, IGameActionType } from './types';

const initialState: IGame | object = {};

/**
 * Обработка событий состояния текущей игры
 */
export default function gameReducer (state = initialState, action: IGameActionType) {
  switch (action.type) {
    
    case GAME_UPDATE:
      return action.payload;
        
    default:
      return state;
  }
}