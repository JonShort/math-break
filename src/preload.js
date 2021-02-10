const { contextBridge } = require("electron");
const { Game } = require("./classes/Game");
const { exposeIpcInMainWorld } = require("./events");
const { exposeHelpersInMainWorld } = require("./helpers");

const CurrentGame = new Game();

contextBridge.exposeInMainWorld("gameMethods", {
  answerQuestion: (answer) => CurrentGame.answerQuestion(answer),
  info: () => ({
    duration: CurrentGame.timer.currentValue,
    gameOver: CurrentGame.gameOver,
    overallScore: CurrentGame.overallScore,
    question: CurrentGame.question,
    rounds: CurrentGame.rounds,
    score: CurrentGame.score,
  }),
  newGame: (opts) => CurrentGame.newGame(opts),
  nextQuestion: () => CurrentGame.nextQuestion(),
});

exposeIpcInMainWorld();
exposeHelpersInMainWorld();
