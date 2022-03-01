import { prepareHandles } from "./prepareHandles.mjs";

const handles = prepareHandles();

export function enableButton() {
    handles.checkButton.disabled = false;
}

export function enableKeyButtons() {
    for(let i = 0; i < handles.letterKey.length; i+=1) {
        const button = handles.letterKey[i];
        button.disabled = false;
    }
}