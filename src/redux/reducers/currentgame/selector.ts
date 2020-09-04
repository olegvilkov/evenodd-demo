import { createSelector } from 'reselect';
import { IGameState } from './types';
import { selectUser } from '../user/selector';

export const selectCurrentGame = (state: IGameState) => state.currentgame;
export const selectCurrentGameName = (state: IGameState) => selectCurrentGame(state).name;

export const selectIsWaitTurn = createSelector(
    selectCurrentGame,
    selectUser,
    (game, user) => {
        if (!game.order) {
            return false;
        }
        return game.order[0] !== user.uid;
    }
  )