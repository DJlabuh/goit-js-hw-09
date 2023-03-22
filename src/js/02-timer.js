import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');

const elements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

startButton.disabled = true;

function calculateTimeLeft(endDate) {
  const currentDate = Date.now();
  const diffInMs = endDate - currentDate;
  const timeLeft = convertMs(diffInMs);
  return timeLeft;
}

function convertMs(ms) {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  const days = Math.floor(ms / DAY);
  const hours = Math.floor((ms % DAY) / HOUR);
  const minutes = Math.floor((ms % HOUR) / MINUTE);
  const seconds = Math.floor((ms % MINUTE) / SECOND);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateCountdownDisplay(timeLeft) {
  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  elements.days.textContent = addLeadingZero(days);
  elements.hours.textContent = addLeadingZero(hours);
  elements.minutes.textContent = addLeadingZero(minutes);
  elements.seconds.textContent = addLeadingZero(seconds);
}


function countdown(selectedDate) {
  const countdownInterval = setInterval(() => {
    const timeLeft = selectedDate - Date.now();

    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      return;
    }

    updateCountdownDisplay(timeLeft);
  }, 1000);
}

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    const selectedDate = selectedDates;

    if (selectedDate <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
});

startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(datetimePicker.value, 'Y-m-d H:i');
  const timeLeft = calculateTimeLeft(selectedDate);
  countdown(selectedDate);
  startButton.disabled = true;
});
