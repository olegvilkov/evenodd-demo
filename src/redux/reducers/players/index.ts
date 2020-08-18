// import { GAMES_LIST_CHANGE } from '../../actionTypes';
import { ActionTypes, IPlayerList } from './types';

const initialState: IPlayerList = [
  {
    id: '1',
    name: 'TEST_PLAYER_1',
    order: 0,
    points: 0,
  }
];

/**
 * Обработка событий списка игроков текущей игры
 */
export default function playersReducer (state = initialState, action: ActionTypes) {
  // switch (action.type) {
    
    // case GAMES_LIST_CHANGE:
    //   return [...state, action.payload];
        
    // default:
      return state;
  // }
}