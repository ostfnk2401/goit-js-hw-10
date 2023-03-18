import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');
const datePicker = document.querySelector('#datetime-picker');

let countdown;
let timer; // define timer as a global variable

function updateTimer() {
  const timeLeft = countdown - Date.now();
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (timeLeft <= 0) {
    clearInterval(timer);
    Notiflix.Notify.success('Countdown is over!');
    startBtn.disabled = false;
    return;
  }

  daysEl.textContent = days < 10 ? `0${days}` : days;
  hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
  minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

function startTimer() {
  countdown = new Date(datePicker.value).getTime();
  if (countdown <= Date.now()) {
    Notiflix.Notify.warning('Please choose a date in the future');
    return;
  }
  startBtn.disabled = true;
  updateTimer();
  timer = setInterval(updateTimer, 1000); // assign the interval ID to the timer variable
}

flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
});

startBtn.addEventListener('click', startTimer);
