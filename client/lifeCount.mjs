import * as drawCanvas from "./drawCanvas.mjs";

export function lifeCount(lives) {
    switch (lives) {
        case 4:
            drawCanvas.drawSmallSticks();
            break;
        case 3:
            drawCanvas.drawVerticalStick();
            break;
        case 2:
            drawCanvas.drawHorizontalStick();
            break;
        case 1:
            drawCanvas.drawRope();
            break;
        case 0:
            drawCanvas.drawStickman();
            break;
    }
}