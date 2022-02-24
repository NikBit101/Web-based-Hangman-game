import { prepareHandles } from "./prepareHandles.mjs";

const handles = prepareHandles();

export function enableButton() {
    handles.checkButton.disabled = false;
}