// get order summary container from the DOM
let orderSummaryContainer = document.querySelector(".order-summary-list");
let totalPriceContainer = document.getElementById("total-amount");
// load order summary from the local storage

const loadOrderSummary = () => {
  let totalPrice = 0;
  orderSummaryContainer.innerHTML = ""; // Clear the container before loading new items
  let orderSummary = JSON.parse(localStorage.getItem("cart"));
  // check if the user has logged in
  let user = JSON.parse(localStorage.getItem("userData"));
  if (!user) {
    window.location.href = "homePage.html";
    // redirect to login page
  }
  // check if the order summary is not empty
  if (orderSummary) {
    console.log("orderSummary", orderSummary);
    orderSummary.forEach((order) => {
      totalPrice += order.product.price * order.quantity;
      let orderItem = document.createElement("li");
      orderItem.classList.add("order-item");
      orderItem.innerHTML = `
           <span class="item-image"><img src="${
             order.product.image
           }" alt=""></span>
              <span class="item-name">${order.product.name}</span>
              <span class="item-quantity">${order.quantity}</span>
              <span class="item-price">${
                order.product.price * order.quantity
              }</span>
        `;
      orderSummaryContainer.appendChild(orderItem);
    });
    totalPriceContainer.innerHTML = `$${totalPrice}`;
  } else {
    // redirect to homepage.html
    window.location.href = "homepage.html";
  }
};
loadOrderSummary();

// once the user clicks on the complete order button:
// 1.store the order information in the local storage
let userNameInput = document.getElementById("name");
let userEmailInput = document.getElementById("email");
let userPhoneInput = document.getElementById("phone");
let userAddressInput = document.getElementById("address");
let userCityInput = document.getElementById("city");
let userCountryInput = document.getElementById("country");
let userZipCodeInput = document.getElementById("postal-code");
let userPaymentMethodInput = document.getElementById("payment-method");
let userOrderNotesInput = document.getElementById("order-notes");
// get the complete order button from the DOM
// let completeOrderButton = document.querySelector("checkout-btn");
let completeOrderButton = document.getElementById("check-out-order-btn");
// add event listener to the complete order button
completeOrderButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  console.log("complete order button clicked");
  let orderedItems = JSON.parse(localStorage.getItem("cart"));
  let userName = userNameInput.value;
  let userEmail = userEmailInput.value;
  let userPhone = userPhoneInput.value;
  let userAddress = userAddressInput.value;
  let userCity = userCityInput.value;
  let userCountry = userCountryInput.value;
  let userZipCode = userZipCodeInput.value;
  let userPaymentMethod = userPaymentMethodInput.value;
  let userOrderNotes = userOrderNotesInput.value;
  // check if the user has filled all the fields
  if (
    !userName ||
    !userEmail ||
    !userPhone ||
    !userAddress ||
    !userCity ||
    !userCountry ||
    !userZipCode ||
    !userPaymentMethod
  ) {
    alert("Please fill all the fields before placing an order.");
    return;
  }
  // now store user order information in the local storage
  // generate a unique order ID
  let orderId = Math.floor(Math.random() * 1000000);

  let orderInfo = {
    name: userName,
    email: userEmail,
    phone: userPhone,
    address: userAddress,
    city: userCity,
    country: userCountry,
    postalCode: userZipCode,
    paymentMethod: userPaymentMethod,
    orderNotes: userOrderNotes,
    orderId: orderId,
    orderStatus: "Ordered",
  };
  if (orderedItems && orderInfo) {
    let orderSummary = {
      orderInfo: orderInfo,
      orderedItems: orderedItems,
    };
    // create an array of ordered items and store it in the local storage
    let orderSummaryArray = JSON.parse(localStorage.getItem("order")) || [];
    orderSummaryArray.push(orderSummary);

    localStorage.setItem("order", JSON.stringify(orderSummaryArray));
    // 2.remove the cart from the local storage
    localStorage.removeItem("cart");
    // 3.redirect the user to the order page
    window.location.href = "order.html";
  } else {
    alert("Please add items to the cart before placing an order.");
  }
});
