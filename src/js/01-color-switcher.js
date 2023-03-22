const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  toggleButtons(true, false);

  intervalId = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;
  }, 1000);
}

function onStopBtnClick() {
  toggleButtons(false, true);

  clearInterval(intervalId);
}

function toggleButtons(startDisabled, stopDisabled) {
  startBtn.disabled = startDisabled;
  stopBtn.disabled = stopDisabled;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
