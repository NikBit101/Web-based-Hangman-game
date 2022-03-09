import { specialCharacters } from './specialCharacters.mjs';

export function promptName(gameSection) {
  checkEvent();
  createNamePrompt(gameSection);
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

  console.log(newClass);
}

function validateInput() {
  const name = document.querySelector('#nameInput');
  console.log(name.value);

  // loop through characters to identify unwanted one
  for (const character of specialCharacters) {
    if (name.value.includes(character)) {
      console.log(`Character '${character} is not allowed in your name.\n You entered: ${name.textContent}'`);
    } else {
      console.log('reached here');
    }
  }
}

function checkEvent() {
  document.querySelector('#btnSubmit').addEventListener('click', validateInput);
}
