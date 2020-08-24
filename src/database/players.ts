import { db, dbHelper } from 'utils/firebase';
import { IPlayer } from 'redux/reducers/players/types';

const increseByOne = dbHelper.FieldValue.increment(1);

export function addGamePlayer (gameId: string, player: IPlayer) {
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