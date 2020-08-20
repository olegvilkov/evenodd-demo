import { db, dbHelper } from 'utils/firebase';
import { IGame } from 'redux/reducers/game/types';
import { IPlayer } from 'redux/reducers/players/types';

const increseByOne = dbHelper.FieldValue.increment(1);

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