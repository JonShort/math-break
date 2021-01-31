const { mathProblem } = require("./utils/methods");
const { Timer } = require("./Timer");

class Game {
  constructor(options = {}) {
    this.gameOver = false;
    this.latestAnswer = null;
    this.question = "";
    this.rollingQ = 0;
    this.rounds = options.rounds || 5;
    this.score = 0;
    this.timer = new Timer();

    this.newGame = this.newGame.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
  }

  get overallScore() {
    return `${this.score}/${this.rounds}`;
  }

  get questionNumber() {
    return this.rollingQ;
  }

  get answer() {
    return this.latestAnswer;
  }

  newGame(options = {}) {
    this.gameOver = false;
    this.latestAnswer = null;
    this.question = "";
    this.rollingQ = 0;
    this.rounds = options.rounds || 5;
    this.score = 0;
    this.timer = new Timer();
    this.timer.start();
  }

  nextQuestion() {
    const { text, answer } = mathProblem();

    this.rollingQ += 1;
    this.latestAnswer = answer;
    this.question = text;
    this.gameOver = this.rollingQ >= this.rounds;
  }

  answerQuestion(answer) {
    let isCorrect = false;

    if (this.latestAnswer === answer) {
      isCorrect = true;
      this.score += 1;
    }

    if (this.gameOver) this.timer.stop();

    return {
      answer: this.latestAnswer,
      isCorrect,
    };
  }
}

module.exports = {
  Game,
};
