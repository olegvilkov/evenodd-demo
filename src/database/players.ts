import { db, dbHelper } from 'utils/firebase';
import { IPlayer } from 'redux/reducers/players/types';
import { playerData } from 'redux/sagas/joingame';

const increseByOne = dbHelper.FieldValue.increment(1);

/**
 * Add player in game
 * @param gameId 
 * @param player player document
 */
export function addGamePlayer (gameId: string, player: IPlayer) {
    const gameDocRef = db.doc(`games/${gameId}`);
  
    return db.runTransaction(function(transaction) {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(gameDocRef)
        .then(() => {
            transactionAddGamePlayer(transaction, gameDocRef, player);
        })
    });
  }

/**
 * Transaction operation for add player in game
 * Can be called from other transaction opertaions
 * @param transaction 
 * @param gameDocRef 
 * @param player 
 */
export function transactionAddGamePlayer (
    transaction: firebase.firestore.Transaction,
    gameDocRef: firebase.firestore.DocumentReference,
    player: IPlayer
) {
    transaction.update(gameDocRef, {
      playersCount: increseByOne
    })

    const playersDocRef = gameDocRef.collection('players').doc();

    return transaction.set(playersDocRef, player);
}