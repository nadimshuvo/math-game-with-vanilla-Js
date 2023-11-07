const problemElement = document.querySelector(".problem");
const ourForm = document.querySelector(".our-form");
const ourField = document.querySelector(".our-field");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");
const progressBar = document.querySelector(".progress-inner");
const endMessage = document.querySelector(".end-message");
const resetButton = document.querySelector(".reset-button");

let timer;
let timeRemaining = 0;

let state = {
  score: 0,
  wrongAnswers: 0,
};

function updateProblem() {
  state.currentProblem = generateProblem();
  problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`;
  ourField.value = "";
  ourField.focus();
}

updateProblem();

// update timer display function

function updateTimerDisplay() {
  document.querySelector(".timer").textContent = `${timeRemaining}`;
}

function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}

function generateProblem() {
  return {
    numberOne: generateNumber(10),
    numberTwo: generateNumber(10),
    operator: ["+", "-", "x"][generateNumber(2)],
  };
}

ourForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  let correctAnswer;
  const p = state.currentProblem;
  if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo;
  if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo;
  if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo;

  if (parseInt(ourField.value, 10) === correctAnswer) {
    state.score++;
    pointsNeeded.textContent = 10 - state.score;
    updateProblem();
    renderProgressBar();
  } else {
    state.wrongAnswers++;
    mistakesAllowed.textContent = 2 - state.wrongAnswers;
    problemElement.classList.add("animate-wrong");
    setTimeout(() => problemElement.classList.remove("animate-wrong"), 451);
  }
  checkLogic();
}

function checkLogic() {
  // if you won
  if (state.score === 10) {
    endMessage.textContent = "Congrats! You won.";
    endMessage.style.color = "white";
    document.body.classList.add("overlay-is-open");
    document.querySelector(".overlay").style.backgroundImage =
      "url('./win_img.jpg')";
    setTimeout(() => resetButton.focus(), 331);
  }
  else if (state.wrongAnswers === 3) {
    endMessage.textContent = "Sorry! You lost.";
    endMessage.style.color = "#fef186";
    document.body.classList.add("overlay-is-open");
    document.querySelector(".overlay").style.backgroundImage =
      "url('./rip_img.jpg')";
    setTimeout(() => resetButton.focus(), 331);
  }
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
  clearInterval(timer);
  document.body.classList.remove("overlay-is-open");
  updateProblem();
  state.score = 0;
  state.wrongAnswers = 0;
  pointsNeeded.textContent = 10;
  mistakesAllowed.textContent = 2;
  renderProgressBar();
  timeRemaining = 30;

  timer = setInterval(function () {
    timeRemaining--;
    updateTimerDisplay();
    if (timeRemaining === 0) {
      clearInterval(timer);
      endGame()
    }
  }, 1000);
}

// end Game
function endGame() {
  if (state.score !== 10) {
    endMessage.textContent = "Sorry! You lost.";
    endMessage.style.color = "#fef186";
    document.body.classList.add("overlay-is-open");
    document.querySelector(".overlay").style.backgroundImage =
      "url('./rip_img.jpg')";
    setTimeout(() => resetButton.focus(), 331);
  }
}

function renderProgressBar() {
  progressBar.style.transform = `scaleX(${state.score / 10})`;
}
