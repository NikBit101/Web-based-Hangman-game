"use strict"

import { prepareHandles } from './prepareHandles.mjs';
import { generateRandomNumber } from './generateRandomNumber.mjs';
import { hideWord } from './hideWord.mjs';
import { drawBackground, clearCanvas } from './drawCanvas.mjs';
import { lifeCount } from './lifeCount.mjs';
import * as disable from './disableInputs.mjs';
import * as enable from './enableInputs.mjs';

let handles = {};
let randomCategory;
let randomWord = [];
let usedLetters = [];
let hiddenWord;
let letterFound;
let condition;
let lives;
let score;

// display random hidden word "_ _ _" to element
function displayHiddenWord() {
    handles.word.textContent = '';
    handles.word.textContent = `Word: ${hiddenWord.join(' ')}`;
}

// display random category to element
function displayCategory(category) {
    handles.category.textContent = `Category: ${category}`;
}

// get random category from the server,
// get random word from that category,
// display them.
async function generateRandomWord() {
    const response = await fetch('categories');
    if (response.ok) {
        const categoryResponse = await response.json();
        
        // generate random indexes, one for 'categoryList', another for 'randomWord'
        const categoryList = Object.values(categoryResponse); 
        const randomCategoryIndex = generateRandomNumber(categoryList);
        const rCategory = categoryList[randomCategoryIndex];
        const rWord = generateRandomNumber(rCategory);

        // assign category and word to return their values
        const category = Object.keys(categoryResponse)[randomCategoryIndex];
        const word = rCategory[rWord];
        randomCategory = category.toString();
        randomWord = word;
        hiddenWord = hideWord(randomWord);

        // display outputs taken from server
        displayCategory(randomCategory);
        displayHiddenWord(randomWord);
    } else {
        handles.errorMsg.textContent = `Word failed to load`;
    }
}

// update the score on the server and display it
async function setScore(scr) {
    const payload = { score: scr };
    const response = await fetch('score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if(response.ok) {
        let scoreCount = await response.json();
        handles.score.textContent = `Score: ${scoreCount.score}`;
    } else {
        score = ['*Could not load new score :-(*'];
    }
}

// display a 'you won/lost' message
function displayMessage(condition, rWord) {
    handles.warningMsg.textContent = condition === true ? 'You win!' : `The word was '${rWord.toUpperCase()}'`;
    if (condition) {
        handles.warningMsg.style.color = 'Lime';
    } else {
        handles.warningMsg.style.color = 'Red';
    }
}

// restart necessary elements on the page
function restartPage(theClass, prompting) {
    randomCategory;
    randomWord = [];
    usedLetters = [];
    hiddenWord = '';
    letterFound = false;
    condition = false;
    handles.warningMsg.textContent = '';
    handles.warningMsg.style.color = 'Red';

    enable.enableTextInput();
    enable.enableButton();
    enable.enable
    
    if (prompting) {
        handles.gameSection.removeChild(theClass);
        prompting = false;
    }

    clearCanvas();
    drawBackground();
    generateRandomWord();
    setLife();
    displayScore();
}

// create a prompt message
function createPrompt() {
    // create HTML tags
    const restartPrompt = document.createElement('p');
    restartPrompt.setAttribute('id', 'restartPrompt');
    return restartPrompt;
}

// prompt the user with restart 'Play Again?' with Buttons 'Yes/No'
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

// stop the game if winning condition is true OR if user ran out of lives
function gameStop(condition) {
    if (condition) {
        disable.disableTextInput();
        disable.disableButton();
        displayMessage(condition, randomWord);
        score +=1;
        setScore(score);
        restartPrompt();
    } else {
        disable.disableTextInput();
        disable.disableButton();
        displayMessage(condition, randomWord);
        score -=1;
        setScore(score);
        restartPrompt();
    }
}

// monitor player lives
function monitorLife(lCount) {
    lifeCount(lCount);
    if(lCount === 0) {
        condition = false;
        gameStop(condition);
    } else if (hiddenWord.join('') === randomWord && lCount > 0){
        condition = true;
        gameStop(condition);
    }
    handles.score.textContent = `Score: ${score}`;
}

// check player's letter input
// go through 'used letters' array
// go through random word's letters
function letterCheck() {
    const letter = handles.letter.value.toLowerCase();
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
    handles.letter.value = '';
    handles.lifeCount.textContent = `Lives: ${lives}`;
    usedLetterstxt.textContent = `Used letters: ${usedLetters}`;
}

// validate player input for error avoidance
function validateInput() {
    const letter = handles.letter.value;

    if(letter === '' || letter === ' ' || Number.isInteger(Number(letter))) {
        handles.warningMsg.textContent = `Please input a letter into field`;
        return;
    }

    handles.warningMsg.textContent = '';
    letterCheck();
}

// monitor keys that were pressed on keyboard
function checkKeys(e) {
    switch(e.key) {
        case "Enter":
            if(lives > 0) { 
                validateInput();
            }
            break;
    }
}

// get score from the server and display it on the page
async function displayScore() {
    const response = await fetch('score');
    if(response.ok) {
        let sCount = await response.json();
        score = sCount.score;
    } else {
        score = ['*Could not load the score :-(*'];
    }
    handles.score.textContent = `Score: ${score}`;
}

// get life count from the server and display it here
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
}

// set elements handle for js
function prepareHandle() {
    handles = prepareHandles();
}

// once the page loaded, run the functions
function pageLoaded() {
    prepareHandle();
    addEventListeners();
    generateRandomWord();
    setLife();
    displayScore();
    drawBackground();
}

window.addEventListener('load', pageLoaded);