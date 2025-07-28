// script.js

let timer;
let isRunning = false;
let isBreak = false;
let minutes = 25;
let seconds = 0;

const timerDisplay = document.getElementById("timer");
const catImg = document.getElementById("cat");

function updateTimerDisplay() {
  let m = minutes.toString().padStart(2, '0');
  let s = seconds.toString().padStart(2, '0');
  timerDisplay.textContent = `${m}:${s}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  catImg.src = "kucing.gif";

  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timer);
        isRunning = false;
        isBreak = !isBreak;
        minutes = isBreak ? 10 : 25;
        seconds = 0;
        startTimer(); // auto continue
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
  catImg.src = "kucing.gif";
}

function resetTimer() {
  stopTimer();
  minutes = 25;
  seconds = 0;
  updateTimerDisplay();
}

// To-Do List logic
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    const newText = prompt("Edit task:", span.textContent);
    if (newText !== null) span.textContent = newText;
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => li.remove();

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}
