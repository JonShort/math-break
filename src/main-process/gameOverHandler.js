const { ipcMain } = require("electron");
const storage = require("electron-json-storage");

const { REQUEST_GAME_OVER, RECEIVE_GAME_OVER } = require("../events");

const defaultStorageLocation = storage.getDefaultDataPath();

const gameOverHandler = (app) => {
  ipcMain.on(REQUEST_GAME_OVER, async (event, args) => {
    storage.get("scores", (error, data) => {
      if (error) throw error;

      // Storage returns an empty object if the key doesn't exist
      // create an empty array instead
      const highScores = Object.keys(data).length === 0 ? [] : data;
      const scores = {
        rounds: args.rounds,
        score: args.score,
        duration: args.duration,
        date: new Date().toISOString(),
      };
      highScores.push(scores);

      console.log(`saving Data to ${defaultStorageLocation}/scores.json`);
      storage.set("scores", highScores, (error) => {
        if (error) throw error;
        event.reply(RECEIVE_GAME_OVER);
      });
    });
  });
};

module.exports = {
  gameOverHandler,
};
