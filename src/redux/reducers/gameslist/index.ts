import { GAMES_LIST_CHANGE_GAME, GAMES_LIST_ADD_GAME, GAMES_LIST_DELETE_GAME, GAMES_LIST_CLEAR } from '../../actionTypes';
import { ActionTypes, IGameList } from './types';

const initialState: IGameList = [];

/**
 * Обработка событий списка игр
 */
export default function gamesListReducer (state = initialState, action: ActionTypes) {
  switch (action.type) {
    
    case GAMES_LIST_ADD_GAME:
      return [...state, action.payload];

    case GAMES_LIST_CHANGE_GAME:
      return state.map(game => game.id == action.payload.id ? action.payload : game);

    case GAMES_LIST_DELETE_GAME:
      return state.filter(game => game.id != action.payload.id);
    
    case GAMES_LIST_CLEAR:
      return [];

    default:
      return state;
  }
}
