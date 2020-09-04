import { setup, clearData, assertFails, assertSucceeds, IAuth } from "./setup";
import { AnswerMode, EvenOdd } from '../../src/database/enums';

const myId = "myId";
const otherId = "otherId";
const gameId = "gameId";
const myAuth = {uid: myId};
const game: Object = {
    name: 'Test Game',
    playersForStart: 2,
    order: [myId, otherId],
    turns: 21,
};
const player: Object = {
    name: "Test Name",
    points: 0
};
const answerEvenOdd = {
    evenodd: EvenOdd.Even,
    mode: AnswerMode.WaitForNumber
}

const makeAnswer = async (
    answer={},
    auth?: IAuth,
    data={},
    gameUpdate?: Object,
    playerUpdate?: Object,
) => {
    const db = await setup({
        auth,
        data: {
            [`games/${gameId}/players/${myId}`]: player,
            ...data
        }
    });
    
    const gameDocRef = db.collection("games").doc(gameId);
    const playersDocRef = gameDocRef.collection('players').doc(myId);
    const answerDocRef = db.collection("gameanswer").doc(gameId);

    return db.runTransaction(function(transaction) {
        return transaction.get(gameDocRef)
            .then(function(gameDoc) {
                if (gameUpdate) transaction.update(gameDocRef, gameUpdate);
                if (playerUpdate) transaction.update(playersDocRef, playerUpdate);
                transaction.set(answerDocRef, answer, {merge: true});
            });
    })
}

const makeEvenOddAnswer = async (
    answer={},
    auth?: IAuth,
    setupAnswer?:Object,
    setupGame=game,
) => {
    const data = {
        [`games/${gameId}`]: setupGame,
    }

    if (setupAnswer) {
        data[`gameanswer/${gameId}`] = setupAnswer;
    }

    return makeAnswer(
        answer,
        auth,
        data,
    )
};

describe("Security rules for Answer EvenOdd", async () => {

    beforeEach(() => {
      clearData();
    });

    it("Should allow answer EvenOdd when all rules correct", function () {
      return assertSucceeds(
        makeEvenOddAnswer(
          answerEvenOdd,
          myAuth,
        )
      );
    })

    it("Can't answer EvenOdd when mode WaitForNumber", function () {
        return assertFails(
            makeEvenOddAnswer(
                answerEvenOdd,
                myAuth,
                { mode: AnswerMode.WaitForNumber }
            )
        );
    })

    it("Can't answer EvenOdd whithout change mode to WaitForNumber", function () {
        return assertFails(
            makeEvenOddAnswer(
                { ...answerEvenOdd, mode: AnswerMode.WaitForEvenOdd },
                myAuth
            )
        );
    })

    it("Can't answer EvenOdd without auth", function () {
        return assertFails(
            makeEvenOddAnswer(
                answerEvenOdd,
            )
        );
    })

    it("Can't answer EvenOdd with not allowed fields", function () {
        return assertFails(
            makeEvenOddAnswer(
                { ...answerEvenOdd, someNotAlloewdField: "someNotAlloewdField" },
                myAuth
            )
        );
    })

    it("Can't answer EvenOdd if not user order now", function () {
        return assertFails(
            makeEvenOddAnswer(
                answerEvenOdd,
                myAuth,
                undefined,
                {...game, order: [otherId, myId]}
            )
        );
    })
});
