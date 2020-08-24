import { db, dbHelper } from 'utils/firebase';
import { IGame } from 'redux/reducers/currentgame/types';
import { IPlayer } from 'redux/reducers/players/types';
import { ChangeGamesListType } from 'redux/sagas/gameslist/types';
import { ChangeGameCallbackType } from 'redux/sagas/currentgame/types';

const increseByOne = dbHelper.FieldValue.increment(1);

let detachGamesCollectionListener: (()=>void) | null = null;

export function createGame (game: IGame) {
  return db.collection("games").add(game);
}

export function addPlayerToGame (gameId: string, player: IPlayer) {
  const gameDocRef = db.doc(`games/${gameId}`);

  return db.runTransaction(function(transaction) {
    // This code may get re-run multiple times if there are conflicts.
    return transaction.get(gameDocRef)
      .then(function(gameDoc) {

        transaction.update(gameDocRef, {
          playersCount: increseByOne
        });

        const playersDocRef = gameDocRef.collection('players').doc();
        transaction.set(playersDocRef, player);
        
        return gameDoc;
    });
  });
}

/**
 * Listen games collection for realtime updates
 * @returns unsubscribe
 */
export function subcribeToGamesList ( callbackfn: ChangeGamesListType ) {
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
export function subcribeToGame ( gameId: string, callbackfn: ChangeGameCallbackType ) {
  return db.doc(`games/${gameId}`)
    .onSnapshot(function(doc) {
      const id = doc.id;
      const data = doc.data();
      const payload = {...data, id} as IGame;
      callbackfn(payload);
    });
}