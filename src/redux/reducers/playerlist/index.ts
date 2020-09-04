import { PLAYERS_ADD_PLAYER, PLAYERS_CHANGE_PLAYER, PLAYERS_CLEAR } from '../../actionTypes';
import { ActionTypes, IPlayerList } from './types';

const initialState: IPlayerList = [];

/**
 * Обработка событий списка игроков текущей игры
 */
export default function playersReducer (state = initialState, action: ActionTypes) {
  switch (action.type) {
    
    case PLAYERS_ADD_PLAYER:
      return [...state, action.payload];

    case PLAYERS_CHANGE_PLAYER:
      return state.map(player => player.id == action.payload.id ? action.payload : player);

    case PLAYERS_CLEAR:
      return [];
        
    default:
      return state;
  }
}