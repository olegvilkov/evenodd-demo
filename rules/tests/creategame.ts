import { setup, clearData, assertFails, assertSucceeds, ISetup } from "./setup";

const myId = "myId";
const myAuth = { uid: myId };
const otherId = "otherId";

const game = {
  name: 'Test Game',
  playersForStart: 3,
  order: [myId],
  turns: 21,
};

const player = {
  name: "Test Name",
  points: 0,
};

type IGame = typeof game & {notAllowedField?: string};

const gameSetup = async (options?: ISetup) => {
  const db = await setup(options);
  const gameDocRef = db.collection("games").doc();
  const playersDocRef = gameDocRef.collection('players').doc(myId);

  return {gameDocRef, playersDocRef, db};
}

const createGameWithPlayer = async (game: IGame, player={}, options?: ISetup) => {
  const {gameDocRef, playersDocRef, db} = await gameSetup(options);

  return db.runTransaction(function(transaction) {
    return transaction.get(gameDocRef)
        .then(function(gameDoc) {
            transaction.set(gameDocRef, game);
            transaction.set(playersDocRef, player);
        });
  })
}

const createGameWithoutPlayer = async (game: IGame, options: ISetup) => {
  const {gameDocRef, db} = await gameSetup(options);

  return db.runTransaction(function(transaction) {
    return transaction.get(gameDocRef)
        .then(function(gameDoc) {
            transaction.set(gameDocRef, game);
        });
  })
}

describe("Security rules for Create Game", async () => {

    beforeEach(() => {
      clearData();
    });

    it("Should create game with join player", function () {
      return assertSucceeds(
        createGameWithPlayer(
          game,
          player,
          { auth: myAuth }
        )
      );
    }).timeout(5000); // Первый тест выполняется дольше, если эмулятор только запустился

    it("Can't create game with empty name", async () => {
      return assertFails(
        createGameWithPlayer(
          {...game, name: ''},
          player,
          { auth: myAuth }
        )
      );
    })

    it("Can't create game with players for start game < 2", async () => {
      return assertFails(
        createGameWithPlayer(
          {...game, playersForStart: 1},
          player,
          { auth: myAuth }
        )
      );
    });

    it("Can't create game without add user to order", async () => {
      return assertFails(
        createGameWithPlayer(
          {...game, order: []},
          player,
          { auth: myAuth }
        )
      );
    });

    it("Can't create game with add some other user to order", async () => {
      return assertFails(
        createGameWithPlayer(
          {...game, order: [otherId]},
          player,
          { auth: myAuth }
        )
      );
    });

    it("Can't create game without add user to players", async () => {
      return assertFails(
        createGameWithoutPlayer(
          game,
          { auth: myAuth }
        )
      );
    });

    it("Can't create game with not allowed fields", async () => {
      return assertFails(
        createGameWithPlayer(
          {...game, notAllowedField: 'test'},
          player,
          { auth: myAuth }
        )
      );
    });

    it("Can't create game with no authorization", async () => {
      return assertFails(
        createGameWithPlayer(
          game,
          player
        )
      );
    });

});