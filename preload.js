const { mathProblem } = require("./methods");

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  let currAnswer = 0;
  let score = 0;
  let rollingQ = 0;

  const form = document.getElementById("form");
  const input = document.getElementById("answer");

  const newMathProblem = () => {
    rollingQ++;
    const { text, answer } = mathProblem();

    replaceText("question", text);
    currAnswer = answer;
    input.value = "";
  };

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    let statement = "Incorrect";
    const answer = parseInt(ev.target.elements["answer"].value);

    if (answer === currAnswer) {
      score++;
      statement = "Correct";
    }

    alert(`${statement}! Answer was ${currAnswer} - score ${score}`);

    if (rollingQ >= 5) {
      alert(`Game over! You scored ${score}/${rollingQ}`);
    }

    newMathProblem();
  });

  newMathProblem();

  input.focus();
});
