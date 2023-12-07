/*    JavaScript 7th Edition
      Chapter 2
      Project 02-02

      Application to test for completed form
      Author: Craig Reimer
      Date:   8-29-23

      Filename: project02-02.js
 */
 
function verifyForm() {
      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let phone = document.getElementById("phone").value;
      
      let areAllFieldsFilled = name && email && phone;

      window.alert(areAllFieldsFilled ? "Thank You!" : "Please fill in all fields.")
}

// event listener for form verification
document.getElementById("submit").addEventListener("click", verifyForm);
