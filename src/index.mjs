const boxes = document.querySelectorAll(".box");
const restartBtn = document.getElementById("restartBtn");
const score = document.getElementById("score");
const highScore = document.getElementById("highScore");
const lowestScore = document.getElementById("lowestScore");

lowestScore.textContent = boxes.length;

const colors = ["red", "blue", "green", "yellow", "orange", "pink"];
const all_colors = [...colors, ...colors];
let selectedBoxes = [];
let currentScore = 0;

function removeColors() {
  boxes.forEach((box) => {
    box.className = "box grey";
  });
}

function fillColors() {
  all_colors.sort(() => Math.random() - 0.5);

  boxes.forEach((box, index) => {
    box.classList.add(all_colors[index]);
    box.classList.add("grey");
  });
}

function resetSelectedBoxes() {
  selectedBoxes = [];
}

function getBoxColor(box) {
  return colors.find((color) => box.classList.contains(color));
}

function handleMatch(box1, box2) {
  if (getBoxColor(box1) !== getBoxColor(box2)) {
    setTimeout(() => {
      box1.classList.add("grey");
      box2.classList.add("grey");
      resetSelectedBoxes();
    }, 500);
  } else {
    resetSelectedBoxes();
  }
}

function isBoxReleaved(box) {
  return !box.classList.contains("grey");
}

function updateNumOfMoves(moves) {
  score.textContent = moves;
}

function isGameComplete() {
  return !Array.from(boxes).some((box) => box.classList.contains("grey"));
}
function updateHighestScoreOnScreen(score) {
  highScore.textContent = score;
}
function handleClick(box) {
  if (selectedBoxes.length >= 2 || isBoxReleaved(box)) {
    return;
  }
  currentScore++;
  updateNumOfMoves(currentScore);
  box.classList.remove("grey");
  selectedBoxes.push(box);

  if (selectedBoxes.length === 2) {
    handleMatch(selectedBoxes[0], selectedBoxes[1]);
  }

  if (isGameComplete()) {
    console.log("complete", currentScore);
    // save highest score to localstorage
    const prevScore =
      JSON.parse(localStorage.getItem("highScore")) || Number.MAX_SAFE_INTEGER;
    if (currentScore < prevScore) {
      localStorage.setItem("highScore", JSON.stringify(currentScore));
      updateHighestScoreOnScreen(currentScore);
    }
  }
}

function updateHighestScoreFromLocalStorage() {
  const score = JSON.parse(localStorage.getItem("highScore"));
  updateHighestScoreOnScreen(score);
}

function initializeGame() {
  currentScore = 0;
  updateNumOfMoves(0);
  removeColors();
  fillColors();
  resetSelectedBoxes();
  updateHighestScoreFromLocalStorage();

  boxes.forEach((box) => {
    box.addEventListener("click", () => handleClick(box));
  });
}

restartBtn.addEventListener("click", initializeGame);

initializeGame();
