"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Chapter case
      
      Eating Well in Season 
      Author: Craig Reimer
      Date:   11-8-23
      
      Filename: js09b.js
 */



// retrieve the text of the query string
let qstring = location.search.slice(1);
qstring = qstring.replace(/\+/g, " ");
qstring = decodeURIComponent(qstring);

// split the field=name pairs into separate array items
const formData = qstring.split(/&/g);

for (let items of formData) {
      // extract field names and values
      const fieldValuePair = items.split(/=/);
      const fieldName = fieldValuePair[0];
      const fieldValue = fieldValuePair[1];

      // create a label containing the field name
      const fieldLabel = document.createElement("label");
      fieldLabel.textContent = fieldName;
      document.getElementById("contactInfo").appendChild(fieldLabel);

      // create a disabled input box with the field value
      const inputBox = document.createElement("input");
      inputBox.id = fieldName;
      inputBox.name = fieldName;
      inputBox.value = fieldValue;
      inputBox.disabled = true;
      document.getElementById("contactInfo").appendChild(inputBox);
}

// store data to local storage when the user signs up
document.getElementById("signupBtn").onclick = function() {
      // data fields to be saved to local storage
      let formFields = document.querySelectorAll("#contactInfo input, input[type=radio]:checked, textarea");

      // write each field name and value to local storage
      for (let fields of formFields) {
            localStorage.setItem(fields.name, fields.value);      
      }
      location.href = "js09c.html";
}
