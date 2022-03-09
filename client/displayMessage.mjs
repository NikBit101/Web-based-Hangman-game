'use strict';

import { prepareHandles } from './prepareHandles.mjs';

// display a condition message
export function displayMessage(condition, rWord) {
  const handles = prepareHandles();
  handles.warningMsg.textContent = condition === true ? 'You win! +1 point' : `The word was '${rWord.toUpperCase()}'`;
  if (condition) {
    handles.warningMsg.style.color = 'Lime';
  } else {
    handles.warningMsg.style.color = 'White';
  }
}
