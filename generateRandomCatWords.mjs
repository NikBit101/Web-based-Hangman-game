"use strict"

import { generateRandomNumber } from "./generateRandomNumber.mjs";

// this is where a random category with a word is fetched from the server,
// stored here
export function generateRandomCategory(randomCategoryObject) {
    // generate random index for 'categoryList'
    const categoryList = Object.values(randomCategoryObject);
    const randomCategoryIndex = generateRandomNumber(categoryList);
    const category = Object.keys(randomCategoryObject)[randomCategoryIndex];
    
    return category;
}

export function generateRandomWord(categories, randomCat) {
    // list all words based on that random category
    const categoryValues = Object.values(categories[randomCat]);
    console.log(` - [MODULE] [LINE 31] ${categoryValues}`);
    // generate random index for 'randomWordIndex'
    const randomWordIndex = generateRandomNumber(categoryValues);
    console.log(` - [MODULE] [LINE 33] ${randomWordIndex}`);
    // get random word
    const randomWord = categories[randomCat][randomWordIndex];
    console.log(` - [MODULE] [LINE 35] ${randomWord}`);
    
    return randomWord;
}