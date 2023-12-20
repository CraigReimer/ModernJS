"use strict";
/*    JavaScript 7th Edition
      Chapter 11
      Project 11-03

      Project to retrieve order history from a web server
      Author: Craig Reimer
      Date:   12-5-23

      Filename: project11-03.js
*/

let orderResult = document.getElementById("orderResult");
let userIDBox = document.getElementById("userID");
let pwdBox = document.getElementById("pwd");

document.addEventListener('keypress', (event) => {
	// event.keyCode or event.which property will have the code of the press key 
	let keyCode = event.keyCode ? event.keyCode : event.which;
	
	// 13 points is the enter key
	if (keyCode === 13) {
		// call click function of the button
		viewOrders.onclick();
	}
})

// Retrieve order history when the View Orders button is clicked
viewOrders.onclick = function() {
   const USER = userIDBox.value;
   const PWD = pwdBox.value;

   fetch(`wworders.pl?id=${USER}&pwd=${PWD}`)
   .then(response => response.json())
   .then(json => buildOrderTable(json))
   .catch(msg => console.log(msg));
}


// Function to display order history within web tables
function buildOrderTable(obj) {
	if (obj.status === "Orders Not Found") {
		orderResult.innerHTML = "No orders found for this user id and password";
	} else {
		let htmlCode = `<table id="summary"><tr><th>Name</th><td>${obj.username}</td></tr>
		<tr><th>Total Charges</th><td>${obj.totalCharges}</td></tr></table>`;

		// loop through obj.orderHistory, creating a separate table for each order
		for (let i = 0; i < obj.orderHistory.length; i++) {
			htmlCode += `<table class= "orderList"><tr><th colspan="2">${obj.orderHistory[i].orderDate}</th><th colspan="2">${obj.orderHistory[i].orderCost}</th></tr>
						<tr><th>Description</th><th>Qty</th><th>Price</th><th>Total</th></tr>`;
			
			// add items to order table
			for (let j = 0; j < obj.orderHistory[i].products.length; j++ ) {
				htmlCode += `<tr><td>${obj.orderHistory[i].products[j].description}</td>
							<td>${obj.orderHistory[i].products[j].qty}</td>
							<td>${obj.orderHistory[i].products[j].price}</td>
							<td>${obj.orderHistory[i].products[j].total}</td></tr>`;
			}
			
			// finish the table
			htmlCode += `</table>`;
		}

		// write the table
		orderResult.innerHTML = htmlCode;
	}
}






