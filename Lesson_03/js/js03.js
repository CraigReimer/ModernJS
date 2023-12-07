/*    JavaScript 7th Edition
     Chapter 3
     Chapter case

     Tipton Turbines
     Program to display games results in a web table
     Author: Craig Reimer
     Date:   8-31-23

     Filename: js03.js
 */

let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


window.addEventListener("load", addWeekDays);

// write week days
function addWeekDays() {
    let i = 0;
    let headingCells = document.getElementsByTagName("th");
    while (i < 7) {
        headingCells[i].innerHTML = weekDays[i];
        i++;
    }
}


window.addEventListener("load", showGames);

// add game results
function showGames() {
    for (let i = 0; i < gameDates.length; i++) {
        let gameInfo = "";

        // open the paragraph
        switch (gameResults[i]) {
            case "W":
                gameInfo += "<p class='win'>";
                break;
            case "L":
                gameInfo += "<p class='lose'>";
                break;
            case "S":
                gameInfo += "<p class='suspended'>";
                break;
            case "P":
                gameInfo += "<p class='postponed'>";
                break;
        }
        
        // display the game location
        if (gameLocations[i] === "h") {
            gameInfo += "vs. ";
            } else if (gameLocations[i] === "a") {
            gameInfo += "@ ";
            }

        // include the opponent
        gameInfo += gameOpponents[i] + "<br>";

        // include the result and score
        gameInfo += gameResults[i] + ": (" + runsScored[i] + " - " + runsAllowed[i] + ")";

        // display innings played for suspended, shortened, or extra innings
        if (gameInnings[i] < 5) {
            gameInfo += " [" + gameInnings[i] + "]***";
        } else if (gameInnings[i] < 9) {
            gameInfo += " [" + gameInnings[i] + "]*";
        } else if (gameInnings[i] > 9) {
            gameInfo += " [" + gameInnings[i] + "]";
        }

        // close the paragraph
        gameInfo += "</p>";

        // write to the table
        let tableCell = document.getElementById(gameDates[i]);
        tableCell.insertAdjacentHTML("beforeend", gameInfo);
    }
}

