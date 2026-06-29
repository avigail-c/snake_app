const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
let squares = 1;
let currentSnake = [2, 1, 0];
let direction = 1;
let appleIndex = 0;
let score = 0;
let timerId = 0;
let intervalTime = 200;

function createBoard() {
    for (let i = 0; i < 400; i++){
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);
    }
}
createBoard();
