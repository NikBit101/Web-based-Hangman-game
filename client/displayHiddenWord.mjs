import { prepareHandles } from "./prepareHandles.mjs";

// display the underscores that match the word
// '_ _ _ _'
export function displayHiddenWord(hiddenWord) {
    let handles = prepareHandles();
    handles.word.textContent = '';
    handles.word.textContent = `Word: ${hiddenWord.join(' ')}`;
}
