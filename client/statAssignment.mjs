import { prepareHandles } from './prepareHandles.mjs';
import { removeClass } from './createPrompt.mjs';
import * as keyButtons from './keyButtons.mjs';

const specialCharacters = [' ', '#', '!', '"', '£', '$', '%', '^', '&', '*', '(', ')', '_', '-', '=', '+', '`', '?', '/', '.', '>', ',', '<', '|', '¬'];
let sWins;
let sLosses;

// get the score from server and display here
async function getScore() {
  const handles = prepareHandles();
  const response = await fetch('score');
  if (response.ok) {
    const sCount = await response.json();
    sWins = sCount.wins;
    sLosses = sCount.losses;
  } else {
    keyButtons.disableKeyButtons();
    sWins = ['N/A'];
    sLosses = ['N/A'];
    handles.errorMsg.textContent = 'Score failed to load';
    throw new Error(`[${response.status}] connection failed;\n- Score failed to load`);
  }
  handles.scoreCount.textContent = `Wins: ${sWins}\nLosses: ${sLosses}`;
}

export function promptStat(gameSection) {
  getScore();
  createNamePrompt(gameSection);
  checkEvent();
}

function createNamePrompt(gameSection) {
  // create prompt
  const prompt = document.createElement('p');
  prompt.setAttribute('id', 'namePrompt');
  // create text
  const newText = document.createTextNode('ENTER YOUR NAME:');
  prompt.append(newText);
  // assign class
  const newClass = document.createElement('class');
  newClass.className = 'namePrompt';
  newClass.append(prompt);

  // create input field for a name
  const txtInput = document.createElement('input');
  txtInput.setAttribute('id', 'nameInput');
  newClass.append(txtInput);

  // buttons 'submit'
  const btnSubmit = document.createElement('button');
  btnSubmit.setAttribute('id', 'btnSubmit');
  btnSubmit.textContent = 'Submit';
  newClass.append(btnSubmit);

  gameSection.append(newClass);
}

// send to server the name of the player
async function postStat(who, winCount, lossCount) {
  const payload = { name: who, wins: winCount, losses: lossCount };
  const response = await fetch('newPlayerStat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`[${response.status}] connection failed;\n- Failed to post new player stats.`);
  }
}


function validateInput() {
  const name = document.querySelector('#nameInput');

  /*
  for (let i = 0; i < name.length; i += 1) {
    if (name.value[i] === character) {
  }
  */

  // loop through characters to identify restricted one
  for (const character of specialCharacters) {
    if (name.value.includes(character) || name.value === ' ' || name.value === '') {
      console.log(`Character '${character}' is not allowed in your name.\n You entered: '${name.value}'`);
      return;
    }
  } // if no restricted characters found in name, continue
  const handles = prepareHandles();
  const nameClass = document.querySelector('.namePrompt');
  removeClass(handles, nameClass);
  postStat(name.value, sWins, sLosses);
}

function checkEvent() {
  document.querySelector('#btnSubmit').addEventListener('click', validateInput);
}
