import { db, dbHelper } from 'utils/firebase';
import { IPlayer } from 'redux/reducers/players/types';
import { playerData } from 'redux/sagas/joingame';

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
 * @param player 
 * @param player 
 * @param transaction
 */
export function addGamePlayerInTransaction (
    gameDocRef: firebase.firestore.DocumentReference,
    playerId: string,
    player: IPlayer,
    transaction: firebase.firestore.Transaction,
) {
    const playersDocRef = gameDocRef.collection('players').doc(`${playerId}`);

    transaction.update(gameDocRef, {
      playersCount: increseByOne
    })

    return transaction.set(playersDocRef, player);
}