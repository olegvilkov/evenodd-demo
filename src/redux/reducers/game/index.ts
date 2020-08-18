import { IGame } from './types';

const initialState: IGame = {
    name: 'TEST_GAME_1',
    id: '1',
    playersCount: 4,
    playersForStart: 5,
    minRoundsForWin: 10,
    winner: '',
};

/**
 * Обработка событий текущей игры
 */
export default function gameReducer (state = initialState) {
  // switch (action.type) {
    
    // case ADD_GAME_TO_LIST:
    //   return [...state, action.payload];
        
    // default:
      return state;
  // }
}