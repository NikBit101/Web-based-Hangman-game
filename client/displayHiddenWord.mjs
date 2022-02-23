import { prepareHandles } from "./prepareHandles.mjs";

export function displayHiddenWord(hiddenWord) {
    let handles = prepareHandles();
    handles.word.textContent = '';
    handles.word.textContent = `Word: ${hiddenWord.join(' ')}`;
}
