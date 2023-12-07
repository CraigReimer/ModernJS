/*    JavaScript 7th Edition
      Chapter 2
      Project 02-04

      Application to calculate the cost of a restaurant order plus tax
      Author: Craig Reimer
      Date:   8-30-23

      Filename: project02-04.js
 */
 
// declare constants
const CHICKEN_PRICE = 10.95;
const HALIBUT_PRICE = 13.95;
const HAMBURGER_PRICE = 9.95;
const SALMON_PRICE = 18.95;
const SALAD_PRICE = 7.95;
const SALES_TAX = 0.07;


// event handlers
document.getElementById("chicken").addEventListener("click", calcTotal);
document.getElementById("halibut").addEventListener("click", calcTotal);
document.getElementById("burger").addEventListener("click", calcTotal);
document.getElementById("salmon").addEventListener("click", calcTotal);
document.getElementById("salad").addEventListener("click", calcTotal);


// calculate costs
function calcTotal() {
   let cost = 0;

   let buyChicken = document.getElementById("chicken").checked;
   let buyHalibut = document.getElementById("halibut").checked;
   let buyBurger = document.getElementById("burger").checked;
   let buySalmon = document.getElementById("salmon").checked;
   let buySalad = document.getElementById("salad").checked;

   buyChicken ? cost += CHICKEN_PRICE : cost += 0;
   buyHalibut ? cost += HALIBUT_PRICE : cost += 0;
   buyBurger ? cost += HAMBURGER_PRICE : cost += 0;
   buySalmon ? cost += SALMON_PRICE : cost += 0;
   buySalad ? cost += SALAD_PRICE : cost += 0;

   document.getElementById("foodTotal").innerHTML = formatCurrency(cost);

   let tax = cost * SALES_TAX;
   document.getElementById("foodTax").innerHTML = formatCurrency(tax);

   let totalCost = cost + tax;
   document.getElementById("totalBill").innerHTML = formatCurrency(totalCost);
}


// Function to display a numeric value as a text string in the format $##.## 
 function formatCurrency(value) {
    return "$" + value.toFixed(2);
 }
