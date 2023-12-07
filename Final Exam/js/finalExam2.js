"use strict";
/*    Modern JavaScript
      Final Exam 2

      Project to create a drag and drop jigsaw puzzle
      Author: Craig Reimer
      Date:   12-6-23

      Filename: finalExam2.js
*/

// Reference to the puzzle board
let puzzleBoard = document.getElementById("puzzleBoard");
// Counter for the zIndex style of each puzzle piece
let zCounter = 1;
// Array of integers from 1 to 48
let intList = new Array(48);
// pointerX and pointerY will contain the initial coordinates of the pointerX
// pieceX and pieceY will contain the initial coordinates of a puzzle piece
let pointerX, pointerY, pieceX, pieceY;

// Sort the integers from 1 to 48 in random order
for (let i = 0; i < 48 ; i++) {
   intList[i] = i+1;
}
intList.sort(function() {
   return 0.5 - Math.random();
});

// generate randomly-sorted puzzle pieces
for (let i = 0; i < 48; i++) {
   let piece = document.createElement("img");
   piece.src = "img/piece" + intList[i] + ".png";
   let rowNum = Math.ceil((i+1)/8);
   let colNum = (i + 1) - (rowNum - 1)*8;
   piece.style.top = (rowNum - 1)*98 + 7 + "px";
   piece.style.left = (colNum - 1)*98 + 7 + "px";
   piece.draggable = false; // override the default draggability of images
   puzzleBoard.appendChild(piece);      
}

// Node list representing the puzzle pieces
let pieces = document.querySelectorAll("div#puzzleBoard img");

// loop through the pieces attaching event listeners
for (let piece of pieces) {
   piece.addEventListener('pointerdown', grabPiece);
}

function grabPiece(e) {
   // get pointer coordinates
   pointerX = e.clientX;
   pointerY = e.clientY;

   // prevent default actions
   e.target.style.touchAction = "none";

   // assign clicked piece highest z-index
   zCounter++;
   e.target.style.zIndex = zCounter;

   // get piece coordinates
   pieceX = e.target.offsetLeft;
   pieceY = e.target.offsetTop;

   // add event listeners for the next two phases
   e.target.addEventListener('pointermove', movePiece);
   e.target.addEventListener('pointerup', dropPiece);

}

// move the piece along with the pointer
function movePiece(e) { 
   // capture the pointer's current position
   let currentX = e.clientX;
   let currentY = e.clientY;

   // record the delta (difference) between starting position and current position
   let deltaX = currentX - pointerX;
   let deltaY = currentY - pointerY;

   // paint the new position
   e.target.style.left = pieceX + deltaX + "px";
   e.target.style.top = pieceY + deltaY + "px";
}

function dropPiece(e) {
   e.target.removeEventListener('pointermove', movePiece);
   e.target.removeEventListener('pointerup', dropPiece);
}



