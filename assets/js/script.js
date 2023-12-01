var wordBlank = document.querySelector(".word-blank");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

var lettersInChosenWord = [];
var blanksLetters = [];

var words = ["variable", "array", "object", "modulus", "function", "string", "boolean"];

function init() {
    getWins();
    getLosses();
}

function startGame() {
    isWin = false;
    timerCount = 10;
    startButton.disabled = true;
    renderBlanks()
    startTimer()
}

function winGame() {
    wordBlank.textContent = "YOU WIN!!!";
    winCounter++;
    startButton.disabled = false;
    setWins()
}

function loseGame() {
    wordBlank.textContent = "GAME OVER";
    loseCounter++;
    startButton.disabled = false;
    setLosses()
}

function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            if (isWin && timerCount > 0) {
                clearInterval(timer);
                winGame();
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

function renderBlanks() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    lettersInChosenWord = chosenWord.split("");
    numBlanks = lettersInChosenWord.length;
    blanksLetters = [];
    for (var i = 0; i < numBlanks; i++) {
        blanksLetters.push("_");
    }
    wordBlank.textContent = blanksLetters.join(" ");
}


function setWins() {
    win.textContent = winCounter;
    localStorage.setItem("winCounter", winCounter);
}

function setLosses() {
    lose.textContent = loseCounter;
    localStorage.setItem("loseCounter", loseCounter);
}

function getWins() {
    var storedWins = localStorage.getItem("winCounter");
    if (storedWins === null) {
        winCounter = 0;
    } else {
        winCounter = storedWins;
    }
    win.textContent = winCounter;
}

function getLosses() {

    var storedLosses = localStorage.getItem("loseCount");
    if (storedLosses === null) {
        loseCounter = 0;
    } else {
        loseCounter = storedLosses;
    }
    lose.textContent = loseCounter;
}

function checkWin() {
    if (chosenWord === blanksLetters.join(" ")) {
        isWin = true;
    }
}

function checkLetters(letter) {
    var letterInWord = false;
    for (var i = 0; i < numBlanks; i++) {
        if (choseWord[i] === letter) {
            letterInWord = true;
        }
}
if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
        if (chosenWord[j] === letter) {
            blanksLetters[j] = letter;
        }
    }
    wordBlank.textContent = blanksLetters.join(" ");
    }
}

document.addEventListener("keydown", function(event) {
    if (timerCount === 0) {
        return;
    }
    var key = event.key.toLowerCase();
    var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789".split("");
    if (alphabetNumericCharacters.includes(key)) {
        var letterGussed = event.key;
        checkLetters(letterGussed);
        checkWin();
    } 
});

startButton.addEventListener("click", startGame);

init();

var resetButton = document.querySelector(".reset-button");

function resetGame() {
    winCounter = 0;
    loseCounter = 0;
    setWins()
    setLosses()
}

resetButton.addEventListener("click", resetGame);
