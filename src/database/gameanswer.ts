import { db, dbHelper } from 'utils/firebase';
import { EvenOdd, AnswerMode } from './enums';
import { IGameAnswer } from 'redux/sagas/gameanswer/types';

const increseByOne = dbHelper.FieldValue.increment(1);

export function setAnswerEvenOdd (gameId: string, evenodd: EvenOdd) {
    return db.doc(`gameanswers/${gameId}`).set({
        evenodd,
        mode: AnswerMode.WaitForNumber,
    });
}

export function setAnswerNumber (gameId: string, playerId: string, number: number) {
    const answerDocRef = db.doc(`gameanswers/${gameId}`);
    const playerDocRef = db.doc(`games/${gameId}/${playerId}`);
  
    return db.runTransaction(function(transaction) {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(answerDocRef)
        .then(function(answerDoc) {
  
          transaction.update(answerDocRef, {
            number,
            mode: AnswerMode.WaitForEvenOdd,
          });
  
          transaction.update(playerDocRef, {
            round: increseByOne
          });
          
          return answerDoc;
      });
    });
}

export function getAnswerNumber (gameId: string, number: number) {
    return db.doc(`gameanswers/${gameId}`).get().then(function(doc) {
        const data = doc.data() as IGameAnswer;
        return data.number;
    })
}