const { ipcMain } = require("electron");

const { Game } = require("../classes/Game");

const gameMain = () => {
  const CurrentGame = new Game();

  ipcMain.on("request-new-game", (event, opts = {}) => {
    CurrentGame.newGame(opts);
    CurrentGame.nextQuestion();

    event.reply("receive-question", CurrentGame.question);
  });

  ipcMain.on("request-info", (event) => {
    event.reply("receive-info", {
      overallScore: CurrentGame.overallScore,
    });
  });

  ipcMain.on("request-answer-check", (event, userAnswer) => {
    const { isCorrect, answer } = CurrentGame.answerQuestion(userAnswer);

    event.reply("receive-answer", {
      answer,
      isCorrect,
      score: CurrentGame.score,
    });

    if (CurrentGame.gameOver) {
      event.reply("receive-game-over");
      return;
    }

    CurrentGame.nextQuestion();
    event.reply("receive-question", CurrentGame.question);
  });
};

module.exports = { gameMain };
