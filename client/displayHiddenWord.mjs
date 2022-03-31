'use strict';

import { prepareHandles } from './prepareHandles.mjs';

export const usedLetters = [];

// display the underscores that match the word
// '_ _ _ _'
export function displayHiddenWord(hiddenWord) {
  const handles = prepareHandles();
  handles.word.textContent = '';
  handles.word.textContent = `${hiddenWord.join(' ')}`;
}

// hide the word for client
export function hideWord(who) {
  const hiddenWord = [];
  for (let i = 0; i < who.length; i += 1) {
    hiddenWord[i] = who[i].replace(who[i], '_');
  }
  return hiddenWord;
}
