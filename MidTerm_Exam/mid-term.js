"use strict";
// Array of Quotes from Famous People
let quotes = [
   "The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low, and achieving our mark. <p>~Michelangelo</p>",
   "It's one of the greatest gifts you can give yourself, to forgive.  Forgive everybody.  <p>~Maya Angelou</p>",
   "The greatest glory in living lies not in never falling, but in rising every time we fall.  <p>~Nelson Mandela</p>",
   "I attribute my success to this:  I never gave or took any excuse.  <p>~Florence Nightingale</p>",
   "How wonderful it is that nobody need wait for a single moment before starting to improve the world. <p>~Anne Frank</p>",
   "The most difficult thing is the decision to act, the rest is merely tenacity. <p>~Amelia Earhart</p>",
   "You miss 100% of the shots you don't take.  <p>~Wayne Gretzky</p>",
   "In the end, it's not the years in your life that count.  It's the life in your years.  <p>~Abraham Lincoln</p>",
   "It is during our darkest moments that we must focus to see the light.  <p>~Aristotle</p>",
   "Try not to become a person of success.  Rather become a person of value. <p>~Albert Einstein</p> <br /><small>(Note: Quote has been modified from 'man' to 'person'.)</small>"
];


// Run the quote generator every time the page loads
window.addEventListener("load", quoteGenerator);


// Function to generate and display a random quote
function quoteGenerator() {
   
   // Number of quotes in the array
   let quoteCount = quotes.length;
   
   // Generate a random integer to select a quote
   let randomQuote = randomInt(0, quoteCount);
   
   // Retrieve a randomly-selected quote
   let quote = quotes[randomQuote];
   
   
   // Display the random quote
   document.getElementsByTagName("blockquote")[0].innerHTML = quote;
};








/*=================================================================*/
// Function to return a randomly-selected integer between lowest and highest, inclusive
function randomInt(lowest, highest) {
   let result;
   
   do {
      result = Math.floor(highest*Math.random()); // `highest` left at a value of 10 produces a higher likelihood of returning 9 from .floor()
   } while (result >= highest);  // verify the result is less than 10, as 10 is out of range
   
   return result; 
}