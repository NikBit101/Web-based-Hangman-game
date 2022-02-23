import { prepareHandles } from "./prepareHandles.mjs";

const handles = prepareHandles();

export function disableTextInput() {
    handles.letter.disabled = true;
}

export function disableButton() {
    handles.checkButton.disabled = true;
}