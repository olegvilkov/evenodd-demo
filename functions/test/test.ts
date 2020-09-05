import * as firebase from "@firebase/testing";
import { expect } from 'chai';

const projectId = "evenodd-demo";
const admin = firebase.initializeAdminApp({ projectId });
const db = admin.firestore();

describe("Функция которая определяет, когда игра завершилась и кто победитель.", async () => {

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

    
    it("Игра заканчивается, когда каждый игрок сделал свои K-ходов, и у одного из участников больше очков, чем у других.", async function () {

        this.timeout(5000);

        const leaderName = 'player_leader';

        // Setup: Initialize game
        const gameRef = db.doc('games/game1');
        gameRef.set({
            turns: 1,
        });
    
        // Setup: Initialize leader in points player
        await gameRef.collection('players').doc().set({
            name: leaderName,
            points: 10,
        });

        // Setup: Initialize 2nd player
        await gameRef.collection('players').doc().set({
            name: 'player',
            points: 8,
        }); 

        // Trigger checkWinner cloud function
        await gameRef.update({
            turns: 0
        });

        // Listen first update to the game, it should return game winner
        const winner = await new Promise(resolve =>
            unsubscribe = gameRef.onSnapshot(snap => {
                const data = snap.data();
                const winner = data && data.winner;
                if (winner) resolve(winner);
            })
        )

        expect(winner).to.equal(leaderName);
    });

    it("Игра не заканчивается, пока каждый игрок не сделал свои K-ходов.", async function () {
        this.timeout(5000);

        // Setup: Initialize game
        const gameRef = db.doc('games/game1');
        gameRef.set({
            turns: 2,
        });
    
        // Setup: Initialize leader in points player
        await gameRef.collection('players').doc().set({
            name: 'player1',
            points: 5,
        });

        // Setup: Initialize 2nd player
        await gameRef.collection('players').doc().set({
            name: 'player2',
            points: 5,
        });

        // Trigger checkWinner cloud function
        await gameRef.update({
            turns: 1,
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

    it("Игра не заканчивается, пока у одного из участников не будет больше очков, чем у других", async function () {
        this.timeout(5000);

        // Setup: Initialize game
        const gameRef = db.doc('games/game1');
        gameRef.set({
            turns: 1,
        });
    
        // Setup: Initialize leader in points player
        await gameRef.collection('players').doc('player1_id').set({
            name: 'player1',
            points: 10,
        });

        // Setup: Initialize 2nd player
        await gameRef.collection('players').doc('player2_id').set({
            name: 'player2',
            points: 10,
        });

        // Trigger checkWinner cloud function
        // Game round finished when all players have same round
        await gameRef.update({
            turns: 0
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
