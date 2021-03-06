window.addEventListener("DOMContentLoaded", () => {
  const highScoresSection = document.getElementById("highscores");
  ipc.send(ipc.events.REQUEST_SCORES);

  ipc.on(ipc.events.RECEIVE_SCORES, (scores = []) => {
    if (scores.length === 0) {
      const noScoresText = document.createElement("p");
      noScoresText.innerHTML = "No scores available";
      highScoresSection.append(noScoresText);
    } else {
      var list = document.createElement("ul");
      scores.reverse().map(({ score, rounds, duration, date }) => {
        const element = document.createElement("li");
        element.innerHTML = `${new Date(
          date
        ).toLocaleString()} - ${score}/${rounds} - ${duration}`;
        list.appendChild(element);
      });
      highScoresSection.append(list);
    }
  });
});
