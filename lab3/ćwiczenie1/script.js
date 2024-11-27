let timerInterval;
let timeElapsed = 0;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return minutes > 0
    ? `${minutes}min ${remainingSeconds}s`
    : `${remainingSeconds}s`;
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      timeElapsed++;
      timerDisplay.textContent = formatTime(timeElapsed);
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  timeElapsed = 0;
  timerDisplay.textContent = '0s';
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
