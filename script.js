const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
let squares = [];
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

startGame();


function startGame () {
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    score = 0;
    direction = 1;
    intervalTime = 200;
    scoreDisplay.textContent = score;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    generateApple();
    timerId = setInterval(move, intervalTime);
}

function move () {
   
    const hitBottom = (currentSnake[0] + 20 >= 400 && direction === 20);
    const hitTop = (currentSnake[0] - 20 < 0 && direction === -20);
    const hitRight = (currentSnake[0] % 20 === 19 && direction === 1);
    const hitLeft = (currentSnake[0] % 20 === 0 && direction === -1);
    const hitSelf = squares[currentSnake[0] + direction]?.classList.contains('snake');
    if (hitRight || hitBottom || hitTop || hitLeft || hitSelf) {
        return clearInterval(timerId);
    }
     const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    const newHead = currentSnake[0] + direction;
    currentSnake.unshift(newHead);
    squares[newHead].classList.add('snake');
    
    if (squares[newHead].classList.contains('apple')) {
        squares[newHead].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        score++;
        scoreDisplay.textContent = score;
        generateApple();
    }

}
function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}

function changeDirection (newDir) {
    if(direction + newDir !== 0) {
        direction = newDir;
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') changeDirection(-20);
    if (e.key === 'ArrowDown') changeDirection(20);
    if (e.key === 'ArrowLeft') changeDirection(1);
    if (e.key === 'ArrowRight') changeDirection(-1);
});

