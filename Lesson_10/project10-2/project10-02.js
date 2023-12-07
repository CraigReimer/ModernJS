"use strict";
/*    JavaScript 7th Edition
      Chapter 10
      Project 10-02

      Project to create a drag and drop tangram puzzle
      Author: 
      Date:   

      Filename: project10-02.js
*/

// Reference to the tangram puzzle board
let puzzleBoard = document.getElementById("puzzle");
// Counter for the zIndex style of each puzzle piece
let zCounter = 1;
let eventX, eventY, tanX, tanY;

// Node list representing the tangram pieces
let tans = document.querySelectorAll("div#puzzle > img");

for (let tan of tans) {
   tan.addEventListener('pointerdown', grabTan);
}

// Function to rotate a tan by a specified number of degrees
function rotateTan(elem, deg) {
   const obj = window.getComputedStyle(elem, null);
   const matrix = obj.getPropertyValue("transform");
   let angle = 0;
   if (matrix !== "none") {
      const values = matrix.split('(')[1].split(')')[0].split(',');
      const a = values[0];
      const b = values[1];
      angle = Math.round(Math.atan2(b, a) * (180/Math.PI));      
   }   
   
   if (angle < 0) {
      angle += 360;
   }   
   
   let newAngle = angle + deg;
   
   elem.style.transform = "rotate(" + newAngle + "deg)";
}   

function grabTan(e) {
   if(e.shiftKey) {
      rotateTan(e.target, 45);
   } else {
      // grab pointer coordinates
      eventX = e.clientX;
      eventY = e.clientY;
      
      // prevent default actions
      e.target.style.touchAction = "none";
      
      // assign clicked tan highest zIndex
      zCounter++;
      e.target.style.zIndex = zCounter;

      // capture tan coordinates
      tanX = e.target.offsetLeft;
      tanY = e.target.offsetTop;
      
      // add event listeners for the next two phases
      e.target.addEventListener('pointermove', moveTan);
      e.target.addEventListener('pointerup', dropTan);
   }
}

// move the tan along with the pointer
function moveTan(e) {
   // capture the pointer's current position
   let currentX = e.clientX;
   let currentY = e.clientY;

   // record the delta (difference) between starting position and current position
   let deltaX = currentX - eventX;
   let deltaY = currentY - eventY;

   // paint the new position
   e.target.style.left = tanX + deltaX + "px";
   e.target.style.top = tanY + deltaY + "px";
}

function dropTan(e) {
   e.target.removeEventListener('pointermove', moveTan);
   e.target.removeEventListener('pointerup', dropTan);
}
