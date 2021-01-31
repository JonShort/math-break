const replaceText = (selector, text) => {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
};

window.addEventListener("DOMContentLoaded", () => {
  ipc.send("request-new-game");

  const form = document.getElementById("form");
  const input = document.getElementById("answer");

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const providedAnswer = parseInt(ev.target.elements["answer"].value);
    ipc.send("request-answer-check", providedAnswer);
  });

  // Event listeners
  ipc.on("receive-question", (question) => {
    replaceText("question", question);
    input.value = "";
    input.focus();
  });

  ipc.on("receive-answer", (info) => {
    const { answer, isCorrect, score } = info;

    alert(
      `${
        isCorrect ? "Correct" : "Incorrect"
      }! Answer was ${answer} - score ${score}`
    );
  });

  ipc.on("receive-game-over", () => {
    window.location = "game-over.html";
  });
});
