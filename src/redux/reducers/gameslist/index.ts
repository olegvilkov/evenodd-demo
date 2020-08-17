import { ADD_GAME_TO_LIST } from '../../actionTypes';
import { ActionTypes, IGameList } from './types';

const initialState: IGameList = [
     {title: 'TEST_GAME_1', id: '1'},
     {title: 'TEST_GAME_2', id: '2'},
];

export default function rssReducer (state = initialState, action: ActionTypes) {
  switch (action.type) {
    
    case ADD_GAME_TO_LIST:
      return [...state, action.payload];
        
    default:
      return state;
  }
}
