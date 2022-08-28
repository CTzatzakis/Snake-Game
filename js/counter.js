class Timer {
  constructor () {
    this.isRunning = false;
    this.startTime = 0;
    this.overallTime = 0;
  }

  _getTimeElapsedSinceLastStart () {
    if (!this.startTime) {
      return 0;
    }
  
    return Date.now() - this.startTime;
  }

  start () {
    if (this.isRunning) {
      return console.error('Timer is already running');
    }

    this.isRunning = true;

    this.startTime = Date.now();
  }

  stop () {
    if (!this.isRunning) {
      return console.error('Timer is already stopped');
    }

    this.isRunning = false;

    this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
  }

  reset () {
    this.overallTime = 0;

    if (this.isRunning) {
      this.startTime = Date.now();
      return;
    }

    this.startTime = 0;
  }

  getTime () {
    if (!this.startTime) {
      return 0;
    }

    if (this.isRunning) {
      return this.overallTime + this._getTimeElapsedSinceLastStart();
    }

    return this.overallTime;
  }
}

const timer = new Timer();
timer.start();
setInterval(() => {
  const timeInSeconds = Math.round(timer.getTime() / 1000);
  let seconds = timeInSeconds % 60; 
  let minutes = timeInSeconds / 60;
  let hours = minutes / 60;
  let days = hours / 24;
  let time = days >= 1 ? ~~days+"d:" : "";
  time = time + hours >= 1 ? ~~hours+"h:" : "";
  time = time + minutes >= 1 ? ~~minutes+"m:" : "";
  time = time + seconds;

  document.getElementById('time').innerText = time ;
}, 100)