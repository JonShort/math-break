const replaceText = (selector, text) => {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
};

window.addEventListener("DOMContentLoaded", () => {
  gameMethods.newGame();

  const form = document.getElementById("form");
  const input = document.getElementById("answer");

  const nextQuestion = () => {
    gameMethods.nextQuestion();
    replaceText("question", gameMethods.info().question);
    input.value = "";
    input.focus();
  };

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const providedAnswer = parseInt(ev.target.elements["answer"].value);
    const { isCorrect, answer } = gameMethods.answerQuestion(providedAnswer);

    const { gameOver, overallScore, score } = gameMethods.info();

    alert(
      `${
        isCorrect ? "Correct" : "Incorrect"
      }! Answer was ${answer} - score ${score}`
    );

    if (gameOver) {
      alert(`Game over! You scored ${overallScore}`);
      window.location = "home.html";
      return;
    }

    nextQuestion();
  });

  nextQuestion();
});
