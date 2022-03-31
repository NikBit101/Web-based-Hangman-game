import uuid from 'uuid-random';

export let playersStats = [
  { name: 'john', id: uuid(), wins: 0, losses: 0 },
  { name: 'chris', id: uuid(), wins: 0, losses: 0 },
  { name: 'justin', id: uuid(), wins: 0, losses: 0 },
];

export function checkPlayers(whoToCheck) {
  for (let i = 0; i < playersStats.length; i += 1) {
    if (playersStats[i].name.includes(whoToCheck)) {
      return false;
    }
  }
  return true;
}

export function storePlayer(whoToAdd, winCount, lossCount) {
  const newStat = {
    name: whoToAdd,
    id: uuid(),
    wins: winCount,
    losses: lossCount,
  };
  playersStats = [newStat, ...playersStats.splice(0, 9)];
  return playersStats;
}
