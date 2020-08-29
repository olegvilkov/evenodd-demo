import { createSelector } from 'reselect';
import { IGameState } from './types';
import { selectPlayers } from '../playerlist/selector';
import { selectUser } from '../user/selector';

export const selectCurrentGame = (state: IGameState) => state.currentgame;
export const selectCurrentGameName = (state: IGameState) => selectCurrentGame(state).name;

export const selectIsWaitTurn = createSelector(
    selectPlayers,
    selectUser,
    (players, user) => {
        if (!players.length) {
            return true;
        }
        const sortPlayers = [...players];
        sortPlayers.sort((player1, player2) => {
            return player1.round*100 + player1.order - player2.round*100 + player2.order;
        });
        return sortPlayers[0].id != user.uid;
    }
  )