import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      window.alert("Please choose a date in the future");
      return;
    }

    const startButton = document.querySelector("[data-start]");
    startButton.removeAttribute("disabled");
    debugger;
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
  const selectedDate = flatpickr.parseDate(
    document.querySelector("#datetime-picker").value
  );
  startCountdown(selectedDate);
  startButton.setAttribute("disabled", "disabled");
});
const datetimePicker = flatpickr("#datetime-picker", options);

datetimePicker.config.onClose = function (selectedDates) {
  const selectedDate = selectedDates[0];

  if (selectedDate < new Date()) {
    notiflix.Notify.warning("Please choose a date in the future");
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
};

startButton.addEventListener("click", () => {
  const selectedDate = datetimePicker.selectedDates[0];
  startCountdown(selectedDate);
  startButton.disabled = true;
});
function startCountdown(endDate) {
  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const timeDiff = endDate - currentDate;

    if (timeDiff <= 0) {
      clearInterval(intervalId);
      updateTimerDisplay(0, 0, 0, 0);
      notiflix.Notify.success("Countdown completed!");
      startButton.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDiff);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}
