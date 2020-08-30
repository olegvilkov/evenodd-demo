import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// const { warn } = require("firebase-functions/lib/logger");

admin.initializeApp();

const firestore = admin.firestore();

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.checkWinner = functions.firestore.document('/games/{gameId}/players/{playerId}')
    .onUpdate(async (snap, context) => {

        // const player = snap.after.data();
        const gameId = context.params.gameId;

        // if (player.round < K) {
        //     return;
        // }

        // const leaderSnapshot = await firestore.collection(`games/${gameId}/players`)
        //     .orderBy('round')
        //     .orderBy('points', 'desc')
        //     .limit(1)
        //     .get();

        // leaderSnapshot.forEach(async function(doc) {
        //     const leader = doc.data();
        //     if (player.round > leader.round) {
        //         return;
        //     }
        //     await firestore.doc(`games/${gameId}`).update({
        //         winner: 'test',
        //     })
        // });

        await firestore.doc(`games/${gameId}`).update({
            winner: 'test2',
        })
      
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to Cloud Firestore.
      // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
      // return snap.ref.set({uppercase}, {merge: true});
    });
