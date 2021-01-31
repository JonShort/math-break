const replaceText = (selector, text) => {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
};

window.addEventListener("DOMContentLoaded", () => {
  ipc.send("request-info");

  ipc.on("receive-info", (info) => {
    replaceText("your-score", `You scored ${info.overallScore}`);
  });
});
