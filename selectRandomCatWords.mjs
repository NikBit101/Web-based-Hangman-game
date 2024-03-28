'use strict';

// generate a random number based on the parameter that is passed through the function
function generateRandomNumber(fromThis) {
  const rNum = Math.floor(Math.random() * fromThis);
  return rNum;
}

// this is where a random category with a word is fetched from the server
export function selectRandomCategory(randomCategoryObject) {
  // generate random index for 'categoryList'
  const categoryList = Object.keys(randomCategoryObject);
  // generate random index for 'randomCategoryIndex'
  const randomCategoryIndex = generateRandomNumber(categoryList.length);
  // get random category with random index
  const category = categoryList[randomCategoryIndex];

  return category;
}

// same as above function, but this time for random word in specific category
export function selectRandomWord(category, catList) {
  // list all words based on that random category
  const wordList = Object.values(catList[category]);
  // generate random index for 'randomWordIndex'
  const randomWordIndex = generateRandomNumber(wordList.length);
  // get random word with random index
  const randomWord = catList[category][randomWordIndex];

  return randomWord;
}
