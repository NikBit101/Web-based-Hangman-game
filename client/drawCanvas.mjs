'use strict';

export function drawBackground() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  //
  // canvas width: 200
  // height: 150
  //
  // sky
  ctx.fillStyle = '#87CEEB';
  ctx.fillRect(0, 0, canvas.width, 80);

  // ground
  ctx.fillStyle = '#008000';
  ctx.fillRect(0, 80, canvas.width, canvas.height);
  /**
   * house in background
   * wall-part of house
   */
  ctx.fillStyle = '#964B00';
  ctx.fillRect(130, 60, 40, 20);

  /**
   * roof
   */
  ctx.fillStyle = '#D2691E';
  ctx.beginPath();
  ctx.moveTo(130, 60);
  ctx.lineTo(170, 60);
  ctx.lineTo(150, 45);
  ctx.lineTo(130, 60);
  ctx.fill();
  ctx.closePath();

  // the sun
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(30, 20, 12, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
}

export function drawSmallSticks(isFound) {
  if (isFound) { return; }

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#654321';

  ctx.beginPath();
  ctx.moveTo((halfWidth - 80), (halfHeight + 40));
  ctx.lineTo((halfWidth - 60), (halfHeight + 30));
  ctx.lineTo((halfWidth - 40), (halfHeight + 40));
  ctx.stroke();
  ctx.closePath();
}

export function drawVerticalStick(isFound) {
  if (isFound) { return; }
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#654321';

  ctx.beginPath();
  ctx.lineTo((halfWidth - 60), (halfHeight + 30));
  ctx.lineTo((halfWidth - 60), (halfHeight - 30));
  ctx.stroke();
  ctx.closePath();
}

export function drawHorizontalStick(isFound) {
  if (isFound) { return; }

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#654321';

  ctx.beginPath();
  ctx.moveTo((halfWidth - 63), (halfHeight - 30));
  ctx.lineTo((halfWidth), (halfHeight - 30));
  ctx.stroke();
  ctx.closePath();
}

export function drawRope(isFound) {
  if (isFound) { return; }

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#652143';

  ctx.beginPath();
  ctx.moveTo((halfWidth), (halfHeight - 32));
  ctx.lineTo((halfWidth), (halfHeight - 20));
  ctx.stroke();
  ctx.closePath();
}

export function drawStickHead(isFound) {
  if (isFound) { return; }

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.lineWidth = 5;
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';

  // face
  ctx.beginPath();
  ctx.arc((halfWidth), (halfHeight - 13), 5, 0, Math.PI * 2, false);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

export function drawStickBody(isFound) {
  if (isFound) { return; }

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'red';

  // body stick
  ctx.beginPath();
  ctx.moveTo((halfWidth), (halfHeight - 5));
  ctx.lineTo((halfWidth), (halfHeight + 20));
  ctx.stroke();
  ctx.closePath();
}

export function drawStickArms(isFound) {
  if (isFound) { return; }

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'yellow';

  // arms
  // left
  ctx.beginPath();
  ctx.moveTo((halfWidth), (halfHeight));
  ctx.lineTo((halfWidth - 20), (halfHeight + 10));
  ctx.stroke();
  ctx.closePath();

  // right
  ctx.beginPath();
  ctx.moveTo((halfWidth), (halfHeight));
  ctx.lineTo((halfWidth + 20), (halfHeight + 10));
  ctx.stroke();
  ctx.closePath();
}

export function drawStickLegs() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'lime';

  // legs
  // left
  ctx.beginPath();
  ctx.moveTo((halfWidth), (halfHeight + 20));
  ctx.lineTo((halfWidth - 20), (halfHeight + 30));
  ctx.stroke();
  ctx.closePath();

  // right
  ctx.beginPath();
  ctx.moveTo((halfWidth), (halfHeight + 20));
  ctx.lineTo((halfWidth + 20), (halfHeight + 30));
  ctx.stroke();
  ctx.closePath();
}

// clear canvas for redrawing
export function clearCanvas() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.stroke();
}
