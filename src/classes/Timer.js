class Timer {
  constructor() {
    this.interval = null;
    this.min = 0;
    this.sec = 0;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
  }

  get currentValue() {
    let mins = this.min;
    let secs = this.sec;

    if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;

    return `${mins}:${secs}`;
  }

  start() {
    if (!this.interval)
      this.interval = setInterval(
        function () {
          this.update();
        }.bind(this),
        1000
      );
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  reset() {
    this.stop();
    this.min = 0;
    this.sec = 0;
  }

  update() {
    this.sec++;
    if (this.sec == 60) {
      this.min++;
      this.sec = 0;
    }
    const element = document.getElementById("timer");
    if (element) element.innerText = this.currentValue;
  }
}

module.exports = {
  Timer,
};
