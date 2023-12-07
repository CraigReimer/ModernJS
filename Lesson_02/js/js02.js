/*    JavaScript 7th Edition
      Chapter 2
      Chapter case

      Fan Trick Fine Art Photography
      Variables and functions
      Author: Craig Reimer
      Date:   8-29-23

      Filename: js02.js
 */

// declare GLOBAL constants for the application
const EMP_COST = 100;         // $ photographers per hour
const BOOK_COST = 350;        // $ memory book
const REPRO_COST = 1250;      // $ reproduction rights
const TRAVEL_COST = 2         // travel per mile


// setup the form when the page loads
window.addEventListener("load", setupForm)

function setupForm() {
      document.getElementById("photoNum").value = 1;
      document.getElementById("photoHrs").value = 2;
      document.getElementById("makeBook").checked = false;
      document.getElementById("photoRights").checked = false;
      document.getElementById("photoDist").value = 0;

      getEstimate();


      // add event handlers for each input control
      document.getElementById("photoNum").onchange = getEstimate;
      document.getElementById("photoHrs").onchange = getEstimate;
      document.getElementById("makeBook").onchange = getEstimate;
      document.getElementById("photoRights").onchange = getEstimate;
      document.getElementById("photoDist").onchange = getEstimate;
}


// estimate the total cost of the service
function getEstimate() {
      let totalCost = 0;
      let photographers = document.getElementById("photoNum").value;
      let hours = document.getElementById("photoHrs").value;
      let distance = document.getElementById("photoDist").value;
      let buyBook = document.getElementById("makeBook").checked
      let buyRights = document.getElementById("photoRights").checked;

      // add the cost of photographers for the hours covered
      totalCost += photographers * hours * EMP_COST;

      // add the cost of travel
      totalCost += photographers * distance * TRAVEL_COST;

      // add the cost of the book if purchased
      totalCost += buyBook ? BOOK_COST : 0;

      // add the cost of reproduction rights if purchased
      totalCost += buyRights ? REPRO_COST : 0;

      // display the total cost estimate
      document.getElementById("estimate").innerHTML = "$" + totalCost;
}

