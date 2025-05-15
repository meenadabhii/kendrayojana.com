const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const startButton = document.querySelector("#start");

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let countDownTimerId = null;
let gameActive = false;

function randomSquare() {
    squares.forEach((square) => square.classList.remove("emoji"));
    let randomSquare = squares[Math.floor(Math.random() * squares.length)];
    randomSquare.classList.add("emoji");
    hitPosition = randomSquare.id;
}

squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
        if (square.id == hitPosition && gameActive) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    });
});

function moveEmoji() {
    timerId = setInterval(randomSquare, 500);
}

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        gameActive = false;
        // alert(`Game Over! Your final Score Is ${result}`);
        startButton.textContent = "Play Again?";
        startButton.style.display = "inline-block";
    }
}

function startGame() {
    result = 0;
    currentTime = 60;
    score.textContent = result;
    timeLeft.textContent = currentTime;
    gameActive = true;
    
    clearInterval(timerId);
    clearInterval(countDownTimerId);

    moveEmoji();
    countDownTimerId = setInterval(countDown, 1000);

    startButton.style.display = "none";
}