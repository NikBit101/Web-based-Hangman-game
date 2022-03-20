// send to server the name of the player
export async function postStat(who, winCount, lossCount) {
  const payload = { name: who, wins: winCount, losses: lossCount };
  const response = await fetch('newPlayerStat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`[${response.status}] connection failed;\n- Failed to post new player stats.`);
  }
}
