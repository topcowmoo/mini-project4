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