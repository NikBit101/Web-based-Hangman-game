'use strict';

import { prepareHandles } from './prepareHandles.mjs';

// display the underscores that match the word
// '_ _ _ _'
export function displayHiddenWord(hiddenWord) {
  const handles = prepareHandles();
  handles.word.textContent = '';
  handles.word.textContent = `${hiddenWord.join(' ')}`;
}
