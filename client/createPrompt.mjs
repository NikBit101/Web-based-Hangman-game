// the 'Play Again?' dialog will be created here
export function createRestartPrompt() {
  // create HTML tags
  const restartPrompt = document.createElement('p');
  restartPrompt.setAttribute('id', 'restartPrompt');
  return restartPrompt;
}

// prompt with user's name will be created here
export function createNamePrompt(section) {
  // text
  const newName = document.createTextNode('Enter your name:');
  const paragraph = document.createElement('p');
  paragraph.setAttribute('id', 'txtPrompt');
  paragraph.append(newName);

  // input box
  const nameInput = document.createElement('input');
  nameInput.setAttribute('id', 'nameInput');

  // button 'ok'
  const txt = document.createTextNode('OK');
  const btnOk = document.createElement('button');
  btnOk.setAttribute('id', 'btnSend');
  btnOk.append(txt);

  // a class where all 3 elements will go into
  const namePromptClass = document.createElement('class');
  namePromptClass.className = 'nameClass';
  namePromptClass.append(paragraph);
  namePromptClass.append(nameInput);
  namePromptClass.append(btnOk);
  section.append(namePromptClass);
  return namePromptClass;
}
