'use strict';

import { displayHiddenWord, hideWord, usedLetters } from './displayHiddenWord.mjs';
import { displayCategory } from './displayCategory.mjs';
import { drawBackground } from './drawCanvas.mjs';
import { displayMessage } from './displayMessage.mjs';
import { prepareHandles } from './prepareHandles.mjs';
import { restartPrompt } from './createPrompt.mjs';
import { whatClicked } from './mouseClickCheck.mjs';
import { guessCount } from './guessCount.mjs';
import * as keyButtons from './keyButtons.mjs';

let randomWord = [];
let handles = {};
let hiddenWord;
let letterFound;
let condition;
let guesses;
let scoreWins;
let scoreLosses;

async function getRandomWord(randomCat) {
  const response = await fetch('category/' + randomCat);
  if (response.ok) {
    const fetchedWord = await response.json();
    randomWord = fetchedWord.toLowerCase();
    hiddenWord = hideWord(fetchedWord);
    displayHiddenWord(hiddenWord);
  } else {
    keyButtons.disableKeyButtons();
    handles.errorMsg.textContent = 'Word failed to load';
    throw new Error(`[${response.status}] connection failed;\n- Word failed to load`);
  }
}

export async function getRandomCategory() {
  const response = await fetch('category');
  if (response.ok) {
    const fetchedCategory = await response.json();
    // display category output taken from server
    handles.category.value = fetchedCategory;
    displayCategory(fetchedCategory);

    // request a random word in that category from server
    getRandomWord(fetchedCategory);
  } else {
    keyButtons.disableKeyButtons();
    handles.errorMsg.textContent = 'Category failed to load';
    throw new Error(`[${response.status}] connection failed;\n- category failed to load`);
  }
}

// send to server the current score, thereby updating it
async function setScore(scrW, scrL) {
  const payload = { wins: scrW, losses: scrL };
  console.log(payload);
  const response = await fetch('sendScore', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const scoreCount = await response.json();
    scoreCount.wins = scrW;
    scoreCount.losses = scrL;
    handles.scoreCount.textContent = `Wins: ${scoreCount.wins}\nLosses: ${scoreCount.losses}`;
  } else {
    handles.scoreCount.textContent = ['*Could not load new score :-(*'];
    throw new Error(`[${response.status}] connection failed;\n- Word failed to load`);
  }
}

// The function stops the game process,
// disables inputs,
// creates a prompt for user to restart or leave the game.
function gameStop(condition, rWord, sWins, sLosses) {
  keyButtons.disableKeyButtons();

  if (condition) {
    displayMessage(condition, rWord);
    sWins += 1;
  } else {
    displayMessage(condition, rWord);
    sLosses += 1;
  }

  setScore(sWins, sLosses);
  restartPrompt(rWord, hiddenWord, letterFound, condition);
}

// The function will monitor the guess count.
// It accepts 'guess' as 'gCount' (which is an int or number)
// it stops the game and sends true/false condition after checking whether the player won or lost
function monitorGuess(gCount, rWord, scoreW, scoreL, isFound) {
  guessCount(gCount, isFound);

  if (gCount === 0) {
    condition = false;
    gameStop(condition, rWord, scoreW, scoreL);
  } else if (hiddenWord.join('') === randomWord && gCount > 0) {
    condition = true;
    gameStop(condition, rWord, scoreW, scoreL);
  }
  /* else if (randomWord.includes(' ')) {
    // if the word has a whitespace
    randomWord.replace(' ', '');
  } */

  handles.scoreCount.textContent = `Wins: ${scoreW}\nLosses: ${scoreL}`;
}

// The function will check the letter input to compare it with the word's letters
export function letterCheck(who) {
  const letter = who.toLowerCase();
  const usedLetterstxt = handles.usedLetters;
  handles.warningMsg.textContent = '';

  // record certain letter each time the user enters it
  // check letters array based on a user input
  for (let i = 0; i < usedLetters.length; i++) {
    // letter already exists
    if (usedLetters[i].includes(letter)) {
      handles.warningMsg.textContent = `The letter '${letter}' was already guessed before`;
      return;
    }
  }

  /**
     * Check if the chosen word has any whitespace
     * if(randomWord.includes(' ')) {
     *
     * }
     */

  // go through word array to find the letter in that word
  for (let i = 0; i < randomWord.length; i++) {
    // found a letter
    if (randomWord[i].includes(letter)) {
      hiddenWord[i] = hiddenWord[i].replace(hiddenWord[i], letter);

      displayHiddenWord(hiddenWord);
      letterFound = true;
    } else if (i + 1 === randomWord.length && !letterFound) {
      // letter does not exist in the word
      handles.warningMsg.textContent = `The letter '${letter}' does not exist in the word`;
      guesses -= 1;
    }
  }
  monitorGuess(guesses, randomWord, scoreWins, scoreLosses, letterFound);
  letterFound = false;
  usedLetters.push(letter);
  handles.guessCount.textContent = `Guesses left: ${guesses}`;
  usedLetterstxt.textContent = `Used letters: ${usedLetters}`;
}

// this function may need to be deleted after testing
function validateInput(event) {
  // Letter pressed on keyboard between A to Z
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    const letterKey = event.key;
    handles.letter.value = letterKey.toLowerCase();

    letterCheck(letterKey);
  }
}

// check the keys that were pressed by the user on keyboard
function checkKeys(e) {
  if (guesses > 0 && !condition) {
    switch (e.key) {
      case 'Backspace':
        handles.letter.value = null;
        break;
      default:
        // any other key pressed on a keyboard
        validateInput(e);
        break;
    }
  }
}

// get the score from server and display here
export async function displayScore() {
  const response = await fetch('score');
  if (response.ok) {
    const sCount = await response.json();
    scoreWins = sCount.wins;
    scoreLosses = sCount.losses;
  } else {
    keyButtons.disableKeyButtons();
    scoreWins = ['N/A'];
    scoreLosses = ['N/A'];
    handles.errorMsg.textContent = 'Score failed to load';
    throw new Error(`[${response.status}] connection failed;\n- Score failed to load`);
  }
  handles.scoreCount.textContent = `Wins: ${scoreWins}\nLosses: ${scoreLosses}`;
}

// get the guess count from server and display here
export async function setGuessCount() {
  const response = await fetch('guessCount');
  if (response.ok) {
    const lCount = await response.json();
    guesses = lCount.guesses;
  } else {
    keyButtons.disableKeyButtons();
    guesses = ['N/A'];
    handles.errorMsg.textContent = 'Guess count failed to load';
    throw new Error(`[${response.status}] connection failed;\n- Guess count failed to load`);
  }
  handles.guessCount.textContent = `Guesses left: ${guesses}`;
}

function addEventListeners() {
  window.addEventListener('keydown', checkKeys);
  window.addEventListener('mouseup', whatClicked);
}

function prepareHandle() {
  handles = prepareHandles();
}

function pageLoaded() {
  prepareHandle();
  addEventListeners();
  setGuessCount();
  getRandomCategory();
  displayScore();
  drawBackground();
}

window.addEventListener('load', pageLoaded);
