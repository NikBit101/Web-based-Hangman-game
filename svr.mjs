"use strict"

import { prepareCategory } from './prepareCategory.mjs';
import { scoreCount } from './scoreCount.mjs';
import { generateRandomCategory, generateRandomWord } from './generateRandomCatWords.mjs';
import express from 'express';

const app = express();
app.use(express.static('client'));

// prepare a random word based on categories
// store it on a server here
const categories = prepareCategory();
let randomCategory;

function getCategory(req, res) {
    randomCategory = generateRandomCategory(categories);
    console.log(` - [SERVER] Random category: ${randomCategory}`);
    res.json(randomCategory);
}

function getWord(req, res) {
    const randomWord = generateRandomWord(categories, randomCategory);
    console.log(` - [SERVER] Random word: ${randomWord}`);
    res.json(randomWord);
}

function getLives(req, res) {
    console.log(`___\n - [SERVER] Life count: ${scoreCount.lives}`);
    res.json(scoreCount);
}

function getScore(req, res) {
    console.log(` - [SERVER] Wins: ${scoreCount.wins}\nLosses: ${scoreCount.losses}\n___`);
    res.json(scoreCount);
}

function sendScore(req, res) {
    const payloadPOSTWins = req.body.wins;
    const payloadPOSTLosses = req.body.losses;
    console.log(`Sent score: ${payloadPOSTWins}, ${payloadPOSTLosses}`);
    scoreCount.wins = payloadPOSTWins;
    scoreCount.losses = payloadPOSTLosses;
    // send back the information about the new score to the request
    res.json(scoreCount);
}

// get information from the server
app.get('/categories', getCategory);
app.get('/word', getWord);
app.get('/lifeCount', getLives);
app.get('/score', getScore);

// send information to the server
app.post('/score', express.json(), sendScore);

app.listen(8080);