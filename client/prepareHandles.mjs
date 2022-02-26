const preparedHandles = {};

export function prepareHandles() {
    preparedHandles.gameSection = document.querySelector('#game');
    preparedHandles.word = document.querySelector('#hiddenWord');
    preparedHandles.letter = document.querySelector('#inputBox');
    preparedHandles.checkButton = document.querySelector('#checkButton');
    preparedHandles.canvas = document.querySelector('canvas');
    preparedHandles.category = document.querySelector('#category');
    preparedHandles.warningMsg = document.querySelector('#warningMsg');
    preparedHandles.errorMsg = document.querySelector('#errorMsg');
    preparedHandles.lifeCount = document.querySelector('#lifeCount');
    preparedHandles.usedLetters = document.querySelector('#usedLetters');
    preparedHandles.scoreCount = document.querySelector('#scoreCount');
    preparedHandles.letterButton = document.querySelectorAll('.letterButton');

    return preparedHandles;
}