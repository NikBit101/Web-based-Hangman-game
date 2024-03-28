
/**
 * These functions will draw gallows and a colourful stickman
 * Each function is responsible for each gallow figure and stickman body parts
 *  */


export function drawBackground() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

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
  ctx.fillRect(180, 60, 80, 20);

  /**
   * roof
   */
  ctx.fillStyle = '#D2691E';
  ctx.beginPath();
  ctx.moveTo(180, 60);
  ctx.lineTo(260, 60);
  ctx.lineTo(220, 40);
  ctx.lineTo(180, 60);
  ctx.fill();
  ctx.closePath();

  // the sun
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(30, 20, 10, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
}

export function drawSmallSticks() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#654321';

  ctx.beginPath();
  ctx.moveTo((halfWidth - 100), (halfHeight + 40));
  ctx.lineTo((halfWidth - 80), (halfHeight + 30));
  ctx.lineTo((halfWidth - 60), (halfHeight + 40));
  ctx.stroke();
  ctx.closePath();
}

export function drawVerticalStick() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#654321';

  ctx.beginPath();
  ctx.lineTo((halfWidth - 80), (halfHeight + 30));
  ctx.lineTo((halfWidth - 80), (halfHeight - 30));
  ctx.stroke();
  ctx.closePath();
}

export function drawHorizontalStick() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#654321';

  ctx.beginPath();
  ctx.moveTo((halfWidth - 85), (halfHeight - 30));
  ctx.lineTo((halfWidth + 15), (halfHeight - 30));
  ctx.stroke();
  ctx.closePath();
}

export function drawRope() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#652143';

  ctx.beginPath();
  ctx.moveTo((halfWidth + 10), (halfHeight - 30));
  ctx.lineTo((halfWidth + 10), (halfHeight - 20));
  ctx.stroke();
  ctx.closePath();
}

export function drawStickHead() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.lineWidth = 5;
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';

  // face
  ctx.beginPath();
  ctx.arc((halfWidth + 10), (halfHeight - 15), 5, 0, Math.PI * 2, false);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

export function drawStickBody() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'red';

  // body stick
  ctx.beginPath();
  ctx.moveTo((halfWidth + 10), (halfHeight - 8));
  ctx.lineTo((halfWidth + 10), (halfHeight + 15));
  ctx.stroke();
  ctx.closePath();
}

export function drawStickArms() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const halfWidth = canvas.width / 2;
  const halfHeight = canvas.height / 2;
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'yellow';

  // arms
  // left
  ctx.beginPath();
  ctx.moveTo((halfWidth + 10), (halfHeight - 5));
  ctx.lineTo((halfWidth - 10), (halfHeight + 5));
  ctx.stroke();
  ctx.closePath();

  // right
  ctx.beginPath();
  ctx.moveTo((halfWidth + 10), (halfHeight - 5));
  ctx.lineTo((halfWidth + 30), (halfHeight + 5));
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
  ctx.moveTo((halfWidth + 10), (halfHeight + 15));
  ctx.lineTo((halfWidth - 10), (halfHeight + 25));
  ctx.stroke();
  ctx.closePath();

  // right
  ctx.beginPath();
  ctx.moveTo((halfWidth + 10), (halfHeight + 15));
  ctx.lineTo((halfWidth + 30), (halfHeight + 25));
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
