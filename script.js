const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart');

const cardsArray = ['L', 'U', 'T', 'H', 'A', 'M', 'E','S'];
let cards = [...cardsArray, ...cardsArray];

let flippedCards = [];
let matchedCards = [];

function shuffleCards() {
  cards.sort(() => 0.5 - Math.random());
}

function createBoard() {
  gameBoard.innerHTML = '';
  shuffleCards(); 
  cards.forEach(cardValue => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardValue;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped')) return;

  this.textContent = this.dataset.value;
  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    matchedCards.push(card1, card2);
    flippedCards = [];

    if (matchedCards.length === cards.length) {
      setTimeout(() => alert('You won!'), 500);
    }
  } else {
    setTimeout(() => {
      card1.textContent = '';
      card2.textContent = '';
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

function restartGame() {
  flippedCards = [];
  matchedCards = [];
  createBoard();
}

restartButton.addEventListener('click', restartGame);


createBoard();