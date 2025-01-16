'use strict';

// A 'use strict' keyword is here to make sure JavaScript code is executed through "strict mode"
// Strict mode makes it easier to write "secure" JavaScript by eliminating some of the silent errors that are possible in normal JavaScript.
// That way, it becomes easier to code by avoiding creating vulnerabilities and maintaining the code better

// import modules from external files that this code will use
import { selectRandomCategory, selectRandomWord } from './selectRandomCatWords.mjs';
import { checkPlayers, addPlayerWithScore } from './PlayerList.mjs';
import { prepareCategories } from './prepareCategories.mjs';
import { scoreCount } from './scoreCount.mjs';

// 'express' package is here for running the simple JavaScript server
import express from 'express';
import crypto from 'crypto';

/**
 * create a simple server using 'express.json'
 * assign 'client' folder so that it is used as main client
 */
const app = express();
app.use(express.static('client'));
app.use(express.json());


// prepare category list variable on server
const categories = prepareCategories();

// Note: functions below starting with 'get', indicate that
// a client requests specific information from the server based on those functions
// then those functions will return a response towards the client with that required nformation

function getCategory(req, res) {
  const randomCategory = selectRandomCategory(categories);
  res.json(randomCategory);
}

function getWord(req, res) {
  const category = req.params.name;
  const randomWord = selectRandomWord(category, categories);
  res.json(randomWord);
}

function getGuesses(req, res) {
  res.json(scoreCount.guesses);
}

function getScore(req, res) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.json(scoreCount);
}

function sendScore(req, res) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  // get the client score, update the score count list with it
  const payloadWins = req.body.wins;
  const payloadLosses = req.body.losses;
  scoreCount.wins = payloadWins;
  scoreCount.losses = payloadLosses;
  // send back the information about the new score to the request
  const hash = crypto.createHash('sha1').update(JSON.stringify(scoreCount)).digest('hex');
  res.setHeader('ETag', hash);
  res.json(scoreCount);
}

// add player to server list
function addPlayer(req, res) {
  const payloadName = req.body.name;
  const isNewPlayer = checkPlayers(payloadName);
  if (isNewPlayer) {
    // if player's name doesn't exist in current list, add it
    addPlayerWithScore(payloadName, scoreCount.wins, scoreCount.losses);
    // unique hash for score count
    const hash = crypto.createHash('sha1').update(JSON.stringify(scoreCount)).digest('hex');
    res.setHeader('ETag', hash);
    res.json(true);
  } else {
    // if the name already exists, warn player about it
    console.log(`The name '${payloadName}' already exists!!!`);
    res.json(false);
  }
}

// get information from the server
app.get('/category', getCategory);
app.get('/category/:name', getWord);
app.get('/guessCount', function(req, res) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  getGuesses(req, res);
});
app.get('/getScore', getScore);

// send information to the server
app.post('/sendScore', express.json(), function(req, res) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  sendScore(req, res);
});
app.post('/playerName', express.json(), addPlayer);

// the server listens to port 8080 for incoming connections from clients
app.listen(8080);
