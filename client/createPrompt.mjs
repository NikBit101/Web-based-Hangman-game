'use strict';

import { prepareHandles } from './prepareHandles.mjs';
import { clearCanvas, drawBackground } from './drawCanvas.mjs';
import { usedLetters } from './displayHiddenWord.mjs';
import { promptStat } from './statAssignment.mjs';
import * as keyButtons from './keyButtons.mjs';
import * as index from './index.mjs';

function launchIndex() {
  clearCanvas();
  drawBackground();
  index.getRandomCategory();
  index.setGuessCount();
  index.displayScore();
}

function clearContents(handles) {
  handles.letter.value = '';
  handles.warningMsg.textContent = '';
  handles.usedLetters.textContent = 'Used Letters: ';
  handles.warningMsg.style.color = 'white';
}

function resetVariables(hWord, lFound, con) {
  hWord = '';
  if (lFound) {
    lFound = false;
  }
  if (con) {
    con = false;
  }
}

// remove prompt class
export function removeClass(handles, theClass) {
  handles.gameSection.removeChild(theClass);
}

// when the page is restarted, all the required variables will be reset,
// canvas will be redrawn.
function restartPage(theClass, prompting, randomWord) {
  const handles = prepareHandles();
  // eslint-disable-next-line no-unused-vars
  randomWord = [];
  console.log(`Before setting length: ${usedLetters}`);
  usedLetters.length = 0;
  console.log(`After setting length: ${usedLetters}`);
  keyButtons.enableKeyButtons();
  resetVariables();
  clearContents(handles);

  if (prompting) {
    removeClass(handles, theClass);
    prompting = false;
  }

  launchIndex();
}

// the 'Play Again?' dialog will be created here
export function createPrompt() {
  // create HTML tag
  const restartPrompt = document.createElement('p');
  restartPrompt.setAttribute('id', 'restartPrompt');
  return restartPrompt;
}

// create restart prompt box here
export function restartPrompt(rWord, hWord, lFound, c) {
  const handles = prepareHandles();
  const gameSec = handles.gameSection;

  // prompt user with restart
  const prompting = true;
  // text
  const newText = document.createTextNode('Play Again?');
  const rPrompt = createPrompt();
  rPrompt.append(newText);
  // class
  const newClass = document.createElement('class');
  newClass.className = 'restartPrompt';
  newClass.append(rPrompt);

  // buttons yes/no
  const btnYes = document.createElement('button');
  btnYes.setAttribute('id', 'btnYes');
  btnYes.setAttribute('class', 'promptButtons');
  const btnNo = document.createElement('button');
  btnNo.setAttribute('id', 'btnNo');
  btnNo.setAttribute('class', 'promptButtons');
  btnYes.textContent = 'Yes';
  btnNo.textContent = 'No';

  // add new class to a game section
  // place the prompt into the class
  newClass.append(btnYes);
  newClass.append(btnNo);
  gameSec.append(newClass);

  // restart whole page
  document.querySelector('#btnYes').addEventListener('click', function () {
    resetVariables(hWord, lFound, c);
    restartPage(newClass, prompting, rWord);
  });

  // stop playing through a button 'No'
  /**
     * firstly, assign the user stats
     * name is prompted by user,
     * then pass the stat to the server.
     */
  document.querySelector('#btnNo').addEventListener('click', function () {
    removeClass(handles, newClass);
    promptStat(gameSec);
  });
}
