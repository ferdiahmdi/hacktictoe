// NOTE
// player pertama selalu O
// player kedua selalu x

// selector DOM
const boxes = document.getElementsByClassName("box");
const playButton = document.getElementById("playButton");
const playerName = document.getElementById("playerName");
const playerNumber = document.getElementById("playerNumber");
const landing = document.querySelector(".landing");
const gameHeaderText = document.querySelector(".gameContainer h1");
const turn = document.getElementById("turn");
const restart = document.getElementById("restartButton");
const gameBoard = document.querySelector("div.gameBoard");

// function untuk input nama player
let playNum = 1;
let players = [];
function handlePlayerName() {
  if (playNum === 1) {
    players.push(playerName.value);
    playerName.value = "";
    playNum = 2;
    playerNumber.textContent = "Second";
    playerNumber.classList.toggle("o");
    playerNumber.classList.toggle("x");
    playButton.textContent = "PLAY";
  } else {
    // untuk mereset form buat next game dan pindah ke container game
    players.push(playerName.value);
    playerName.value = "";
    playNum = 1;
    playerNumber.textContent = "First";
    playerNumber.classList.toggle("o");
    playerNumber.classList.toggle("x");
    playButton.textContent = "GO";
    landing.classList.toggle("game");
    turn.innerHTML = players[0];
    gameHeaderText.innerHTML = `It's <span class="${currentTurn.toLowerCase()}" id="turn">${
      players[0]
    }</span>'s Turn!`;
  }
}
// function handleEnter buat jalanin handlePlayerName dengan 'Enter'
playerName.addEventListener("keydown", function (event) {
  if (event.key === "Enter") handlePlayerName();
});

// giliran tic tac toe dan gamestate
let currentTurn = "O";
let gameWin = false;
let gameTie = false;

// deklarasi array untuk menyimpan kondisi game pada history game
let gameHistory = ["", "", "", "", "", "", "", "", ""];

// update turn text pada function handleBoxClick
function turnText() {
  if (turn.innerHTML === players[0]) {
    turn.innerHTML = players[1];
    turn.classList.toggle("o");
    turn.classList.toggle("x");
    gameHeaderText.innerHTML = `It's <span class="${currentTurn.toLowerCase()}" id="turn">${
      players[1]
    }</span>'s Turn!`;
  } else {
    turn.innerHTML = players[0];
    turn.classList.toggle("o");
    turn.classList.toggle("x");
    gameHeaderText.innerHTML = `It's <span class="${currentTurn.toLowerCase()}" id="turn">${
      players[0]
    }</span>'s Turn!`;
  }
}

// function untuk mengganti box
function handleBoxClick(event) {
  // deklarasi event
  const currentBox = event.target;

  // mengganti isi text html event
  currentBox.innerText = currentTurn;

  // update kondisi box array gameHistory
  const boxId = currentBox.id[currentBox.id.length - 1];
  gameHistory[boxId] = currentTurn;

  // pemasangan class untuk dekorasi background dan mengganti turn
  if (currentTurn === "X") {
    gameChecker(currentTurn, currentBox);
    currentTurn = "O";
  } else if (currentTurn === "O") {
    gameChecker(currentTurn, currentBox);
    currentTurn = "X";
  }

  // ganti tulisan player
  turnText();

  // ganti text atas apabila menang
  if (gameWin) {
    if (currentTurn.toLowerCase() === "o") {
      gameHeaderText.innerHTML = `${players[1]} WON!`;
    } else {
      gameHeaderText.innerHTML = `${players[0]} WON!`;
    }
  } else if (gameTie) {
    gameHeaderText.innerHTML = `DRAW!`;
  }

  // delete function ini dari box agar tidak bisa diclick lagi
  currentBox.removeEventListener("click", handleBoxClick);
}

// function untuk bikin eventListener click box
function makeEventListenerBoxes(boxes) {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", handleBoxClick);
  }
}
// function call awal untuk box
makeEventListenerBoxes(boxes);

// function untuk delete semua eventListener ketika ada kemenangan/draw
function deleteAllEventListener(boxes) {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].removeEventListener("click", handleBoxClick);
    boxes[i].style.cursor = "default";
  }
}

// array kemenangan
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// function untuk call function menang dan draw
function gameChecker(currTurn, currBox) {
  currBox.classList.add(currTurn.toLowerCase());
  if (gameStatus()) {
    // alert(`${currTurn} Won!`);
    gameWin = true;
    deleteAllEventListener(boxes);
    gameBoard.classList.toggle("end");
    restart.classList.toggle("game");
  } else if (gameDraw()) {
    gameTie = true;
    deleteAllEventListener(boxes);
    gameBoard.classList.toggle("end");
    restart.classList.toggle("game");
  }
}

// function untuk check kondisi menang game setelah setiap click
function gameStatus() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      boxes[a].textContent === currentTurn &&
      boxes[b].textContent === currentTurn &&
      boxes[c].textContent === currentTurn
    ) {
      return true;
    }
  }
  return false;
}

// function untuk check draw game
function gameDraw() {
  for (let index of boxes) {
    if (index.innerHTML === "") {
      return false;
    }
  }
  return true;
}

function restartGame() {
  9;
  gameBoard.classList.toggle("end");
  restart.classList.toggle("game");
  currentTurn = "O";
  gameWin = false;
  gameTie = false;
  playNum = 1;
  players = [];
  landing.classList.toggle("game");

  for (let index of boxes) {
    index.textContent = "";
    index.classList.remove("o");
    index.classList.remove("x");
  }
  makeEventListenerBoxes(boxes);
}
