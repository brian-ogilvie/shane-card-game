const board = document.querySelector('.board');
const players = Array.from(document.querySelectorAll('.player'));
const playerScores = players.map(player =>
  player.querySelector('.player__content')
);
const startButton = document.querySelector('.start-btn');
const background = document.querySelector('.background');
const cover = document.querySelector('.board-cover');

let gameInProgress = false;
let score = [0, 0];

let winningCardId;
let activePlayer;

const cards = [];
for (let i = 0; i < 10; i++) {
  const div = document.createElement('div');
  div.classList.add('card');
  div.dataset.cardId = i;
  board.append(div);
  cards.push(div);
}

function displayScores() {
  playerScores.forEach((player, i) => {
    player.textContent = score[i];
  });
}

function endGame() {
  gameInProgress = false;
  cover.classList.remove('lifted');
  background.classList.add('visible');
  startButton.disabled = false;
  const activeIndex = parseInt(activePlayer, 10) - 1;
  score[activeIndex]++;
  displayScores();
}

function displayActivePlayer(active) {
  players.forEach(player => {
    if (player.dataset.playerid === active) {
      player.classList.add('active');
    } else {
      player.classList.remove('active');
    }
  })
}

function switchActivePlayer(currentActive) {
  const newActive = currentActive === "1" ? "2" : "1";
  displayActivePlayer(newActive);
  return newActive;
}

function revealCard() {
  if (!gameInProgress || this.classList.contains('reveal')) {
    return;
  };
  this.classList.add('reveal');
  if (this.dataset.cardId === winningCardId) {
    this.classList.add('winner');
    endGame();
    return;
  }
  activePlayer = switchActivePlayer(activePlayer);
}

function startGame() {
  if (gameInProgress) return;
  cards.forEach(card => {
    card.classList.remove('reveal', 'winner');
  });
  cover.classList.add('lifted');
  startButton.disabled = true;
  background.classList.remove('visible');
  activePlayer = Math.round(Math.random()) ? '1' : '2';
  displayActivePlayer(activePlayer);
  winningCardId = Math.floor(Math.random() * cards.length).toString();
  gameInProgress = true;
}

function handleKeyPress(e) {
  if (e.key === 'Enter') startGame();
}

cards.forEach(card => {
  card.addEventListener('click', revealCard);
});

startButton.addEventListener('click', startGame);

window.addEventListener('keypress', handleKeyPress);
