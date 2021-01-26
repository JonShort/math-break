const lemon = window.gameMethods;

const replaceText = (selector, text) => {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
};

window.addEventListener("DOMContentLoaded", () => {
  lemon.newGame();

  const form = document.getElementById("form");
  const input = document.getElementById("answer");

  const nextQuestion = () => {
    lemon.nextQuestion();
    replaceText("question", lemon.info().question);
    input.value = "";
    input.focus();
  };

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const providedAnswer = parseInt(ev.target.elements["answer"].value);
    const { isCorrect, answer } = lemon.answerQuestion(providedAnswer);

    const { gameOver, overallScore, score } = lemon.info();

    alert(
      `${
        isCorrect ? "Correct" : "Incorrect"
      }! Answer was ${answer} - score ${score}`
    );

    if (gameOver) {
      alert(`Game over! You scored ${overallScore}`);
      return;
    }

    nextQuestion();
  });

  nextQuestion();
});
