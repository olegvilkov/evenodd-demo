import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const firestore = admin.firestore();

// Функция которая определяет, когда игра завершилась и кто победитель.
exports.checkWinner = functions.firestore.document('/games/{gameId}')
    .onUpdate(async (snap, context) => {

        const gameId = context.params.gameId;
        const gameData = snap.after.data();

        if (gameData.winner) {
          return;
        }

        // Игра не заканчивается, пока игрок не сделал свои K-ходов.
        if (gameData.turns > 0) {
          return;
        }

        // Участник у которого больше очков, чем у других
        const leaderSnapshot = await firestore.collection(`games/${gameId}/players`)
            .orderBy('points', 'desc')
            .limit(2)
            .get();

        let leaderPlayers: Array<FirebaseFirestore.DocumentData> = [];

        leaderSnapshot.forEach(function(doc) {
          const data = doc.data();
          leaderPlayers.push({...data, id: doc.id});
        })

        // Игра не заканчивается, пока у одного из участников больше очков, чем у других
        if (leaderPlayers[0].points == leaderPlayers[1].points) {
          return;
        }

        // Must return a Promise
        return firestore.doc(`games/${gameId}`).update({
            winner: leaderPlayers[0].id,
        })
    });
