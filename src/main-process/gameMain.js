const { ipcMain } = require("electron");
const {
  RECEIVE_ANSWER,
  RECEIVE_GAME_OVER,
  RECEIVE_INFO,
  RECEIVE_QUESTION,
  REQUEST_ANSWER_CHECK,
  REQUEST_INFO,
  REQUEST_NEW_GAME,
} = require("../constants/events");

const { Game } = require("../classes/Game");

const gameMain = () => {
  const CurrentGame = new Game();

  ipcMain.on(REQUEST_NEW_GAME, (event, opts = {}) => {
    CurrentGame.newGame(opts);
    CurrentGame.nextQuestion();

    event.reply(RECEIVE_QUESTION, CurrentGame.question);
  });

  ipcMain.on(REQUEST_INFO, (event) => {
    event.reply(RECEIVE_INFO, {
      overallScore: CurrentGame.overallScore,
    });
  });

  ipcMain.on(REQUEST_ANSWER_CHECK, (event, userAnswer) => {
    const { isCorrect, answer } = CurrentGame.answerQuestion(userAnswer);

    event.reply(RECEIVE_ANSWER, {
      answer,
      isCorrect,
      score: CurrentGame.score,
    });

    if (CurrentGame.gameOver) {
      event.reply(RECEIVE_GAME_OVER);
      return;
    }

    CurrentGame.nextQuestion();
    event.reply(RECEIVE_QUESTION, CurrentGame.question);
  });
};

module.exports = { gameMain };
