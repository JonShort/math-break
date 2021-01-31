const replaceText = (selector, text) => {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
};

window.addEventListener("DOMContentLoaded", () => {
  ipc.send(events.REQUEST_INFO);

  ipc.on(events.RECEIVE_INFO, (info) => {
    replaceText("your-score", `You scored ${info.overallScore}`);
  });
});
