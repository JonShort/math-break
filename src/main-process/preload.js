const { Game } = require('./Game');
const { replaceText } = require('./utils/replaceText');

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const CurrentGame = new Game();

  const form = document.getElementById("form");
  const input = document.getElementById("answer");

  const nextQuestion = () => {
    CurrentGame.nextQuestion();

    replaceText("question", CurrentGame.question);
    input.value = "";
  };

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const answer = parseInt(ev.target.elements["answer"].value);
    const isCorrect = CurrentGame.answerQuestion(answer);

    alert(`${isCorrect ? "Correct" : "Incorrect"}! Answer was ${CurrentGame.answer} - score ${CurrentGame.score}`);

    if (CurrentGame.gameOver) {
      alert(`Game over! You scored ${CurrentGame.overallScore}`);
    }

    nextQuestion();
  });

  nextQuestion();

  input.focus();
});
