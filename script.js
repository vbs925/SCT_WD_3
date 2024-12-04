// script.js
const gameBoard = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const modeSelectors = document.getElementsByName('mode');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let playMode = 'player';

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the game board
function initializeBoard() {
  gameBoard.innerHTML = '';
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.textContent = "Player X's turn";
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.setAttribute('data-index', index);
    cellElement.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cellElement);
  });
}

// Handle a cell click
function handleCellClick(event) {
  const cellIndex = event.target.getAttribute('data-index');
  if (board[cellIndex] !== '' || !gameActive) return;

  board[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add('taken');

  if (checkWin()) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every((cell) => cell !== '')) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

  if (playMode === 'computer' && currentPlayer === 'O') {
    setTimeout(computerMove, 500);
  }
}

// Computer makes a move
function computerMove() {
  const emptyCells = board
    .map((cell, index) => (cell === '' ? index : null))
    .filter((index) => index !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const cellElement = document.querySelector(`.cell[data-index="${randomIndex}"]`);
  if (cellElement) cellElement.click();
}

// Check for a win
function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === currentPlayer);
  });
}

// Reset the game
resetButton.addEventListener('click', initializeBoard);

// Change play mode
modeSelectors.forEach((selector) => {
  selector.addEventListener('change', () => {
    playMode = document.querySelector('input[name="mode"]:checked').value;
    initializeBoard();
  });
});

// Start the game
initializeBoard();
