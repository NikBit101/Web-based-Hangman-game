import { letterCheck } from './index.mjs';
import { prepareHandles } from './prepareHandles.mjs';

// what button was clicked by the mouse
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
