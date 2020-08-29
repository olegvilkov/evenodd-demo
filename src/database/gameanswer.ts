import { db, dbHelper } from 'utils/firebase';

export enum EvenOdd {
    Even,
    Odd
}

export enum AnswerMode {
    WaitForEvenOdd,
    WaitForNumber,
    Finish
}

export interface InsideTransaction {
    (transaction: firebase.firestore.Transaction, doc: firebase.firestore.DocumentData | undefined): void
}

const increseByOne = dbHelper.FieldValue.increment(1);

export function setGameAnswerEvenOdd (gameId: string, evenodd: EvenOdd) {
    return db.doc(`gameanswers/${gameId}`).set({
        evenodd: evenodd,
        mode: AnswerMode.WaitForNumber,
    }, {merge: true});
}

export function runGameAnswerTransaction (
    gameId: string,
    insideTransaction: InsideTransaction
) {
    const answerDocRef = db.doc(`gameanswers/${gameId}`);
  
    return db.runTransaction(function(transaction) {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(answerDocRef)
        .then(function(answerDoc) {
            insideTransaction(transaction, answerDoc.data())
        })
    });
}

export function updateGameAnswerNumber (gameId: string, number: number, transaction: firebase.firestore.Transaction) {
    const answerDocRef = db.doc(`gameanswers/${gameId}`);
    transaction.update(answerDocRef, {
        number,
        mode: AnswerMode.WaitForEvenOdd,
    });
}