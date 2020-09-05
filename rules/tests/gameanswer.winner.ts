import { clearData, assertFails, assertSucceeds } from "./setup";
import { makeNumberAnswer, succeedsNumberAnswerConfig, playerUpdate, answerEvenOdd, otherId, myId, game } from './gameanswer.number';

describe("Security rules for Answer Winner", async () => {

    beforeEach(() => {
      clearData();
    });

    const succeedsWinnerAnswerConfig = {
        ...succeedsNumberAnswerConfig,
        setupGame: {...game, turns: 1},
        gameUpdate: {...succeedsNumberAnswerConfig.gameUpdate, winner: "I Win", turns: 0, leader: myId},
        playerUpdate,
        setupAnswer: {...answerEvenOdd, number: 10}
    };

    it("Should allow set Winner when all rules correct", function () {
        return assertSucceeds(
          makeNumberAnswer(succeedsWinnerAnswerConfig)
        );
    })

    it("Can't set Winner if turns > 0", function () {
        return assertFails(
          makeNumberAnswer({
            ...succeedsWinnerAnswerConfig,
            setupGame: {...succeedsWinnerAnswerConfig.setupGame, turns: 21},
            gameUpdate: {...succeedsWinnerAnswerConfig.gameUpdate, turns: 20}
          })
        );
    })

    it("Can't set Winner if already exists", function () {
        return assertFails(
            makeNumberAnswer({
              ...succeedsWinnerAnswerConfig,
              setupGame: {...succeedsWinnerAnswerConfig.setupGame, winner: "Other Win"},
            })
          );
    })

    it("Can't set Winner if user not a leader", function () {
        return assertFails(
            makeNumberAnswer({
              ...succeedsWinnerAnswerConfig,
              gameUpdate: {...succeedsWinnerAnswerConfig.gameUpdate, leader: otherId},
            })
          );
    })

});