"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Chapter case
      
      Eating Well in Season Retrieving Data from Local Storage
      Author: Craig Reimer
      Date:   11-8-23
      
      Filename: js09c.js
 */

// Eating Well preference keys
const keys = ["name", "email", "phone", "address", "city", "state", "zip", "allergies", "frequency", "size"];

for (let item of keys) {
      const newRow = document.createElement("tr");

      // display the storage key
      const keyCell = document.createElement("td");
      keyCell.textContent = item;
      newRow.appendChild(keyCell);

      // display the key value
      const keyValue = document.createElement("td");
      keyValue.textContent = localStorage.getItem(item);
      newRow.appendChild(keyValue);

      // append each key=name value pair as a table row
      document.getElementById("prefTable").appendChild(newRow);
}

// remove keys on button click
document.getElementById("removePrefBtn").onclick = function() {
      for (let item of keys) {
            localStorage.removeItem(item);
      }

      // reload page
      location.reload();
}