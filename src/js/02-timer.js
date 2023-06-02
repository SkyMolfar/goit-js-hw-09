// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: (selectedDates) => {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    const startButton = document.querySelector("[data-start]");

    if (selectedDate <= currentDate) {
      window.alert("Please choose a date in the future");
      startButton.disabled = true;
      return;
    } else {
      startButton.disabled = false; 
    }
  },
};

flatpickr("#datetime-picker", options);

const startButton = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");
let countdownIntervalId;

function startCountdown(targetDate) {
  clearInterval(countdownIntervalId);

  function updateCountdown() {
    const currentDate = new Date();
    const timeDiff = targetDate - currentDate;

    if (timeDiff <= 0) {
      clearInterval(countdownIntervalId);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDiff);
    updateTimerDisplay({ days, hours, minutes, seconds });
  }

  countdownIntervalId = setInterval(updateCountdown, 1000);
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

startButton.addEventListener("click", () => {
  const selectedDate = new Date(
    document.querySelector("#datetime-picker").value
  );
  startCountdown(selectedDate);
  startButton.setAttribute("disabled", "disabled");
});


function convertMs(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
}
