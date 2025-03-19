const gameBoard = document.getElementById('game-board');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('click', () => handleCellClick(i));
        gameBoard.appendChild(cell);
    }
}

function handleCellClick(index) {
    if (board[index] === '') {
        board[index] = currentPlayer;
        renderBoard();
        if (checkWin()) {
            setTimeout(() => alert(`${currentPlayer} wins!`), 10);
            resetGame();
        } else if (board.every(cell => cell !== '')) {
            setTimeout(() => alert('It\'s a draw!'), 10);
            resetGame();
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
    currentPlayer = 'X';
}

document.getElementById('reset-button').addEventListener('click', resetGame);

createBoard();
