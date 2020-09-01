import { GAME_UPDATE, GAME_CLEAR } from 'redux/actionTypes';
import { IGame, GameActionType } from './types';

const initialState: IGame | object = {};

/**
 * Обработка событий состояния текущей игры
 */
export default function gameReducer (state = initialState, action: GameActionType) {
  switch (action.type) {
    
    case GAME_UPDATE:
      const game = {...state, ...action.payload};
      return {...game, playersCount: game.order ? game.order.length : 0};
    
    case GAME_CLEAR:
      return {};
        
    default:
      return state;
  }
}