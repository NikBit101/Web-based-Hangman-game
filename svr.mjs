"use strict"

import { prepareWord } from './prepareWord.mjs';
import { lifeCount } from './setLife.mjs';
import { scoreCount } from './scoreCount.mjs';
import express from 'express';

const app = express();
app.use(express.static('client'));

// prepare a random word based on categories
// store it on a server here
const categories = prepareWord();

// store score count

function getCategory(req, res) {
    res.json(categories);
}

function getLives(req, res) {
    res.json(lifeCount);
}

function getScore(req, res) {
    res.json(scoreCount);
}

function sendScore(req, res) {
    const payloadPOST = req.body.score;
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