import { db, dbHelper } from 'utils/firebase';
import { IPlayer } from 'redux/reducers/playerlist/types';
import { IChangeGamePlayers } from 'redux/sagas/playerslist/types';

const increseByOne = dbHelper.FieldValue.increment(1);

/**
 * Add player in game
 * @param gameId 
 * @param player player document
 */
export function addGamePlayer (gameId: string, playerId: string, player: IPlayer) {
    const gameDocRef = db.doc(`games/${gameId}`);
  
    return db.runTransaction(function(transaction) {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(gameDocRef)
        .then(() => {
          addGamePlayerInTransaction(gameDocRef, playerId, player, transaction);
        })
    });
  }

/**
 * Transaction operation for add player in game
 * Can be called from other transaction opertaions
 * @param gameDocRef 
 * @param playerId 
 * @param player 
 * @param transaction
 */
export function addGamePlayerInTransaction (
    gameDocRef: firebase.firestore.DocumentReference,
    playerId: string,
    player: IPlayer,
    transaction: firebase.firestore.Transaction,
) {
    const playersDocRef = gameDocRef.collection('players').doc(playerId);

    transaction.update(gameDocRef, {
      playersCount: increseByOne
    });

    const playerGameDocRef = db.doc(`playergames/${playerId}/games/${gameDocRef.id}`);
    transaction.set(playerGameDocRef, {});

    return transaction.set(playersDocRef, player);
}


/**
 * Listen game players collection for realtime updates
 * @returns unsubscribe
 */
export function listenGamePlayers ( gameId: string, callbackfn: IChangeGamePlayers ) {
  return db.collection(`games/${gameId}/players`)
      .onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
            const id = change.doc.id;
            const data = change.doc.data();
            const type = change.type;
            const payload = {...data, id} as IPlayer;
            callbackfn({type, payload});
          });
      });
}