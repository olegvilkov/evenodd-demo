import * as firebase from "@firebase/testing";
import { expect } from 'chai';

const projectId = "evenodd-demo";
const admin = firebase.initializeAdminApp({ projectId });
const db = admin.firestore();

describe("Winner function must work correct.", async () => {

    let unsubscribe: VoidFunction;
 
    beforeEach(async ()=>{
        await firebase.clearFirestoreData({ projectId });
    });

    afterEach(() => {
        // Call the function returned by onSnapshot to unsubscribe
        if (unsubscribe) {
            unsubscribe(); 
        }
    });

    // TODO: Tests for 2 players (20 rounds limit)

    it("Should not set game winner if game round not finished", async function () {
        this.timeout(5000);

        // Setup: Initialize game
        const gameRef = db.doc('games/game1');
        gameRef.set({
            order: ['player1', 'player2'],
            K: 10,
        });
    
        // Setup: Initialize leader in points player
        const player1Ref = gameRef.collection('players').doc('player1_id');
        player1Ref.set({
            round: 11,
            points: 5,
        });

        // Setup: Initialize 2nd player
        const player2Ref = gameRef.collection('players').doc('player2_id');
        player2Ref.set({
            round: 11,
            points: 5,
        });

        // Trigger checkWinner cloud function
        // Game round not finished becose player1 and player2 have different rounds
        player2Ref.update({
            round: 12,
        });

        // Listen first update to the game, it should return game winner
        const winner = await Promise.race([
            new Promise(resolve =>
                unsubscribe = gameRef.onSnapshot(snap => {
                    const data = snap.data();
                    const winner = data && data.winner;
                    if (winner) resolve(winner);
                })
            ),
            new Promise(resolve => setTimeout(resolve, 3000, null))
        ]);

        expect(winner).be.null;
    });

    it("Should set game winner if rounds > K and all players finish round turn", async function () {

        this.timeout(5000);

        // Setup: Initialize game
        const gameRef = db.doc('games/game1');
        gameRef.set({
            order: ['player1', 'player2'],
            K: 10,
        });
    
        // Setup: Initialize leader in points player
        const leaderRef = gameRef.collection('players').doc('player1_id');
        leaderRef.set({
            round: 100,
            points: 100,
        });

        // Setup: Initialize 2nd player
        const player2Ref = gameRef.collection('players').doc('player2_id');
        player2Ref.set({
            round: 99,
            points: 50,
        }); 

        // Trigger checkWinner cloud function
        // Game round finished when all players have same round
        player2Ref.update({
            round: 100,
        });

        // Listen first update to the game, it should return game winner
        const winner = await new Promise(resolve =>
            unsubscribe = gameRef.onSnapshot(snap => {
                const data = snap.data();
                const winner = data && data.winner;
                if (winner) resolve(winner);
            })
        )

        expect(winner).to.equal(leaderRef.id);
    });

    it("Should not set game winner if rounds < K", async function () {
        this.timeout(5000);

        // Setup: Initialize game
        const gameRef = db.doc('games/game1');
        gameRef.set({
            order: ['player1', 'player2'],
            K: 10,
        });
    
        // Setup: Initialize leader in points player
        const player1Ref = gameRef.collection('players').doc('player1_id');
        player1Ref.set({
            round: 5,
            points: 5,
        });

        // Setup: Initialize 2nd player
        const player2Ref = gameRef.collection('players').doc('player2_id');
        player2Ref.set({
            round: 4,
            points: 5,
        });

        // Trigger checkWinner cloud function
        // Game round finished when all players have same round
        player2Ref.update({
            round: 5,
        });

        // Listen first update to the game, it should return game winner
        const winner = await Promise.race([
            new Promise(resolve =>
                unsubscribe = gameRef.onSnapshot(snap => {
                    const data = snap.data();
                    const winner = data && data.winner;
                    if (winner) resolve(winner);
                })
            ),
            new Promise(resolve => setTimeout(resolve, 3000, null))
        ]);

        expect(winner).be.null;
    });
});
