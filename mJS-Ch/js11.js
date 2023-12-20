"use strict";
/*
   JavaScript 7th Edition
   Chapter 11
   Chapter Case

   Author:   Craig Reimer
   Date:     11-30-23

   Filename: js11.js


*/

window.addEventListener("load", init);

function init() {
   // Page Objects
   let stories = document.getElementById("stories");
   let news = document.getElementById("news");
   let sInput = document.getElementById("sInput");
   let sButton = document.getElementById("sButton"); 
   let suggestBox = document.getElementById("suggestBox");    
 
   
   // create a request object
   const xhr = new XMLHttpRequest();

   // handle the changing request state
   xhr.onreadystatechange = function() {
      if (xhr.readyState === 4){
         if (xhr.status >= 200 && xhr.status < 300){
            // manage the response
            stories.innerHTML = xhr.responseText;
         } else {
            console.log("Request Failed: " + xhr.statusText);
         }
      }
   }


   // open and send the request
   xhr.open("get", "commentary.html");
   xhr.send(null);
 
   // retrieve archived articles from the web server
   sButton.onclick = () => {
      fetch("archives.pl?skey=" + encodeURIComponent(sInput.value))
      .then( response => {
         if (response.ok) {
            return response.text();
         } else {
            return "Unable to retrieve commentary.";
         }
      })
      .then (context => stories.innerHTML = context)
      .then(() => {
         let topic = sInput.value.toLowerCase();
         getGIF(topic);
      })
      .catch (stories.innerHTML = "Network Failure");
   } 

   // fetch current headlines from the web server
   fetch("headlines.xml")
   .then(response => response.text())
   .then(str => new DOMParser().parseFromString(str, "text/xml"))
   .then(dom => {
      let items = dom.querySelectorAll("item");

      // loop through each story item
      for (let story of items) {
         // write the story content and append it to the page
         let headline = story.children[0].textContent;
         let link = story.children[1].textContent;
         let summary = story.children[2].textContent;

         let htmlCode = `<article><h2><a href="${link}">${headline}</a></h2>
                        <p>${summary}</p></article>`;
         news.insertAdjacentHTML("beforeend", htmlCode);
      }
   })

   // suggest keywords as text is entered in the search box
   sInput.onkeyup = () => {
      if (sInput.value === "") {
         suggestBox.style.display = "none";
      } else {
         // retrieve a list of matching keywords
         fetch("keywords.pl?suggest=" + encodeURIComponent(sInput.value))
         .then (response => response.json())
         // build the suggestion box
         .then(keywords => {
            suggestBox.innerHTML = "";
            if (keywords.matches.length === 0) {
               // no suggestion
               suggestBox.style.display = "none";
            } else {
               // display suggestions
               suggestBox.style.display = "block";

               // create a list of suggestions
               for (let word of keywords.matches) {
                  let suggestion = document.createElement("div");
                  suggestion.textContent = word;
                  suggestBox.appendChild(suggestion);

                  // complete search on suggestion click
                  suggestion.onclick = () => {
                     sInput.value = word;
                     suggestBox.style.display = "none";
                     sButton.click();
                  }
               }

            }
         })
      }
   }
}

// Fetch a GIF for a given topic from Giphy.com
function getGIF(topic) {
   const URL = "https://api.giphy.com/v1/gifs/random";
   const KEY = "fYupU365ISXlXsEKem7nbptmswmoY8zq";
   fetch(`${URL}?api_key=${KEY}&tag=${topic}&limit=1&rating=pg`)
   .then(response => response.json())
   .then(obj => {
      let newImg = document.createElement("img");
      newImg.src = obj.data.images.fixed_height.url;
      stories.appendChild(newImg);
   })
}



