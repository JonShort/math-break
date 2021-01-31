const replaceText = (selector, text) => {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
};

window.addEventListener("DOMContentLoaded", () => {
  ipc.send("new-game");

  const form = document.getElementById("form");
  const input = document.getElementById("answer");

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const providedAnswer = parseInt(ev.target.elements["answer"].value);
    ipc.send("answer-question", providedAnswer);
  });

  // Event listeners
  ipc.on("question", (question) => {
    replaceText("question", question);
    input.value = "";
    input.focus();
  });

  ipc.on("answer", (info) => {
    const { answer, isCorrect, score } = info;

    alert(
      `${
        isCorrect ? "Correct" : "Incorrect"
      }! Answer was ${answer} - score ${score}`
    );
  });

  ipc.on("game-over", (overallScore) => {
    alert(`Game over! You scored ${overallScore}`);
    return;
  });
});
