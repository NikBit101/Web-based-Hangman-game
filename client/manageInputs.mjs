import { prepareHandles } from './prepareHandles.mjs';
import { letterCheck } from './index.mjs';

const handles = prepareHandles();

// this function will disable keyboard buttons on screen
export function disableKeyButtons() {
  for (let i = 0; i < handles.letterKey.length; i += 1) {
    const button = handles.letterKey[i];
    button.disabled = true;
  }
}

// this function will enable keyboard buttons on screen
export function enableKeyButtons() {
  for (let i = 0; i < handles.letterKey.length; i += 1) {
    const button = handles.letterKey[i];
    button.disabled = false;
  }
}

// this function will monitor what button was clicked by the mouse
export function whatClicked(e) {
  const handles = prepareHandles();

  for (let i = 0; i < handles.letterKey.length; i += 1) {
    const button = handles.letterKey[i];
    // the button shown on UI was pressed
    if (e.target === button) {
      handles.letter.value = button.textContent;
      letterCheck(button.textContent);
      return;
    }
  }
}
