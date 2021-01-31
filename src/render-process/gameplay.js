const replaceText = (selector, text) => {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
};

window.addEventListener("DOMContentLoaded", () => {
  ipc.send(events.REQUEST_NEW_GAME);

  const form = document.getElementById("form");
  const input = document.getElementById("answer");

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const providedAnswer = parseInt(ev.target.elements["answer"].value);
    ipc.send(events.REQUEST_ANSWER_CHECK, providedAnswer);
  });

  // Event listeners
  ipc.on(events.RECEIVE_QUESTION, (question) => {
    replaceText("question", question);
    input.value = "";
    input.focus();
  });

  ipc.on(events.RECEIVE_ANSWER, (info) => {
    const { answer, isCorrect, score } = info;

    alert(
      `${
        isCorrect ? "Correct" : "Incorrect"
      }! Answer was ${answer} - score ${score}`
    );
  });

  ipc.on(events.RECEIVE_GAME_OVER, () => {
    window.location = "game-over.html";
  });
});
