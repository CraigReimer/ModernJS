"use strict";
/*    JavaScript 7th Edition
      Chapter 7
      Project 07-04

      Project to create a customer queue
      Author: Craig Reimer
      Date:   10-14-23

      Filename: project07-04.js
*/

let customers = ["Alisha Jordan","Kurt Cunningham", "Ricardo Lopez", "Chanda Rao",
                 "Kevin Grant", "Thomas Bey", "Elizabeth Anderson", "Shirley Falk",
                 "David Babin", "Arthur Blanding", "Brian Vick", "Jaime Aguilar",
                 "Eileen Rios", "Gail Watts", "Margaret Wolfe", "Kathleen Newman",
                 "Jason Searl", "Stephen Gross", "Robin Steinfeldt", "Jacob Bricker",
                 "Gene Bearden", "Charles Sorensen", "John Hilton", "David Johnson",
                 "Wesley Cho"];

let customerName = document.getElementById("customerName");
let customerList = document.getElementById("customerList");

let addButton = document.getElementById("addButton");
let searchButton = document.getElementById("searchButton");
let removeButton = document.getElementById("removeButton");
let topButton = document.getElementById("topButton");

let qStatus = document.getElementById("status");

generateCustomerList();

// Function to generate the ordered list based on the contents of the customers array
function generateCustomerList() {
   customerList.innerHTML = "";
   for (let i = 0; i < customers.length; i++) {
      let customerItem = document.createElement("li");      
      customerItem.textContent = customers[i];     
      customerList.appendChild(customerItem);
   }
}

// event handler for addButton
addButton.addEventListener("click", function(){
   customers.push(customerName.value);
   generateCustomerList();
   qStatus.textContent = customerName.value + " added to the end of the queue.";
});

// event handler for searchButton
searchButton.addEventListener("click", function() {
   let index = customers.indexOf(customerName.value);
   let place = index + 1;
   if (place === 0) {
      qStatus.textContent = customerName.value + " is not found in the queue.";
   } else {
      qStatus.textContent = customerName.value + " found in position " + place + " of the queue.";
   }
});

// event handler for removeButton
removeButton.addEventListener("click", function() {
   if (customers.length > 0) {
      let index = customers.indexOf(customerName.value);
      if (index !== -1) {
         customers.splice(index, 1);
         qStatus.textContent = customerName.value + " removed from the queue.";
         generateCustomerList();
      } else {
         qStatus.textContent = customerName.value + " is not found in the queue.";
      }
   } else {
      qStatus.textContent = "No customers to remove.";
   }
});

// event handler for topButton
topButton.addEventListener("click", function() {
   if (customers.length > 0) {
      let topCustomer = customers.shift();
      qStatus.textContent = topCustomer + " removed from the queue.";
      generateCustomerList();
   } else {
      qStatus.textContent = "No customers to remove.";
   }
});

