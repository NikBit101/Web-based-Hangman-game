"use strict"

import { drawBackground, clearCanvas } from './drawCanvas.mjs';
import { displayHiddenWord } from './displayHiddenWord.mjs';
import { prepareHandles } from './prepareHandles.mjs';
import { lifeCount } from './lifeCount.mjs';
import { hideWord } from './hideWord.mjs';
import * as disable from './disableInputs.mjs';
import * as enable from './enableInputs.mjs';
//import { scoreCount } from '../scoreCount.mjs';

let handles = {};
let randomCategory;
let randomWord = [];
let usedLetters = [];
let hiddenWord;
let letterFound;
let condition;
let lives;
let scoreWins;
let scoreLosses;

function displayCategory(category) {
    handles.category.textContent = `Category: ${category}`;
}

async function getRandomWord() {
    const response = await fetch('word');
    if(response.ok) {
        const fetchedWord = await response.json();
        randomWord = fetchedWord;
        hiddenWord = hideWord(fetchedWord);
        displayHiddenWord(hiddenWord);
        return;
    } else {
        handles.errorMsg.textContent = `Word failed to load`;
        throw new Error(`[${response.status}] connection failed`);
    }
}

async function getRandomCategory() {
    const response = await fetch('categories');
    if(response.ok) {
        const fetchedCategory = await response.json();
        // display outputs taken from server
        randomCategory = fetchedCategory;
        displayCategory(fetchedCategory);
        return;
    } else {
        handles.errorMsg.textContent = `Category failed to load`;
        throw new Error(`[${response.status}] connection failed`);
    }

}

// send to server the current score, thereby updating it
async function setScore(scrW, scrL) {
    const payload = { wins: scrW, losses: scrL };
    const response = await fetch('score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if(response.ok) {
        let scoreCount = await response.json();
        scoreCount.wins = scoreWins;
        scoreCount.losses = scoreLosses;
        handles.scoreCount.textContent = `Wins: ${scoreCount.wins}\nLosses: ${scoreCount.losses}`;
    } else {
        handles.scoreCount.textContent = ['*Could not load new score :-(*'];
        throw new Error(`[${response.status}] connection failed`);
    }
}

// display a condition message
function displayMessage(condition, rWord) {
    handles.warningMsg.textContent = condition === true ? 'You win! +1 point' : `The word was '${rWord.toUpperCase()}'`;
    if (condition) {
        handles.warningMsg.style.color = 'Lime';
    } else {
        handles.warningMsg.style.color = 'Red';
    }
}

// when the page is restarted, all the required variables will be reset,
// canvas will be redrawn.
function restartPage(theClass, prompting) {
    randomCategory;
    randomWord = [];
    usedLetters = [];
    hiddenWord = '';
    letterFound = false;
    condition = false;
    handles.letter.value = '';
    handles.warningMsg.textContent = '';
    handles.usedLetters.textContent = 'Used Letters: ';
    handles.warningMsg.style.color = 'Red';

    enable.enableButton();
    
    if (prompting) {
        handles.gameSection.removeChild(theClass);
        prompting = false;
    }

    clearCanvas();
    drawBackground();
    getRandomCategory();
    getRandomWord();
    setLife();
    displayScore();
}

// the 'Play Again?' dialog will be created here
function createPrompt() {
    // create HTML tags
    const restartPrompt = document.createElement('p');
    restartPrompt.setAttribute('id', 'restartPrompt');
    return restartPrompt;
}

// create restart prompt box here
function restartPrompt() {
    let newText;
    let rPrompt;
    let prompting;
    let gameSec = handles.gameSection;

    // prompt user with restart
    prompting = true;
    // text
    newText = document.createTextNode("Play Again?");
    rPrompt = createPrompt();
    rPrompt.append(newText);
    // class
    const newClass = document.createElement('class');
    newClass.className = 'restartPrompt';
    newClass.append(rPrompt);

    // buttons yes/no
    const btnYes = document.createElement('button');
    btnYes.setAttribute('id', "btnYes");
    btnYes.setAttribute('class', "promptButtons");
    const btnNo = document.createElement('button');
    btnNo.setAttribute('id', "btnNo");
    btnNo.setAttribute('class', "promptButtons");
    btnYes.textContent = "Yes";
    btnNo.textContent = "No";
    
    newClass.append(btnYes);
    newClass.append(btnNo);
    gameSec.append(newClass);

    // restart whole page
    document.querySelector('#btnYes').addEventListener('click', function(){
        restartPage(newClass, prompting);
    });

    // exit the page through a button 'No'
    document.querySelector('#btnNo').addEventListener('click', function() {
        window.close();
    });
}

// The function stops the game process, 
// disables inputs, 
// creates a prompt for user to restart or leave the game.
function gameStop(condition) {
    if (condition) {
        disable.disableButton();
        displayMessage(condition, randomWord);
        scoreWins +=1;
        setScore(scoreWins, scoreLosses);
        restartPrompt();
    } else {
        disable.disableButton();
        displayMessage(condition, randomWord);
        scoreLosses +=1;
        setScore(scoreWins, scoreLosses);
        restartPrompt();
    }
}

// The function will monitor the life count.
// It accepts 'lives' as 'lCount' (which is an int or number)
// it stops the game and sends true/false condition after checking whether the player won or lost
function monitorLife(lCount) {
    lifeCount(lCount);
    if(lCount === 0) {
        condition = false;
        gameStop(condition);
    } else if (hiddenWord.join('') === randomWord && lCount > 0){
        condition = true;
        gameStop(condition);
    }
    handles.scoreCount.textContent = `Wins: ${scoreWins}\nLosses: ${scoreLosses}`;
}

// The function will check the letter input to compare it with the word
function letterCheck(who) {
    const letter = who.toLowerCase();
    const usedLetterstxt = handles.usedLetters;

    // record certain letter each time the user enters it
    // check letters array based on a user input
    for(let i = 0; i < usedLetters.length; i++) {
        // letter already exists
        if (usedLetters[i].includes(letter)) {
            handles.warningMsg.textContent = `The letter '${letter}' was already guessed before`;
            return;
        }
    }
    
    // go through word array to find the letter in that word
    for(let i = 0; i < randomWord.length; i++) {
        // found a letter
        if(randomWord[i].includes(letter)) {
            hiddenWord[i] = hiddenWord[i].replace(hiddenWord[i], letter);
            
            displayHiddenWord(hiddenWord);
            letterFound = true;

        } else if (i+1 === randomWord.length && !letterFound){
            // letter does not exist in the word
            handles.warningMsg.textContent = `The letter '${letter}' does not exist in the word`;
            lives -=1;
        }
    }
    monitorLife(lives);
    letterFound = false;
    usedLetters.push(letter);
    //handles.letter.value = '';
    handles.lifeCount.textContent = `Lives: ${lives}`;
    usedLetterstxt.textContent = `Used letters: ${usedLetters}`;
}

// this function may need to be deleted after testing
function validateInput() {
    const letter = handles.letter.value;

    if(letter === '' || letter === ' ' || Number.isInteger(Number(letter))) {
        handles.warningMsg.textContent = `Please input a letter into field`;
        return;
    }

    handles.warningMsg.textContent = '';
    letterCheck(letter);
}

// what button was clicked by the mouse
function whatClicked(e) {
    for(let i = 0; i < handles.letterButton.length; i+=1) {
        const button = handles.letterButton[i];
        if(e.target === button) {
            handles.letter.value = button.textContent;
            letterCheck(button.textContent);
            return;            
        }
    }
}

// check the keys that were pressed by the user on keyboard
function checkKeys(e) {
    if(lives > 0) {
        switch(e.key.toLowerCase()) {
            // first row
            case "enter":
                validateInput();
                break;
            case "backspace":
                handles.letter.value = null;
                break;
            case "q":
                handles.letter.value = 'q';
                break;    
            case "w":
                handles.letter.value = 'w';
                break;    
            case "e":
                handles.letter.value = 'e';
                break;    
            case "r":
                handles.letter.value = 'r';
                break;    
            case "t":
                handles.letter.value = 't';
                break;    
            case "y":
                handles.letter.value = 'y';
                break;    
            case "u":
                handles.letter.value = 'u';
                break;    
            case "i":
                handles.letter.value = 'i';
                break;    
            case "o":
                handles.letter.value = 'o';
                break;    
            case "p":
                handles.letter.value = 'p';
                break;
            // second row
            case "a":
                handles.letter.value = 'a';
                break;    
            case "s":
                handles.letter.value = 's';
                break;    
            case "d":
                handles.letter.value = 'd';
                break;    
            case "f":
                handles.letter.value = 'f';
                break;    
            case "g":
                handles.letter.value = 'g';
                break;    
            case "h":
                handles.letter.value = 'h';
                break;    
            case "j":
                handles.letter.value = 'j';
                break;    
            case "k":
                handles.letter.value = 'k';
                break;    
            case "l":
                handles.letter.value = 'l';
                break;
            // third row
            case "z":
                handles.letter.value = 'z';
                break;
            case "x":
                handles.letter.value = 'x';
                break;
            case "c":
                handles.letter.value = 'c';
                break;
            case "v":
                handles.letter.value = 'v';
                break;
            case "b":
                handles.letter.value = 'b';
                break;
            case "n":
                handles.letter.value = 'n';
                break;
            case "m":
                handles.letter.value = 'm';
                break;
        }
    }
}

// get the score from server and display here
async function displayScore() {
    const response = await fetch('score');
    if(response.ok) {
        let sCount = await response.json();
        scoreWins = sCount.wins;
        scoreLosses = sCount.losses;
    } else {
        scoreWins = ['*Could not load wins/losses :-(*'];
    }
    handles.scoreCount.textContent = `Wins: ${scoreWins}\nLosses: ${scoreLosses}`;
}

// get the life count from server and display here
async function setLife() {
    const response = await fetch('lifeCount');
    if (response.ok) {
        let lCount = await response.json();
        lives = lCount.lives;
    } else {
        lives = [' *Could not load lives* '];
    }
    handles.lifeCount.textContent = `Lives: ${lives}`;
}

function addEventListeners() {
    handles.checkButton.addEventListener('click', validateInput);
    window.addEventListener('keydown', checkKeys);
    window.addEventListener('mouseup', whatClicked);
}

function prepareHandle() {
    handles = prepareHandles();
}

function pageLoaded() {
    prepareHandle();
    addEventListeners();
    setLife();
    getRandomCategory();
    getRandomWord();
    displayScore();
    drawBackground();
}

window.addEventListener('load', pageLoaded);