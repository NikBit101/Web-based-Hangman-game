'use strict';

import * as drawCanvas from './drawCanvas.mjs';

export function guessCount(guesses, isFound) {
  switch (guesses) {
    case 7:
      drawCanvas.drawSmallSticks(isFound);
      break;
    case 6:
      drawCanvas.drawVerticalStick(isFound);
      break;
    case 5:
      drawCanvas.drawHorizontalStick(isFound);
      break;
    case 4:
      drawCanvas.drawRope(isFound);
      break;
    case 3:
      drawCanvas.drawStickHead(isFound);
      break;
    case 2:
      drawCanvas.drawStickBody(isFound);
      break;
    case 1:
      drawCanvas.drawStickArms(isFound);
      break;
    case 0:
      drawCanvas.drawStickLegs();
      break;
  }
}
