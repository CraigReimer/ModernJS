"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Project 09-04

      Project to store high scores from a game in a cookie
      Author: Craig Reimer
      Date:   11-9-23

      Filename: project09-04.js
*/

/* Page Objects */
let bestText = document.getElementById("best");
let clockTimer = document.getElementById("timer");

// Custom event that runs when the puzzle is solved
window.addEventListener("puzzleSolved", updateRecord);

// Event listener that is run when the page loads
window.addEventListener("load", function() {
      if (document.cookie) {
            bestText.textContent = getBestTime() + " seconds";
      }
});

function getBestTime() {
      if (document.cookie) {
            const cookieArray = document.cookie.split("=");
            return parseInt(cookieArray[1])
      } else { return 9999; }
}

function updateRecord() {
      let solutionTime = document.getElementById("timer").value;
      solutionTime = parseInt(solutionTime);
      let bestTime = getBestTime();
      if (solutionTime < bestTime) {bestTime = solutionTime};
      bestText.textContent = bestTime + " seconds";
      const seconds = 60*60*24*90;
      document.cookie = "puzzle8best=" + bestTime + ";max-age=" + seconds;
}
