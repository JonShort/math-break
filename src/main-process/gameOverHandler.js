const { ipcMain } = require("electron");
const { promises: fs } = require("fs");

const { REQUEST_GAME_OVER, RECEIVE_GAME_OVER } = require("../events");

const gameOverHandler = (app) => {
  ipcMain.on(REQUEST_GAME_OVER, async (event, args) => {
    const userDataPath = app.getPath("userData");

    const scores = JSON.stringify({
      rounds: args.rounds,
      score: args.score,
      duration: args.duration,
    });

    try {
      console.log(`saving Data to ${userDataPath}/scores.json`);
      await fs.writeFile(`${userDataPath}/scores.json`, scores);

      event.reply(RECEIVE_GAME_OVER);
    } catch (err) {
      // TODO - add generic "error" event & handling here
    }
  });
};

module.exports = {
  gameOverHandler,
};
