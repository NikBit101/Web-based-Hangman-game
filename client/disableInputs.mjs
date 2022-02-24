import { prepareHandles } from "./prepareHandles.mjs";

const handles = prepareHandles();

export function disableButton() {
    handles.checkButton.disabled = true;
}