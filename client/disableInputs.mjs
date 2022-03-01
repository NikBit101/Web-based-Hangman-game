import { prepareHandles } from "./prepareHandles.mjs";

const handles = prepareHandles();

export function disableButton() {
    handles.checkButton.disabled = true;
}

export function disableKeyButtons() {
    for(let i = 0; i < handles.letterKey.length; i+=1) {
        const button = handles.letterKey[i];
        button.disabled = true;
    }
}