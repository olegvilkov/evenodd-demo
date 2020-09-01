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

    it("Should not set leader as winner if rounds not same", (done) => {
        done();
    });

    it("Should not set leader as winner if rounds same and < K", (done) => {
        done();
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

        // Game round finished when all players have same round
        player2Ref.update({
            round: 100,
        });

        // Listen first update to the game, it should set as winner player1
        const winner = await new Promise((done) =>
            unsubscribe = gameRef.onSnapshot(snap => {
                const data = snap.data();
                const winner = data && data.winner || '';
                if (winner) done(winner);
            })
        )

        expect(winner).to.equal(leaderRef.id);
    });
});
