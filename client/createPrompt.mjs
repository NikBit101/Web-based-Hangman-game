'use strict';

// the 'Play Again?' dialog will be created here
export function createPrompt() {
  // create HTML tags
  const restartPrompt = document.createElement('p');
  restartPrompt.setAttribute('id', 'restartPrompt');
  return restartPrompt;
}
