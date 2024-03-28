
// import uuid package for creating a random user ID
import uuid from 'uuid-random';
// import fs package to handle files (read and write)
import fs from 'fs';

// A list in which the player's name and score will be stored in here
// { playerId: 'EXAMPLE-ID', playerName: 'John', wins: 5, losses: 2 }
let listOfPlayers = [];

// load up the file with list of players who played the game on the server
function loadPlayers() {
  const file = 'savedPlayers.json';
  if (!fs.existsSync(file)) {
    // file doesn't exist, create it
    fs.writeFile(file, '[]', (error) => {
      if (error) {
        // bring up an error message if there is something wrong when creating and writing to a file
        console.error(error);
      }
    });
  } else {
    // otherwise, load the list of players as a variable object stored here
    const data = fs.readFileSync(file);
    listOfPlayers = JSON.parse(data);
    console.log(listOfPlayers);
  }
}
loadPlayers();

// this function will store player list on a separate .json file
function storePlayers() {
  // this process.env is here for different hosting purpose
  if (process.env.CANSAVE == "false") {

  } else {  
    const data = JSON.stringify(listOfPlayers);
    fs.writeFileSync('savedPlayers.json', data);
  }
}

// check if player name is same with another player already on stored list
export function checkPlayers(newPlayer) {
  for (let i = 0; i < listOfPlayers.length; i += 1) {
    if (listOfPlayers[i].playerName.toLowerCase() === newPlayer.toLowerCase()) {
      return false;
    }
  }
  return true;
}

// add a new player and their score into the list of scoreboard
export function addPlayerWithScore(player, wins, losses) {
  const newPlayer = {
    playerId: uuid(),
    playerName: player,
    wins,
    losses,
  };

  listOfPlayers = [newPlayer, ...listOfPlayers.slice(0, 9)];
  console.log('---\nPlayers;');
  console.log(listOfPlayers);
  console.log('\n---');

  storePlayers();
}
