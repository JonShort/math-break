const { mathProblem } = require("./methods");

class Game {
  #gameOver;
  #latestAnswer;
  #question;
  #rollingQ;
  #rounds;
  #score;

  constructor(options = {}) {
    this.#gameOver = false;
    this.#latestAnswer = null;
    this.#question = "";
    this.#rollingQ = 0;
    this.#rounds = options.rounds || 5;
    this.#score = 0;
  }

  get score() {
    return this.#score;
  }

  get overallScore() {
    return `${this.#score}/${this.#rounds}`;
  }

  get questionNumber() {
    return this.#rollingQ;
  }

  get answer() {
    return this.#latestAnswer;
  }

  get question() {
    return this.#question;
  }

  get gameOver() {
    return this.#gameOver;
  }

  newGame(options = {}) {
    this.#gameOver = false;
    this.#latestAnswer = null;
    this.#question = "";
    this.#rollingQ = 0;
    this.#rounds = options.rounds || 5;
    this.#score = 0;
  }

  nextQuestion() {
    const { text, answer } = mathProblem();

    this.#rollingQ += 1;
    this.#latestAnswer = answer;
    this.#question = text;
    this.#gameOver = this.#rollingQ >= this.#rounds;
  }

  answerQuestion(answer) {
    if (this.#latestAnswer === answer) {
      this.#score += 1;
      return true;
    }

    return false;
  }
}

module.exports = {
  Game,
}
