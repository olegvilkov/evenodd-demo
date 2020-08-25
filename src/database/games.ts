import { db } from 'utils/firebase';
import { IGame } from 'redux/reducers/currentgame/types';
import { ChangeGamesListType } from 'redux/sagas/gameslist/types';
import { ChangeGameCallbackType } from 'redux/sagas/currentgame/types';
import { IPlayer } from 'redux/reducers/players/types';
import { transactionAddGamePlayer } from './players';

/**
 * Add game and add player in this game
 * @param game 
 */
export function addGameWithPlayer (game: IGame, player: IPlayer) {
    const gameDocRef = db.collection("games").doc();

    return db.runTransaction(function(transaction) {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(gameDocRef)
            .then(function(gameDoc) {
                transaction.set(gameDocRef, game);
                transactionAddGamePlayer(transaction, gameDocRef, player);
                return gameDoc;
            });
    });
}

/**
 * Listen games collection for realtime updates
 * @returns unsubscribe
 */
export function listenGamesCollection ( callbackfn: ChangeGamesListType ) {
    return db.collection("games")
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
            const id = change.doc.id;
            const data = change.doc.data();
            const type = change.type;
            const payload = {...data, id} as IGame;
            callbackfn({type, payload});
            });
        });
}

/**
 * Listen game doc for realtime updates
 * @returns unsubscribe
 */
export function listenGamesDoc ( gameId: string, callbackfn: ChangeGameCallbackType ) {
    return db.doc(`games/${gameId}`)
      .onSnapshot(function(doc) {
        const id = doc.id;
        const data = doc.data();
        const payload = {...data, id} as IGame;
        callbackfn(payload);
      });
  }