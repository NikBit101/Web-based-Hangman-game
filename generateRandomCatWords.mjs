"use strict"

import { generateRandomNumber } from "./generateRandomNumber.mjs";

// this is where a random category with a word is fetched from the server,
// stored here
export function generateRandomCategory(randomCategoryObject) {
    
    // generate random index for 'categoryList'
    const categoryList = Object.values(randomCategoryObject);
    const randomCategoryIndex = generateRandomNumber(categoryList);
    //const rCategory = categoryList[randomCategoryIndex];
    
    const category = Object.keys(randomCategoryObject)[randomCategoryIndex];
    return category;
    /*
    
    // assign category and word to return their values
    const word = rCategory[rWord];
    randomCategory = category.toString();
    randomWord = word;
    hiddenWord = hideWord(randomWord)   
    
    // display outputs taken from server
    displayHiddenWord(hiddenWord);*/
}

export function generateRandomWord(categories, randomCat) {
    // generate random index for 'categoryList'
    const categoryValues = Object.values(categories[randomCat]);
    console.log(` - [MODULE] [LINE 31] ${categoryValues}`);
    const randomWordIndex = generateRandomNumber(categoryValues);
    console.log(` - [MODULE] [LINE 33] ${randomWordIndex}`);
    const randomWord = categories[randomCat][randomWordIndex];
    console.log(` - [MODULE] [LINE 35] ${randomWord}`);
    return randomWord
}