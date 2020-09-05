import { db } from 'utils/firebase';
import { IGame, IStoreGame } from 'redux/reducers/currentgame/types';
import { ChangeGamesListType } from 'redux/sagas/gameslist/types';
import { IPlayer } from 'redux/reducers/playerlist/types';
import { addGamePlayerInTransaction } from './players';

/**
 * Add game and add player in this game
 * @param game 
 */
export function addGameWithPlayer (game: IStoreGame, playerId: string, player: IPlayer) {
    const gameDocRef = db.collection("games").doc();

    return db.runTransaction(function(transaction) {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(gameDocRef)
            .then(function(gameDoc) {
                transaction.set(gameDocRef, game);
                addGamePlayerInTransaction(gameDocRef, playerId, player, transaction);
                return gameDoc;
            });
    });
}

/**
 * Listen games collection for realtime updates
 * @returns unsubscribe
 */
export function listenGamesCollection ( callbackfn: ChangeGamesListType ) {
    return db.collection("games").orderBy('name')
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                const id = change.doc.id;
                const data = change.doc.data();
                const type = change.type;
                const payload = {...data, id} as IGame;
                callbackfn({type, payload});
            });
            callbackfn({type: "ready"});
        });
}