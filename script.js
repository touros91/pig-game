'use strict';

// select DOM elements 
let rollDice = document.querySelector('.roll-dice');
let dice = document.querySelector('.dice');
let currentScore1 = document.querySelector('.current-score1');
let currentScore2 = document.querySelector('.current-score2');
let resultPlayer1 = document.querySelector('.result-player1');
let resultPlayer2 = document.querySelector('.result-player2');
const hold = document.querySelector('.hold');
const newGame = document.querySelector('.new-game');
const left = document.querySelector('.left');
const right = document.querySelector('.right');

// declare variables set initially to 0
let current1 = 0;
let current2 = 0;
let sumCurrent1 = 0;
let sumCurrent2 = 0;

// function to reset all scores
const resetScores = function() {
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;
    resultPlayer1.textContent = 0;
    resultPlayer2.textContent = 0;
    current1 = 0;
    current2 = 0;
    sumCurrent1 = 0;
    sumCurrent2 = 0;
}

// on click on Roll Dice button
rollDice.addEventListener('click', function() {
    // check which is the active player (Player 1 starts to play)
    if(left.classList.contains('bg-active')) {
        dice.classList.remove('hidden');

        // generate random number
        let randomNumber = Math.trunc(Math.random() * 6) + 1;

        // show current dace image based on randomNumber
        for (let i = 1; i <= randomNumber; i++) {
            dice.innerHTML = `<img src="img/dice-${i}.png" alt="Dice number ${i}">`;
        }

        current1 += randomNumber;

        // sum current player points 
        if (randomNumber !== 1) {
            sumCurrent1 += randomNumber;
            currentScore1.textContent = sumCurrent1;
        } else {
            current1 = 0;
            sumCurrent1 = 0;
            left.classList.remove('bg-active');
            right.classList.add('bg-active');   
            currentScore1.textContent = current1;
            resultPlayer1.textContent = 0; 
        } 
    } else {   
        // switch to Player 2 
        dice.classList.remove('hidden');

        // generate random number
        let randomNumber2 = Math.trunc(Math.random() * 6) + 1; 

        // show current dace image based on randomNumber
        for (let i = 1; i <= randomNumber2; i++) {
            dice.innerHTML = `<img src="img/dice-${i}.png" alt="Dice number ${i}">`;
        } 
          
        current2 += randomNumber2;
        
        // sum current player points 
        if (randomNumber2 !== 1) {
            sumCurrent2 += randomNumber2;
            currentScore2.textContent = sumCurrent2;
        } else {
            current2 = 0;
            sumCurrent2 = 0;
            left.classList.add('bg-active');
            right.classList.remove('bg-active');
            currentScore2.textContent = 0;
            resultPlayer2.textContent = 0; 
        }
    }
});

// on click on Hold button 
hold.addEventListener('click', function() {
    dice.classList.add('hidden');

    // check which is the active player and switch to the other player 
    if (left.classList.contains('bg-active') && sumCurrent1 !== 0) {
        sumCurrent1 = 0;
        currentScore1.textContent = 0;
        resultPlayer1.textContent = current1;
        left.classList.remove('bg-active');
        right.classList.add('bg-active');
    } else if(right.classList.contains('bg-active') && sumCurrent2 !== 0) {
        sumCurrent2 = 0;
        resultPlayer2.textContent = current2;
        currentScore2.textContent = 0;
        left.classList.add('bg-active');
        right.classList.remove('bg-active');
    }

    // check if a player reached the winning amount of points of at least 50
    if (Number(resultPlayer1.textContent) >= 50) {
        alert('Player 1 is the WINNER! Click OK to restart the game.');
        location.reload();
    } else if (Number(resultPlayer2.textContent) >= 50) {
        alert('Player 2 is the WINNER! Click OK to restart the game.');
        location.reload();
    }
});

// on click on New Game button
newGame.addEventListener('click', function() {
    left.classList.add('bg-active');
    right.classList.remove('bg-active');
    dice.classList.add('hidden');
    resetScores();
});




