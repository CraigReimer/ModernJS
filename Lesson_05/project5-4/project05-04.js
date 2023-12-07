"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Project 05-04

      Project to display footnotes in a popup window
      Author: Craig Reimer
      Date:   9-21-23

      Filename: project05-04.js
*/

// Node list of phrases that are associated with footnotes
let phrases = document.querySelectorAll("article blockquote dfn");

// Function to display footnotes
for (let i = 0; i < phrases.length; i++) {
   phrases[i].addEventListener("click", function() {
         let phrase = document.createElement("h1");
         phrase.textContent = this.textContent;
         let footnote = document.createElement("p");
         footnote.textContent = footnotes[i];
         footnote.style = "font-style: italic; font-size: 1.2em;";
         let closeButton = document.createElement("input");
         closeButton.type = "button";
         closeButton.value = "Close Footnote";
         closeButton.style = "display: block; margin: 10 px auto;";
         let popup = window.open("", "footnote", "width=300, height=200, top=100, left=100");
         popup.document.body.style = "background-color: ivory; font-size: 16px; padding: 10px;";
         popup.document.body.appendChild(phrase);
         popup.document.body.appendChild(footnote);
         popup.document.body.appendChild(closeButton);
         closeButton.onclick = function() {
            popup.close();
         }
   });
}

