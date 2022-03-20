import { specialCharacters } from './specialCharacters.mjs';
import { postStat } from './postStat.mjs';
import { removeClass } from './removePromptClass.mjs';
import { prepareHandles } from './prepareHandles.mjs';

let sWins;
let sLosses;

export function promptStat(gameSection, wins, losses) {
  sWins = wins;
  sLosses = losses;

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

function validateInput() {
  const name = document.querySelector('#nameInput');

  /*
  for (let i = 0; i < name.length; i += 1) {
    if (name.value[i] === character) {
  }
  */

  // loop through characters to identify restricted one
  for (const character of specialCharacters) {
    if (name.value.includes(character)) {
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
