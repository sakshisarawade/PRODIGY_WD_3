const board = document.getElementById('board');
const status = document.getElementById('status');
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;

// Draw the board
function drawBoard() {
  board.innerHTML = '';
  cells.forEach((value, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.textContent = value;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  });
}

// Handle user click
function handleClick(e) {
  const i = e.target.dataset.index;
  if (cells[i] === '' && !isGameOver) {
    cells[i] = 'X';
    drawBoard();
    if (checkWinner('X')) {
      status.textContent = 'You win!';
      isGameOver = true;
    } else if (cells.every(cell => cell !== '')) {
      status.textContent = 'It\'s a draw!';
      isGameOver = true;
    } else {
      setTimeout(aiMove, 500); // delay AI for realism
    }
  }
}

// Simple AI logic
function aiMove() {
  if (isGameOver) return;
  const emptyCells = cells.map((v, i) => v === '' ? i : null).filter(v => v !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  cells[randomIndex] = 'O';
  drawBoard();
  if (checkWinner('O')) {
    status.textContent = 'AI wins!';
    isGameOver = true;
  } else if (cells.every(cell => cell !== '')) {
    status.textContent = 'It\'s a draw!';
    isGameOver = true;
  }
}

// Check winner
function checkWinner(player) {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return wins.some(combination => 
    combination.every(index => cells[index] === player)
  );
}

// Reset
function resetGame() {
  cells = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameOver = false;
  status.textContent = '';
  drawBoard();
}

// Start
drawBoard();
