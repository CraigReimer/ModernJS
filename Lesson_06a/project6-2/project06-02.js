"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Project 06-02

      Project to turn a selection list into a selection of hypertext links
      Author: Craig Reimer
      Date:   9-27-23

      Filename: project06-02.js
*/

window.addEventListener("load", function(){
      // retrieve all 'select' elements from a Form with the ID 'govLinks'
      let allSelect = document.querySelectorAll('form#govLinks select')

      // loop through all 'select' elements
      for (let i = 0; i < allSelect.length; i++){
            
            // apply the onchange event handler to each
            allSelect[i].onchange = function(evt){
                  // retrieve the link URL
                  let linkURL = evt.target.value;
                  
                  // open the link in a new window
                  let newWin = window.open(linkURL);
            }
      }
})
