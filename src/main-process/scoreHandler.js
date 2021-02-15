const { ipcMain } = require("electron");
const storage = require("electron-json-storage");

const {
  REQUEST_LATEST_SCORE,
  RECEIVE_LATEST_SCORE,
  REQUEST_SCORES,
  RECEIVE_SCORES,
} = require("../events");

const storageLocation = storage.getDefaultDataPath();

const scoreHandler = (app) => {
  ipcMain.on(REQUEST_LATEST_SCORE, async (event) => {
    console.log(`retrieving Data from ${storageLocation}/scores.json`);

    storage.get("scores", (error, data) => {
      // Send null if we can't get scores, or the key doesn't exist (storage returns an empty object)
      // TODO - add generic "error" event handling here instead of just silencing
      event.reply(
        RECEIVE_LATEST_SCORE,
        Object.keys(data).length === 0 || error ? null : data[data.length - 1]
      );
    });
  });

  ipcMain.on(REQUEST_SCORES, async (event) => {
    console.log(`retrieving Data from ${storageLocation}/scores.json`);

    storage.get("scores", (error, data) => {
      // Send an empty score array if we can't get scores, or the key doesn't exist (storage returns an empty object)
      // TODO - add generic "error" event handling here instead of just silencing
      event.reply(
        RECEIVE_SCORES,
        Object.keys(data).length === 0 || error ? [] : data
      );
    });
  });
};

module.exports = {
  scoreHandler,
};
