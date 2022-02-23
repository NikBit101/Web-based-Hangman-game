export function drawBackground() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    // sky
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, 350);

    // ground
    ctx.fillStyle = '#008000';
    ctx.fillRect(0, 350, canvas.width, canvas.height);

    /**
     * house in background
     * wall-part of house
     */
    ctx.fillStyle = '#964B00';
    ctx.fillRect(280, 300, 100, 50);
    
    /**
     * roof
     */
    ctx.fillStyle = '#D2691E';
    ctx.beginPath();
    ctx.moveTo(280, 300);
    ctx.lineTo(380, 300);
    ctx.lineTo(330, 250);
    ctx.lineTo(280, 300);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    // the sun
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(50, 50, 30, 0, Math.PI*2, false);
    ctx.fill()
    ctx.closePath();
}

export function drawSmallSticks() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#654321';

    ctx.beginPath();
    ctx.moveTo((halfWidth - 120), (halfHeight + 170));
    ctx.lineTo((halfWidth - 80), (halfHeight + 120));
    ctx.lineTo((halfWidth - 40), (halfHeight + 170));
    ctx.stroke();
    ctx.closePath();
}

export function drawVerticalStick() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#654321';

    ctx.beginPath();
    ctx.moveTo((halfWidth - 80), (halfHeight + 130));
    ctx.lineTo((halfWidth - 80), (halfHeight - 60));
    ctx.stroke();
    ctx.closePath();
}

export function drawHorizontalStick() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#654321';

    ctx.beginPath();
    ctx.moveTo((halfWidth - 88), (halfHeight - 60));
    ctx.lineTo((halfWidth + 30), (halfHeight - 60));
    ctx.stroke();
    ctx.closePath();
}

export function drawRope() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#652143';

    ctx.beginPath();
    ctx.moveTo((halfWidth + 30), (halfHeight - 68));
    ctx.lineTo((halfWidth + 30), (halfHeight - 20));
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(halfWidth + 30, halfHeight - 15, 8, 0, Math.PI*2, false);
    ctx.stroke();
}

export function drawStickman() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';

    // face
    ctx.beginPath();
    ctx.arc((halfWidth + 30), (halfHeight - 20), 10, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.closePath();
    
    // body stick
    ctx.beginPath();
    ctx.moveTo((halfWidth + 30), (halfHeight - 10));
    ctx.lineTo((halfWidth + 30), (halfHeight + 40));
    ctx.stroke();
    ctx.closePath();

    // arms
    // left
    ctx.beginPath();
    ctx.moveTo((halfWidth + 30), (halfHeight));
    ctx.lineTo((halfWidth + 10), (halfHeight + 20));
    ctx.stroke();
    ctx.closePath();
    
    // right
    ctx.beginPath();
    ctx.moveTo((halfWidth + 30), (halfHeight));
    ctx.lineTo((halfWidth + 50), (halfHeight + 20));
    ctx.stroke();
    ctx.closePath();
    
    
    // legs
    // left
    ctx.beginPath();
    ctx.moveTo((halfWidth + 30), (halfHeight + 40));
    ctx.lineTo((halfWidth + 10), (halfHeight + 60));
    ctx.stroke();
    ctx.closePath();
    
    // right
    ctx.beginPath();
    ctx.moveTo((halfWidth + 30), (halfHeight + 40));
    ctx.lineTo((halfWidth + 50), (halfHeight + 60));
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