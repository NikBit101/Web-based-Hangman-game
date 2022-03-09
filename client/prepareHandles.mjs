const preparedHandles = {};

export function prepareHandles() {
  preparedHandles.gameSection = document.querySelector('#game');
  preparedHandles.word = document.querySelector('#hiddenWord');
  preparedHandles.letter = document.querySelector('#inputBox');
  preparedHandles.canvas = document.querySelector('canvas');
  preparedHandles.category = document.querySelector('#category');
  preparedHandles.warningMsg = document.querySelector('#warningMsg');
  preparedHandles.errorMsg = document.querySelector('#errorMsg');
  preparedHandles.guessCount = document.querySelector('#guessCount');
  preparedHandles.usedLetters = document.querySelector('#usedLetters');
  preparedHandles.scoreCount = document.querySelector('#scoreCount');
  preparedHandles.letterKey = document.querySelectorAll('.key');

  return preparedHandles;
}
