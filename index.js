const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restartBtn');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const instruction = document.getElementById('instruction');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameActive = true;
let timeLeft = 30;
let timer;

const startTimer = () => {
    clearInterval(timer);
    timeLeft = 30;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            switchPlayer();
        }
    }, 1000);
};

const handleCellClick = (event) => {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        displayWinnerMessage(`Player ${currentPlayer} wins!`);
        instruction.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        clearInterval(timer);
    } else if (gameState.includes('')) {
        switchPlayer();
    } else {
        instruction.textContent = 'Game is a draw!';
        gameActive = false;
        clearInterval(timer);
    }
};

const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    instruction.textContent = `Player ${currentPlayer} (${currentPlayer === 'X' ? '1' : '2'}), it's your turn!`;
    startTimer();
    updatePlayerInfo();
};

const checkWinner = () => {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
};

const restartGame = () => {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    instruction.textContent = `Player 1 (X), it's your turn!`;
    gameActive = true;
    startTimer();
    updatePlayerInfo();
    clearWinnerMessage();
};

const updatePlayerInfo = () => {
    if (currentPlayer === 'X') {
        player1.classList.add('active-player');
        player2.classList.remove('active-player');
    } else {
        player1.classList.remove('active-player');
        player2.classList.add('active-player');
    }
};

const displayWinnerMessage = (winnerMessage) => {
    const winnerElement = document.createElement('div');
    winnerElement.classList.add('winner-message');
    winnerElement.textContent = winnerMessage;
    board.appendChild(winnerElement);
};

const clearWinnerMessage = () => {
    const winnerElement = document.querySelector('.winner-message');
    if (winnerElement) {
        winnerElement.remove();
    }
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

startTimer();
instruction.textContent = `Player 1 (X), it's your turn!`;
updatePlayerInfo();
