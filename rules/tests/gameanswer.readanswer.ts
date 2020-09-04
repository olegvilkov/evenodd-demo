import { setup, clearData, assertFails, assertSucceeds, IData } from "./setup";
import { AnswerMode } from '../../src/database/enums';

const myId = "myId";
const gameId = "gameId";
const myAuth = {uid: myId};

const readAnswer = async (setupAnswer: Object) => {
    
    const data = {
        [`gameanswer/${gameId}`]: setupAnswer,
    } as IData;

    const db = await setup({
        auth: myAuth,
        data,
    });

    const answerDocRef = db.collection("gameanswer").doc(gameId);

    return answerDocRef.get()
}

describe("Security rules for Read Answer Number", async () => {

    beforeEach(() => {
      clearData();
    });

    it("Should allow read Answer Number in WaitForNumber mode", async function () {
        return assertSucceeds(
          readAnswer({
            mode: AnswerMode.WaitForNumber
          })
        );
    })

    it("Should not allow read Answer Number in WaitForEvenOdd mode", function () {
        return assertFails(
            readAnswer({
              mode: AnswerMode.WaitForEvenOdd
            })
        );
    })

});