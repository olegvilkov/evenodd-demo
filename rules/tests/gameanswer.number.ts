import { setup, clearData, assertFails, assertSucceeds, IAuth, IData } from "./setup";
import { AnswerMode, EvenOdd } from '../../src/database/enums';

export const myId = "myId";

export const otherId = "otherId";

export const gameId = "gameId";

export const myAuth = {uid: myId};

export const game: Object = {
    name: 'Test Game',
    playersForStart: 2,
    order: [myId, otherId],
    turns: 21,
};

export const player: Object = {
    name: "My Name",
    points: 0
};

export const other: Object = {
    name: "Other Name",
    points: 0
};

export const playerUpdate = {
    points: 1
};

export const answerEvenOdd = {
    evenodd: EvenOdd.Even,
    mode: AnswerMode.WaitForNumber
}

interface INumberAnswer {
    answer: Object
    auth: IAuth
    gameUpdate: Object
    playerUpdate?: Object
    setupAnswer: Object
    setupGame: Object
    setupOther: Object
}

export const succeedsNumberAnswerConfig:INumberAnswer = {
    answer: {
        number: 42,
        mode: AnswerMode.WaitForEvenOdd
    },
    auth: myAuth,
    gameUpdate: {
        order: [otherId, myId],
        turns: 20,
    },
    setupAnswer: answerEvenOdd,
    setupGame: game,
    setupOther: other,
};

export const makeNumberAnswer = async ({answer, auth, setupGame, setupAnswer, gameUpdate, playerUpdate, setupOther}: INumberAnswer) => {
    
    const data = {
        [`games/${gameId}/players/${otherId}`]: setupOther,
        [`games/${gameId}/players/${myId}`]: player,
        [`games/${gameId}`]: setupGame,
        [`gameanswer/${gameId}`]: setupAnswer,
    } as IData;

    const db = await setup({
        auth,
        data,
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

describe("Security rules for Answer Number", async () => {

    beforeEach(() => {
      clearData();
    });

    it("Should allow answer Number when all rules correct", function () {
        return assertSucceeds(
          makeNumberAnswer({
            ...succeedsNumberAnswerConfig
          })
        );
    })

    it("Can't answer Number if not in user's turn", function () {
        return assertFails(
            makeNumberAnswer({
                ...succeedsNumberAnswerConfig,
                setupGame: {...game, order: [otherId, myId]}
            })
        );
    })

    it("Can't answer Number if not decrease by game turns one", function () {
        return assertFails(
            makeNumberAnswer({
                ...succeedsNumberAnswerConfig,
                gameUpdate: {...succeedsNumberAnswerConfig.gameUpdate, turns: 100}
            })
        );
    })


    it("Can't answer Number if update to wrong order", function () {
        return assertFails(
            makeNumberAnswer({
                ...succeedsNumberAnswerConfig,
                gameUpdate: {...succeedsNumberAnswerConfig.gameUpdate, order: [myId]}
            })
        );
    })

    it("Should allow Up user points if answer Number correct", function () {
        return assertSucceeds(
            makeNumberAnswer({
                ...succeedsNumberAnswerConfig,
                playerUpdate,
                setupAnswer: {...answerEvenOdd, number: 10}
            })
          );
    })

    it("Can't up user points if answer Number incorrect", function () {
        return assertFails(
            makeNumberAnswer({
                ...succeedsNumberAnswerConfig,
                playerUpdate,
                setupAnswer: {...answerEvenOdd, number: 11}
            })
        );
    })

    it("Can't up user points more then by one", function () {
        return assertFails(
            makeNumberAnswer({
                ...succeedsNumberAnswerConfig,
                playerUpdate: {...playerUpdate, points: 2},
                setupAnswer: {...answerEvenOdd, number: 10}
            })
        );
    })
  
    it("Can't answer Number when mode WaitForEvenOdd", function () {
        return assertFails(
            makeNumberAnswer({
                ...succeedsNumberAnswerConfig,
                setupAnswer: {...answerEvenOdd, mode: AnswerMode.WaitForEvenOdd}
            })
        );
    })

    it("Can't answer Number whithout change mode to WaitForEvenOdd", function () {
        return assertFails(
            makeNumberAnswer({
                ...succeedsNumberAnswerConfig,
                answer: {...succeedsNumberAnswerConfig.answer, mode: AnswerMode.WaitForNumber},
            })
        );
    })

    it("Can't answer Number without auth", function () {
        return assertFails(
            makeNumberAnswer({
                ...succeedsNumberAnswerConfig,
                auth: {uid: ''},
            })
        );
    })

    it("Can't answer Number with not allowed fields", function () {
        return assertFails(
            makeNumberAnswer({
                ...succeedsNumberAnswerConfig,
                answer: {...succeedsNumberAnswerConfig.answer, someNotAlloewdField: "someNotAlloewdField"},
            })
        );
    })

});