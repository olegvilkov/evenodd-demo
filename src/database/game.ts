import { db, dbHelper } from 'utils/firebase';
import { IGame } from 'redux/reducers/currentgame/types';
import { ChangeGameCallbackType } from 'redux/sagas/currentgame/types';

/**
 * Listen game doc for realtime updates
 * @returns unsubscribe
 */
export function listenGame ( gameId: string, callbackfn: ChangeGameCallbackType ) {
    return db.doc(`games/${gameId}`)
      .onSnapshot(function(doc) {
        const id = doc.id;
        const data = doc.data();
        const payload = {...data, id} as IGame;
        callbackfn(payload);
      });
  }

/**
 * Уменьшает количество ходов в игре до окончания игры на 1
 */
export function decreaseGameTurns (gameId: string, transaction: firebase.firestore.Transaction) {
    const gameDocRef = db.doc(`games/${gameId}`);
    transaction.update(gameDocRef, {
        turns: dbHelper.FieldValue.increment(-1)
    });
}

/**
 * Обновляет порядок ходов игроков вигре
 */
export function updateGameOrder (gameId: string, order: Array<string>, transaction: firebase.firestore.Transaction) {
    const gameDocRef = db.doc(`games/${gameId}`);
    transaction.update(gameDocRef, {
        order,
    });
}

/**
 * Устанавливает победителя игры
 */
export function setGameWinner (gameId: string, userName: string, transaction: firebase.firestore.Transaction) {
    const gameDocRef = db.doc(`games/${gameId}`);
    transaction.update(gameDocRef, {
        winner: userName
    })
}

/**
 * Устанавливает лидирующего по очкам игрока
 */
export function setGameLeader (gameId: string, userId: string, transaction: firebase.firestore.Transaction) {
    const gameDocRef = db.doc(`games/${gameId}`);
    transaction.update(gameDocRef, {
        leader: userId
    })
}