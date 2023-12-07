/*    JavaScript 7th Edition
      Chapter 2
      Project 02-03

      Application to return the shape of a clicked object
      Author: Craig Reimer
      Date:   8-30-23

      Filename: project02-03.js
 */

document.getElementById("square").addEventListener("mouseover", function(){
      document.getElementById("feedback").innerHTML = "You're hovering over the square.";
});

document.getElementById("square").addEventListener("mouseout", function(){
      document.getElementById("feedback").innerHTML = "";
});



document.getElementById("triangle").addEventListener("mouseover", function(){
      document.getElementById("feedback").innerHTML = "You're hovering over the triangle.";
});

document.getElementById("triangle").addEventListener("mouseout", function(){
      document.getElementById("feedback").innerHTML = "";
});



document.getElementById("circle").addEventListener("mouseover", function(){
      document.getElementById("feedback").innerHTML = "You're hovering over the circle.";
});

document.getElementById("circle").addEventListener("mouseout", function(){
      document.getElementById("feedback").innerHTML = "";
});