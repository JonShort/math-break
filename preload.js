const { mathProblem } = require('./methods');

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  let currAnswer = 0;

  const newMathProblem = () => {
    const { text, answer } = mathProblem();
  
    replaceText("question", text);
    currAnswer = answer;
  }

  const form = document.getElementById('form');
  form.addEventListener('submit', (ev) => {
    const answer = parseInt(ev.target.elements['answer'].value);

    if (answer === currAnswer) {
      alert(`Correct! Answer was ${currAnswer}`);
      return;
    }

    alert(`Incorrect! Answer was ${currAnswer}`);
  })

  newMathProblem();

  const input = document.getElementById('answer');
  input.focus();
})
