"use strict"

import { selectRandomCategory, selectRandomWord } from './selectRandomCatWords.mjs';
import { prepareCategories } from './prepareCategories.mjs';
import { scoreCount } from './scoreCount.mjs';
import express from 'express';

const app = express();
app.use(express.static('client'));

// prepare categories variable on server
const categories = prepareCategories();

function getCategory(req, res) {
    const randomCategory = selectRandomCategory(categories);
    console.log(` - [SERVER] Random category: ${randomCategory}`);
    res.json(randomCategory);
}

function getWord(req, res) {
    const category = req.params.name;
    console.log(` - [SERVER] Fetched category TO server: ${category}`);
    const randomWord = selectRandomWord(category, categories);
    console.log(` - [SERVER] Fetched word FROM server: ${randomWord}\n___`);
    res.json(randomWord);
}

function getGuesses(req, res) {
    console.log(`___\n - [SERVER] Guess count: ${scoreCount.guesses}`);
    res.json(scoreCount);
}

function getScore(req, res) {
    console.log(` - [SERVER] Wins: ${scoreCount.wins}, Losses: ${scoreCount.losses}`);
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
app.get('/category', getCategory);
app.get('/category/:name', getWord);
app.get('/guessCount', getGuesses);
app.get('/score', getScore);

// send information to the server
app.post('/score', express.json(), sendScore);

app.listen(8080);