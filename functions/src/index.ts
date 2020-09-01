import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const firestore = admin.firestore();

// Listens for changes in game player
// Detect leader and set as game winner after K rounds
exports.checkWinner = functions.firestore.document('/games/{gameId}/players/{playerId}')
    .onUpdate(async (snap, context) => {

        const player = snap.after.data();
        const gameId = context.params.gameId;

        const gameDoc: FirebaseFirestore.DocumentData = await firestore.doc(`games/${gameId}`).get();
        const gameData = gameDoc.data();

        if (player.round < gameData.K) {
          return;
        }

        // Get leader
        const leaderSnapshot = await firestore.collection(`games/${gameId}/players`)
            .orderBy('round')
            .orderBy('points', 'desc')
            .limit(1)
            .get();

        const leader: FirebaseFirestore.DocumentData = await new Promise (resolve => {
          leaderSnapshot.forEach(async function(doc) {
            const leader = doc.data();
            leader.id = doc.id;
            resolve(leader);
          })
        });

        // For winner detect Leader round must be same as current player round
        if (leader.round < player.round) {
          return;
        }

        // Must return a Promise
        return firestore.doc(`games/${gameId}`).update({
            winner: leader.id,
        })
    });
