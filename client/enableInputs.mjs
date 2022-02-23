import { prepareHandles } from "./prepareHandles.mjs";

const handles = prepareHandles();

export function enableTextInput() {
    handles.letter.disabled = false;
}

export function enableButton() {
    handles.checkButton.disabled = false;
}