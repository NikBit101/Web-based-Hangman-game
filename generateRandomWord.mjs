"use strict"

import { generateRandomNumber } from "./client/generateRandomNumber.mjs";

// this is where a random category with a word is fetched from the server,
// stored here
export function generateRandomCategory(randomCategoryObject) {
    console.log(randomCategoryObject);

    // generate random indexes, one for 'categoryList', another for 'randomWord'
    const categoryList = Object.values(randomCategoryObject); 
    const randomCategoryIndex = generateRandomNumber(categoryList);
    //const rCategory = categoryList[randomCategoryIndex];
    
    const category = Object.keys(randomCategoryObject)[randomCategoryIndex];
    return category;
    /*
    const rWord = generateRandomNumber(rCategory);

    // assign category and word to return their values
    const word = rCategory[rWord];
    randomCategory = category.toString();
    randomWord = word;
    hiddenWord = hideWord(randomWord)   
    
    // display outputs taken from server
    displayHiddenWord(hiddenWord);*/
}

export function generateRandomWord(randomCat) {
    console.log(randomCat);
}