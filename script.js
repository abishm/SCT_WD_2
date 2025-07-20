let startTime = 0,
    updatedTime = 0,
    difference = 0,
    timerInterval,
    isRunning = false,
    laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('laps');

function formatTime(ms) {
  const centiseconds = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function startTimer() {
  if (!isRunning) {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(() => {
      updatedTime = new Date().getTime();
      difference = updatedTime - startTime;
      display.textContent = formatTime(difference);
    }, 10);
    isRunning = true;
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  startTime = 0;
  difference = 0;
  isRunning = false;
  display.textContent = "00:00:00.00";
  laps = [];
  lapList.innerHTML = '';
}

function addLap() {
  if (isRunning) {
    const lapTime = formatTime(difference);
    laps.push(lapTime);
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapList.appendChild(li);
    lapList.scrollTop = lapList.scrollHeight;
  }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
