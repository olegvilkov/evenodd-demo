import { setup, clearData, assertFails, assertSucceeds, ISetup } from "./setup";

const myId = "myId";
const myAuth = { uid: myId };
const otherId = "otherId";

const gameId = "gameId";
const game = {
  name: 'Test Game',
  playersForStart: 3,
  order: [otherId]
};
const gameUpdate = {
  order: [otherId, myId]
};

const player = {
    name: "Test Name",
    points: 0,
};

interface IOptions extends ISetup {
    playerId?: string
}

const gameSetup = async (options?: IOptions) => {
  const db = await setup(options);
  const gameDocRef = db.collection("games").doc(gameId);
  const playerId = options && options.playerId || myId;
  const playersDocRef = gameDocRef.collection('players').doc(playerId);

  return {gameDocRef, playersDocRef, db};
}

const joinGame = async (game={}, gameUpdate={}, player={}, options?: IOptions) => {
  const {gameDocRef, playersDocRef, db} = await gameSetup({
      ...options,
      data: {
          [`games/${gameId}`]: game
      }
    });

  return db.runTransaction(function(transaction) {
    return transaction.get(gameDocRef)
        .then(function(gameDoc) {
            transaction.update(gameDocRef, gameUpdate);
            transaction.set(playersDocRef, player);
        });
  })
}

describe("Security rules for Join Game", async () => {

    beforeEach(() => {
      clearData();
    });

    it("Should allow a join to game with all required rules", function () {
      return assertSucceeds(
        joinGame(
          game,
          gameUpdate,
          player,
          { auth: myAuth }
        )
      );
    })

    it("Can't join game with empty auth", function () {
        return assertFails(
            joinGame(
              game,
              gameUpdate,
              player
            )
          );
    })

    it("Can't join game with empty name", function () {
        return assertFails(
            joinGame(
              game,
              gameUpdate,
              { ...player, name: '' },
              { auth: myAuth }
            )
          );
    })

    it("Can't join game with points != 0", function () {
        return assertFails(
            joinGame(
              game,
              gameUpdate,
              { ...player, points: 10 },
              { auth: myAuth }
            )
          );
    })

    it("Can't join game if not add uid in order", function () {
        return assertFails(
            joinGame(
              game,
              {},
              player,
              { auth: myAuth }
            )
          );
    })

    it("Can't join game if with wrong order", function () {
        return assertFails(
            joinGame(
              game,
              { ...gameUpdate, order: [myId, otherId]},
              player,
              { auth: myAuth }
            )
          );
    })

    it("Can't join game second time", function () {
        return assertFails(
            joinGame(
              { ...game, order: gameUpdate.order},
              { ...gameUpdate, order: [...gameUpdate.order, myId]},
              player,
              { auth: myAuth }
            )
          );
    });

    it("Can't join game with not allowed fields in player", async () => {
        return assertFails(
            joinGame(
              game,
              gameUpdate,
              { ...player, someData: "someData"},
              { auth: myAuth }
            )
          );
    });

    it("Can't join game if add player with id not same as auth uid", async () => {
        return assertFails(
            joinGame(
              game,
              { ...gameUpdate, winner: 'winner'},
              player,
              { auth: myAuth, playerId: otherId }
            )
          );
    });

    it("Can't join game with not allowed fields in game", async () => {
        return assertFails(
            joinGame(
              game,
              { ...gameUpdate, winner: 'winner'},
              player,
              { auth: myAuth }
            )
          );
    });

});