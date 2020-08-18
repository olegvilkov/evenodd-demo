import { GAMES_LIST_CHANGE } from '../../actionTypes';
import { ActionTypes, IGameList } from './types';

const initialState: IGameList = [
     {name: 'TEST_GAME_1', id: '1', playersCount:4, playersForStart:5, minRoundsForWin: 10},
     {name: 'TEST_GAME_2', id: '2', playersCount:4, playersForStart:5, minRoundsForWin: 10},
];

/**
 * Обработка событий списка игр
 */
export default function gamesListReducer (state = initialState, action: ActionTypes) {
  switch (action.type) {
    
    case GAMES_LIST_CHANGE:
      return [...state, action.payload];
        
    default:
      return state;
  }
}
