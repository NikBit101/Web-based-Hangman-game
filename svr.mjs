"use strict"

import { prepareWord } from './prepareWord.mjs';
import { scoreCount } from './scoreCount.mjs';
import express from 'express';

const app = express();
app.use(express.static('client'));

// prepare a random word based on categories
// store it on a server here
const categories = prepareWord();

// store score count

function getCategory(req, res) {
    console.log(`Random category: ${categories}`);
    res.json(categories);
}

function getLives(req, res) {
    console.log(`Life count: ${scoreCount.lives}`);
    res.json(scoreCount);
}

function getScore(req, res) {
    console.log(`Wins: ${scoreCount.wins}\nLosses: ${scoreCount.losses}`);
    res.json(scoreCount);
}

function sendScore(req, res) {
    const payloadPOST = req.body.score;
    console.log(`Sent score: ${payloadPOST}`);
    scoreCount.score = payloadPOST;
    // send back the information about the new score to the request
    res.json(scoreCount);
}

// get information from the server
app.get('/categories', getCategory);
app.get('/lifeCount', getLives);
app.get('/score', getScore);

// send information to the server
app.post('/score', express.json(), sendScore);

app.listen(8080);