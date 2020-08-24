import { db } from 'utils/firebase';
import { IGame } from 'redux/reducers/currentgame/types';
import { ChangeGamesListType } from 'redux/sagas/gameslist/types';
import { ChangeGameCallbackType } from 'redux/sagas/currentgame/types';

export function addGame (game: IGame) {
    return db.collection("games").add(game);
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