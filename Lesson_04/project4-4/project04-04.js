"use strict";
/*    JavaScript 7th Edition
      Chapter 4
      Project 04-04

      Application to determine change from a cash amount
      Author: Craig Reimer
      Date:   9-18-23

      Filename: project04-04.js
*/

// Global variables
let cashBox = document.getElementById("cash");
let billBox = document.getElementById("bill");
let changeBox = document.getElementById("change");

// Event handlers to be run when the cash or bill value changes
cashBox.addEventListener("change", runTheRegister);
billBox.addEventListener("change", runTheRegister);

// Function to reset the values in the web page
function zeroTheRegister() {
   changeBox.value = 0;
   document.getElementById("bill20").innerHTML = 0;
   document.getElementById("bill10").innerHTML = 0;
   document.getElementById("bill5").innerHTML = 0;
   document.getElementById("bill1").innerHTML = 0;
   document.getElementById("coin25").innerHTML = 0;
   document.getElementById("coin10").innerHTML = 0;
   document.getElementById("coin5").innerHTML = 0;
   document.getElementById("coin1").innerHTML = 0;
   document.getElementById("warning").innerHTML = "";
}

// Function to run the cash register
function runTheRegister() {
   zeroTheRegister();
   
   
   
   try {
      let cashValue = parseFloat(cashBox.value);
      let billValue = parseFloat(billBox.value);

      // covert dollar values to cents
      cashValue *= 100;
      billValue *= 100;
      
      let changeValue = cashValue - billValue;  // calculate the change 
      
      if (billValue > cashValue) throw "Cash amount doesn't cover the bill"
         
         changeBox.value = formatCurrency(changeValue / 100); // format the change as currency
      
         calcChange(changeValue); // Determine the units of currency needed for the change
   } catch (error) {
      document.getElementById("warning").innerHTML = error;
   }
   
   
   
}

// Function to calculate the change by each unit of currency
function calcChange(changeValueCents) {
   // Determine the number of $20 bills
   let bill20Amt = determineCoin(changeValueCents, 2000);
   document.getElementById("bill20").innerHTML = bill20Amt;
   changeValueCents -=  bill20Amt*2000;

   // Determine the number of $10 bills   
   let bill10Amt = determineCoin(changeValueCents, 1000);
   document.getElementById("bill10").innerHTML = bill10Amt;
   changeValueCents -=  bill10Amt*1000;
   
   // Determine the number of $5 bills
   let bill5Amt = determineCoin(changeValueCents, 500);
   document.getElementById("bill5").innerHTML = bill5Amt;
   changeValueCents -=  bill5Amt*500;  
   
   // Determine the number of $1 bills
   let bill1Amt = determineCoin(changeValueCents, 100);
   document.getElementById("bill1").innerHTML = bill1Amt;
   changeValueCents -=  bill1Amt*100;  
   
   // Determine the number of quarters
   let coin25Amt = determineCoin(changeValueCents, 25);
   document.getElementById("coin25").innerHTML = coin25Amt;
   changeValueCents -= coin25Amt*25;   
   
   // Determine the number of dimes
   let coin10Amt = determineCoin(changeValueCents, 10);
   document.getElementById("coin10").innerHTML = coin10Amt;
   changeValueCents -= coin10Amt*10; 
   
   // Determine the number of nickels
   let coin5Amt = determineCoin(changeValueCents, 5);
   document.getElementById("coin5").innerHTML = coin5Amt;
   changeValueCents -= coin5Amt*5;  
   
   // Determine the number of pennies
   // The Math.round() method rounds the value to the nearest integer
   let coin1Amt = Math.round(changeValueCents);
   document.getElementById("coin1").innerHTML = coin1Amt;
}








/* ================================================================= */

// Function to determine the largest whole number of currency units that 
// can fit within the cash value
function determineCoin(cashValue, currencyUnit) {
   // The parseInt() function returns the integer value of the ratio
   return parseInt(cashValue/currencyUnit);
}

 // Function to display a numeric value as a text string in the format ##.## 
 function formatCurrency(value) {
    return value.toFixed(2);
 }