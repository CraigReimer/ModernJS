"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Chapter case

      Order Form Code
      Author: Craig Reimer
      Date:   9-26-23

      Filename: js06a.js
 */

window.addEventListener("load", function(){
      let orderForm = document.forms.orderForm;
      let model = orderForm.elements.model;

      // select model selection list when form opens
      model.focus();

      // add an event listener for every form element
      for (let i = 0; i < orderForm.elements.length; i++) {
            orderForm.elements[i].addEventListener("change", calcOrder);
      }

      // calculate cost of order
      calcOrder();

      function calcOrder() {
            // determine selected model
            let modelIndex = model.selectedIndex;
            let modelValue = model.options[modelIndex].value;

            // determine selected quantity
            let qtyIndex = orderForm.elements.qty.selectedIndex;
            let quantity = orderForm.elements.qty[qtyIndex].value;

            // calculate cost
            let modelCost = modelValue * quantity;
            orderForm.elements.modelCost.value = modelCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

            // retrieve cost of protection plan
            let planValue = document.querySelector("input[name='plan']:checked").value;

            // charge the plan to each item ordered
            let planCost = planValue * quantity;
            orderForm.elements.planCost.value = planCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

            // calculate subtotal
            let subtotal = modelCost + planCost;
            orderForm.elements.subtotal.value = subtotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

            // calculate tax
            let salesTax = subtotal * 0.05;
            orderForm.elements.salesTax.value = salesTax.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

            // calculate total
            let totalCost = subtotal + salesTax;
            orderForm.elements.totalCost.value = totalCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

            orderForm.elements.modelName.value = model.options[modelIndex].text;
            let selectedPlan = document.querySelector("input[name='plan']:checked");
            orderForm.elements.planName.value = selectedPlan.labels[0].textContent;
      }
});



