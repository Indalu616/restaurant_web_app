// Order page script
// check if the user is logged in before loading the order page
let user = JSON.parse(localStorage.getItem("userData"));

function checkUserLoggedIn() {
  if (!user) {
    window.location.href = "homePage.html";
    // redirect to login page
  }
}
checkUserLoggedIn();

// load order summary from the local storage
let orderSummaryContainer = document.querySelector(".order-container");
let noOrderContainer = document.querySelector(".no-order");
const loadOrderSummary = () => {
  let orderSummary = JSON.parse(localStorage.getItem("order"));
  console.log(orderSummary);
  // check if the order summary is not empty
  if (orderSummary) {
    orderSummary.forEach((order) => {
      console.log(order);
      order.orderedItems.forEach((orderedItem) => {
        let orderItem = document.createElement("div");

        orderItem.classList.add("order-card");
        orderItem.innerHTML = `
                      <div class="order-card-header">
                      <h3>Order ID: ${order.orderInfo.orderId}</h3>
                      <h3>Order Status: ${order.orderInfo.orderStatus}</h3>
                    </div>
                    <div class="order-card-body">
                      <div class="order-card-item">
                        <img src="${orderedItem.product.image}" alt="food" />
                        <div class="item-details">
                          <h4>${orderedItem.product.name}</h4>
                          <p>Quantity: ${orderedItem.quantity}</p>
                          <p>Total price: $${
                            orderedItem.product.price * orderedItem.quantity
                          }</p>
                        </div>
                      </div>
                    </div>
                      `;
        // Append the order item to the order summary container
        orderSummaryContainer.appendChild(orderItem);
      });
    });
  } else {
    // If there are no orders, show the no order message
    noOrderContainer.style.display = "block"; // Show the no order message
  }
};
loadOrderSummary();
