const replaceText = (selector, text) => {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
};

window.addEventListener("DOMContentLoaded", () => {
  const score = localStorage.getItem("finalScore");
  const duration = localStorage.getItem("duration");
  replaceText("your-score", `You scored ${score} in ${duration}`);
});
