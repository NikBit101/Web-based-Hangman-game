"use strict"

import { prepareHandles } from './prepareHandles.mjs';
import { generateRandomNumber } from './generateRandomNumber.mjs';
import { hideWord } from './hideWord.mjs';
import { drawBackground, clearCanvas } from './drawCanvas.mjs';
import { lifeCount } from './lifeCount.mjs';
import { displayHiddenWord } from './displayHiddenWord.mjs';
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

function displayCategory(category) {
    handles.category.textContent = `Category: ${category}`;
}

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
        displayHiddenWord(hiddenWord);
    } else {
        handles.errorMsg.textContent = `Word failed to load`;
    }
}

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

function displayMessage(condition, rWord) {
    handles.warningMsg.textContent = condition === true ? 'You win!' : `The word was '${rWord.toUpperCase()}'`;
    if (condition) {
        handles.warningMsg.style.color = 'Lime';
    } else {
        handles.warningMsg.style.color = 'Red';
    }
}

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

function createPrompt() {
    // create HTML tags
    const restartPrompt = document.createElement('p');
    restartPrompt.setAttribute('id', 'restartPrompt');
    return restartPrompt;
}

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

// The function that does ...
// It accepts ... as lCount (which is an int or number)
// it returns or does ...
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

function validateInput() {
    const letter = handles.letter.value;

    if(letter === '' || letter === ' ' || Number.isInteger(Number(letter))) {
        handles.warningMsg.textContent = `Please input a letter into field`;
        return;
    }

    handles.warningMsg.textContent = '';
    letterCheck();
}

function checkKeys(e) {
    switch(e.key) {
        case "Enter":
            if(lives > 0) { 
                validateInput();
            }
            break;
    }
}

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

function prepareHandle() {
    handles = prepareHandles();
}

function pageLoaded() {
    prepareHandle();
    addEventListeners();
    generateRandomWord();
    setLife();
    displayScore();
    drawBackground();
}

window.addEventListener('load', pageLoaded);