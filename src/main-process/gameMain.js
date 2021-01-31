const { ipcMain } = require("electron");

const { Game } = require("../classes/Game");

const gameMain = () => {
  const CurrentGame = new Game();

  ipcMain.on("new-game", (event, opts = {}) => {
    CurrentGame.newGame(opts);
    CurrentGame.nextQuestion();

    event.reply("question", CurrentGame.question);
  });

  ipcMain.on("get-info", (event) => {
    event.reply("receive-info", {
      overallScore: CurrentGame.overallScore,
    });
  });

  ipcMain.on("answer-question", (event, userAnswer) => {
    const { isCorrect, answer } = CurrentGame.answerQuestion(userAnswer);

    event.reply("answer", {
      answer,
      isCorrect,
      score: CurrentGame.score,
    });

    if (CurrentGame.gameOver) {
      event.reply("game-over", CurrentGame.overallScore);
      return;
    }

    CurrentGame.nextQuestion();
    event.reply("question", CurrentGame.question);
  });
};

module.exports = { gameMain };
