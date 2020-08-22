import { setup, teardown } from "./firestore";

/**
 * Тестирование firestore security rules
 */

describe("Safety rules", () => {
  afterEach(async () => {
    await teardown();
  });

  test("should allow a create game", async () => {
    const db = await setup();

    await expect(
      db.collection("games").add({
        name: 'Test Game',
        playersForStart: 3,
      })
    ).toAllow();
  });

  test("should deny a create game with empty name", async () => {
    const db = await setup();

    await expect(
      db.collection("games").add({
        playersForStart: 3,
      })
    ).toDeny();
  });

  test("should deny a create game with playersForStart < 2", async () => {
    const db = await setup();

    await expect(
      db.collection("games").add({
        name: 'Test Game',
        playersForStart: 1,
      })
    ).toDeny();
  });
  
});