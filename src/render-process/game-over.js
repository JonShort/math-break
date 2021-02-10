window.addEventListener("DOMContentLoaded", () => {
  ipc.send(ipc.events.REQUEST_LATEST_SCORE);

  ipc.on(
    ipc.events.RECEIVE_LATEST_SCORE,
    ({ score, rounds, duration } = {}) => {
      helpers.replaceText(
        "your-score",
        `You scored ${score}/${rounds} in ${duration}`
      );
    }
  );
});
