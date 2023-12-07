"use strict";
/*  JavaScript 7th Edition
    Chapter 10
    Chapter case

    Oak Top House
    Author: Craig Reimer
    Date:   11-16-23

    Filename: js10a.js
*/


window.addEventListener("load", setupRoom);

// perform setup tasks when page first loads
function setupRoom() {
   //Page objects
   let room = document.getElementById("room");                            // banquet hall
   let storage = document.getElementsByTagName("storage");                // storage room
   let roomTables = document.querySelectorAll("#room > div.table");       // Tables in the banquet hall
   let storageTables = document.querySelectorAll("#storage > div.table"); // Tables in the storage room
   let zIndexCounter = 0;                                                 // Count the highest z-Index value
   let startingX, startingY;                                              // initial pointer coordinates
   let tableX, tableY;                                                    // initial table coordinates

   // Function to calculate available seats in the room layout
   function countSeats() {
      let guests = 0;
            let seatCount = document.getElementById("seatCount");      
      let tablesToCount = document.querySelectorAll("#room > div.table");
      for (let items of tablesToCount) {
         guests += parseInt(items.textContent);
      }
      seatCount.textContent = guests;
    }

    // add tables from storage to the banquet hall
    for (let items of storageTables) {
      items.onclick = function() {
         let storageCopy = items.cloneNode(true);
         room.appendChild(storageCopy);
         zIndexCounter++;
         storageCopy.style.zIndex = zIndexCounter;
         countSeats();

         // grab the table in response to the pointerdown event
         storageCopy.addEventListener("pointerdown", grabTable);
      }
    }

    function grabTable(e) {
      if(e.shiftKey) {
         // remove the table
         e.target.parentElement.removeChild(e.target);
         countSeats();
      } else {
         // capture pointer coordinates
         startingX = e.clientX;
         startingY = e.clientY;
         
         // prevent default browser touch actions
         e.target.style.touchAction = "none";
         
         // assign the clicked table the highest zIndex
         zIndexCounter++;
         e.target.style.zIndex = zIndexCounter;

         // capture table coordinates
         tableX = e.target.offsetLeft;
         tableY = e.target.offsetTop;

         // add event listeners for the next two phases
         e.target.addEventListener("pointermove", moveTable);
         e.target.addEventListener("pointerup", dropTable);
      }
    }

    // move the table along with the pointer
    function moveTable(e) {
      // capture the pointer's current position
      let currentX = e.clientX;
      let currentY = e.clientY;

      // record the delta (difference) between starting position and current position
      let deltaX = currentX - startingX;
      let deltaY = currentY - startingY;

      // calculate the table's new position
      e.target.style.left = tableX + deltaX + "px";
      e.target.style.top = tableY + deltaY + "px";

    }

    // release the kraken
    function dropTable(e) {
      e.target.removeEventListener("pointermove", moveTable);
      e.target.removeEventListener("pointerup", dropTable);
    }
}