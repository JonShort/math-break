const { ipcMain } = require("electron");
const { promises: fs } = require("fs");

const { REQUEST_LATEST_SCORE, RECEIVE_LATEST_SCORE } = require("../events");

const latestScoreHandler = (app) => {
  ipcMain.on(REQUEST_LATEST_SCORE, async (event) => {
    const userDataPath = app.getPath("userData");

    try {
      console.log(`retrieving Data from ${userDataPath}/scores.json`);
      const file = await fs.readFile(`${userDataPath}/scores.json`);

      event.reply(RECEIVE_LATEST_SCORE, JSON.parse(file));
    } catch (err) {
      // TODO - add generic "error" event & handling here
    }
  });
};

module.exports = {
  latestScoreHandler,
};
