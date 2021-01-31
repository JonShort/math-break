const { contextBridge } = require("electron");
const { Game } = require("./classes/Game");

const CurrentGame = new Game();

contextBridge.exposeInMainWorld("gameMethods", {
  answerQuestion: (answer) => CurrentGame.answerQuestion(answer),
  info: () => ({
    gameOver: CurrentGame.gameOver,
    overallScore: CurrentGame.overallScore,
    question: CurrentGame.question,
    score: CurrentGame.score,
    duration: CurrentGame.timer.currentValue,
  }),
  newGame: (opts) => CurrentGame.newGame(opts),
  nextQuestion: () => CurrentGame.nextQuestion(),
});
