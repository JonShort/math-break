const { replaceText } = require("./utils/methods");

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

    const { gameOver, overallScore, score, duration } = gameMethods.info();

    alert(
      `${
        isCorrect ? "Correct" : "Incorrect"
      }! Answer was ${answer} - score ${score}`
    );

    if (gameOver) {
      localStorage.setItem("finalScore", overallScore);
      localStorage.setItem("duration", duration);

      const { rounds, score } = gameMethods.info();

      ipc.send(ipc.events.REQUEST_GAME_OVER, {
        duration,
        rounds,
        score,
      });

      ipc.on(ipc.events.RECEIVE_GAME_OVER, () => {
        window.location = "game-over.html";
      });

      return;
    }

    nextQuestion();
  });

  nextQuestion();
});
