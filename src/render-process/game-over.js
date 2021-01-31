const replaceText = (selector, text) => {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
};

window.addEventListener("DOMContentLoaded", () => {
  const score = localStorage.getItem("finalScore");
  replaceText("your-score", `You scored ${score}`);
});
