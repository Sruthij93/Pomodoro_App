// get elements from the webpage
const startBtn = document.querySelector(".btn-start");
const session = document.querySelector(".minutes");
const bellSound = document.getElementById("bell-sound");
const secondDiv = document.querySelector(".seconds");
const minuteDiv = document.querySelector(".minutes");
const timerSelect = document.querySelector("#timer-select");

// adding reset button
const resetBtn = document.createElement("button");
resetBtn.textContent = "RESET";
resetBtn.classList.add("btn-reset");
startBtn.insertAdjacentElement("afterend", resetBtn);

// set variables
let myInterval;
let state = true;
let initialTime;
let isResume = false;
let minutesLeft;
let secondsLeft;

// function to start or resume the timer
const appTimer = () => {
  if (state || startBtn.textContent === "RESUME") {
    let sessionAmount = Number.parseInt(session.textContent);
    initialTime = sessionAmount;
    state = false;

    // if the timer is starting
    if (sessionAmount != 0 && !isResume) {
      totalSeconds = sessionAmount * 60;
    }
    // else if timer is being resumed, get the last time it stopped at
    else if (sessionAmount != 0 && isResume) {
      minutesLeft = Number.parseInt(minuteDiv.textContent);
      secondsLeft = Number.parseInt(secondDiv.textContent);
      totalSeconds = minutesLeft * 60 + secondsLeft;
      isResume = false;
    } else {
      totalSeconds = Number.parseInt(secondDiv.textContent);
    }

    startBtn.textContent = "PAUSE";

    // function to update timer every second
    const updateSeconds = () => {
      totalSeconds--;
      minutesLeft = Math.floor(totalSeconds / 60);
      secondsLeft = totalSeconds % 60;

      if (secondsLeft < 10) {
        secondDiv.textContent = "0" + secondsLeft;
      } else {
        secondDiv.textContent = secondsLeft;
      }
      minuteDiv.textContent = `${minutesLeft}`;

      // once timer is done, bell goes off and reset the timer
      if (minutesLeft === 0 && secondsLeft === 0) {
        bellSound.play();
        state = true;
        startBtn.textContent = "START";
        clearInterval(myInterval);
        resetTimer();
      }
    };

    myInterval = setInterval(updateSeconds, 1000);
  } else if (startBtn.textContent === "PAUSE") {
    state = false;
    startBtn.textContent = "RESUME";
    isResume = true;
    clearInterval(myInterval);
  }
};

const resetTimer = () => {
  clearInterval(myInterval);
  state = true;
  startBtn.textContent = "START";
  initialTime = Number.parseInt(timerSelect.value);
  minuteDiv.textContent = initialTime;
  secondDiv.textContent = "00";
};

const updateSelectedTime = () => {
  if (state) {
    const selectedMinutes = Number.parseInt(timerSelect.value);
    minuteDiv.textContent = selectedMinutes;
    secondDiv.textContent = "00";
    initialTime = selectedMinutes;
  }
};

timerSelect.addEventListener("change", updateSelectedTime);
startBtn.addEventListener("click", appTimer);
resetBtn.addEventListener("click", resetTimer);
