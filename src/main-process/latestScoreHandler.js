const { ipcMain } = require("electron");
const storage = require("electron-json-storage");

const { REQUEST_LATEST_SCORE, RECEIVE_LATEST_SCORE } = require("../events");

const defaultStorageLocation = storage.getDefaultDataPath();

const latestScoreHandler = (app) => {
  ipcMain.on(REQUEST_LATEST_SCORE, async (event) => {
    console.log(`retrieving Data from ${defaultStorageLocation}/scores.json`);
    storage.get("scores", (error, data) => {
      // Storage returns an empty object if the key doesn't exist
      // throw an error as we can't get the latest score
      if (error || Object.keys(data).length === 0) throw error;
      event.reply(RECEIVE_LATEST_SCORE, data[data.length - 1]);
    });
  });
};

module.exports = {
  latestScoreHandler,
};
