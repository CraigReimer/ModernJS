"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: Craig Reimer
      Date:   9-21-23

      Filename: js05.js
*/

// event listener
window.addEventListener("load", createLightbox);



// functions
function createLightbox() {
      // Container
      let lightBox = document.getElementById("lightbox");

      // parts of the lightbox
      let lbTitle = document.createElement("h1");
      let lbCounter = document.createElement("div");
      let lbPrev = document.createElement("div");
      let lbNext = document.createElement("div");
      let lbPlay = document.createElement("div");
      let lbImages = document.createElement("div");

      // append parts and assign ids
      lightBox.appendChild(lbTitle);
      lbTitle.id = "lbTitle";
      lbTitle.textContent = lightboxTitle;

      lightBox.appendChild(lbCounter);
      lbCounter.id = "lbCounter";
      let currentImg = 1;
      lbCounter.textContent = currentImg + " / " + imgCount;

      lightBox.appendChild(lbPrev);
      lbPrev.id = "lbPrev";
      lbPrev.innerHTML = "&#9664;";
      lbPrev.onclick = showPrev;

      lightBox.appendChild(lbNext);
      lbNext.id = "lbNext";
      lbNext.innerHTML = "&#9654;";
      lbNext.onclick = showNext;

      lightBox.appendChild(lbPlay);
      lbPlay.id = "lbPlay";
      lbPlay.innerHTML = "&#9199;";
      let timeID;
      lbPlay.onclick = function() {
            if (timeID){
                  // stop the slideshow
                  window.clearInterval(timeID);
                  timeID = undefined;
            } else {
                  // start the slideshow
                  showNext();
                  timeID = window.setInterval(showNext, 1500);
            }
            
      }

      lightBox.appendChild(lbImages);
      lbImages.id = "lbImages";

      // Add images from the imgFiles array
      for (let i = 0; i < imgCount; i++) {
            let image = document.createElement("img");
            image.src = "img/" + imgFiles[i];
            image.alt = imgCaptions[i];
            image.onclick = createOverlay;
            lbImages.appendChild(image);
      }

      // function to move forward through the image list
      function showNext() {
            lbImages.appendChild(lbImages.firstElementChild);
            (currentImg < imgCount) ? currentImg++ : currentImg = 1;
            lbCounter.textContent = currentImg + " / " + imgCount;
      }

      // function to move backward through the image list
      function showPrev() {
            lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
            (currentImg > 1) ? currentImg-- : currentImg = imgCount;
            lbCounter.textContent = currentImg + " / " + imgCount;
      }

      // function to create overlay
      function createOverlay() {
            let overlay = document.createElement("div");
            overlay.id = "lbOverlay";

            // add figure box to overlay
            let figureBox = document.createElement("figure");
            overlay.appendChild(figureBox);

            // add image to figure box
            let overlayImage = this.cloneNode(true);
            figureBox.appendChild(overlayImage);

            // add caption to figure box
            let overlayCaption = document.createElement("figcaption");
            overlayCaption.textContent = this.alt;
            figureBox.appendChild(overlayCaption);

            // add close button to overlay
            let closeBox = document.createElement("div");
            closeBox.id = "lbOverlayClose";
            closeBox.innerHTML = "&times;";
            closeBox.onclick = function() {
                  document.body.removeChild(overlay);
            }
            overlay.appendChild(closeBox);

            document.body.appendChild(overlay);
      }
}




