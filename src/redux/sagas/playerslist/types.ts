import { PLAYERS_SUBSCRIBE, PLAYERS_UNSUBSCRIBE } from 'redux/actionTypes';
import { IPlayer } from 'redux/reducers/playerlist/types';

export interface ISubscribeGamePlayers {
    type: typeof PLAYERS_SUBSCRIBE
    gameId: string
}

export interface IUnsubscribeGamePlayers {
    type: typeof PLAYERS_UNSUBSCRIBE
}

export interface IGamesListAction {
    type: string
    payload: IPlayer
}

export interface IChangeGamePlayers {
    (action: IGamesListAction): void;
}