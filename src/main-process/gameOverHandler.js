const { ipcMain } = require("electron");
const storage = require("electron-json-storage");

const { REQUEST_GAME_OVER, RECEIVE_GAME_OVER } = require("../events");

const storageLocation = storage.getDefaultDataPath();

const gameOverHandler = (app) => {
  ipcMain.on(REQUEST_GAME_OVER, async (event, args) => {
    storage.get("scores", (error, data) => {
      // Create a new scores array if there's an error or if the key doesn't exist (storage returns an empty object)
      // TODO - add generic "error" event handling here instead of just silencing
      const highScores = error || Object.keys(data).length === 0 ? [] : data;
      const scores = {
        rounds: args.rounds,
        score: args.score,
        duration: args.duration,
        date: new Date().toISOString(),
      };
      highScores.push(scores);

      console.log(`saving Data to ${storageLocation}/scores.json`);
      storage.set("scores", highScores, (error) => {
        // TODO - add generic "error" event handling here
        event.reply(RECEIVE_GAME_OVER);
      });
    });
  });
};

module.exports = {
  gameOverHandler,
};
