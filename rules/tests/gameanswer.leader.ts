import { clearData, assertFails, assertSucceeds } from "./setup";
import { makeNumberAnswer, succeedsNumberAnswerConfig, playerUpdate, answerEvenOdd, other, otherId, myId } from './gameanswer.number';

describe("Security rules for set Leader", async () => {

    beforeEach(() => {
      clearData();
    });

    const succeedsLeaderAnswerConfig = {
        ...succeedsNumberAnswerConfig,
        gameUpdate: {...succeedsNumberAnswerConfig.gameUpdate, leader: myId},
        playerUpdate,
        setupAnswer: {...answerEvenOdd, number: 10}
    };

    it("Should allow set Leader when user lead", function () {
        return assertSucceeds(
          makeNumberAnswer(succeedsLeaderAnswerConfig)
        );
    })

    it("Should allow rewrite Leader when user lead", function () {
        return assertSucceeds(
          makeNumberAnswer({
              ...succeedsLeaderAnswerConfig,
              setupGame: {...succeedsLeaderAnswerConfig.setupGame, leader: otherId}
            })
        );
    })

    it("Can't rewrite Leader when user not lead", function () {
        return assertFails(
          makeNumberAnswer({
              ...succeedsLeaderAnswerConfig,
              setupOther: {...other, points: 10},
              setupGame: {...succeedsLeaderAnswerConfig.setupGame, leader: otherId}
            })
        );
    })

});
