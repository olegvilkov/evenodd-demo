import { GAMES_LIST_CHANGE_GAME, GAMES_LIST_ADD_GAME, GAMES_LIST_DELETE_GAME, GAMES_LIST_CLEAR, GAMES_LIST_LOADING_START, GAMES_LIST_LOADING_STOP } from '../../actionTypes';
import { ActionTypes, IGameList } from './types';

const initialState: IGameList = {
  isLoading: false,
  list: []
};

/**
 * Обработка событий списка игр
 */
export default function gamesListReducer (state = initialState, action: ActionTypes) {
  switch (action.type) {
    
    case GAMES_LIST_ADD_GAME:
      const game = {
        ...action.payload,
        playersCount: action.payload.order.length
      }
      return {...state, list: [...state.list, game]};

    case GAMES_LIST_CHANGE_GAME:
      const update = {
        ...action.payload,
        playersCount: action.payload.order.length}
      ;
      return {
        ...state,
        list: state.list.map(game => game.id == action.payload.id ? update : game)
      };

    case GAMES_LIST_DELETE_GAME:
      return {
        ...state,
        list: state.list.filter(game => game.id != action.payload.id)
      };
    
    case GAMES_LIST_CLEAR:
      return {
        ...state,
        list: []
      };

    case GAMES_LIST_LOADING_START:
      return {
        ...state,
        isLoading: true
      };

    case GAMES_LIST_LOADING_STOP:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
