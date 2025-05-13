let mainDishContainer = document.querySelector(".main-dishes");
let drinksContainer = document.querySelector(".drink-container");
let coffeeContainer = document.querySelector(".coffee-container");
let productPriceInCart = document.querySelector(".product_price");
let produtQuantity = document.querySelector(".product-_quantity");
let cartTotal = document.getElementById("cart_total");
let cartContainer = document.querySelector(".cart-container"); //cart container where products added to cart will display
let coffeeList = []; //array to store coffee that is fetched from json (coffee.json)
let drinkList = []; //array to store drinks
let mainDishList = []; //list to store the main dishes
let carts = []; //stores all products selected by the user

let checkOutButton = document.getElementById("goto-checkout");
checkOutButton.addEventListener("click", () => {
  let storedData = JSON.parse(localStorage.getItem("userData"));
  // check if cart is empty or not
  let cartData = JSON.parse(localStorage.getItem("cart"));
  if (storedData != null ) {
    window.location.href = "checkout.html";
  } else {
    alert("Please login first");
    window.location.href = "homePage.html";
    // loginModal.classList.add("open-login");
  }
});

// a function that displays items in the cart

function displayCartItems() {
  if (cartContainer) {
    cartContainer.innerHTML = ""; //clear the cart container before displaying the items
  }

  if (carts.length > 0) {
    checkOutButton.style.pointerEvents = "auto"; //enable the checkout button if there is a cart in the local storage
    checkOutButton.style.cursor = "pointer"; //change the cursor to pointer
    checkOutButton.style.opacity = "1"; //change the opacity of the checkout button to 1
    carts
      .filter((cart) => cart.quantity > 0)
      .forEach((cart) => {
        let cartItem = document.createElement("li");
        cartItem.innerHTML = `
            <div class="product-image">
              <img src="${cart.product.image}" alt="" />
            </div>
            <div class="product-name">
              <p>${cart.product.name}</p>
              <p class="product_price">$${
                cart.product.price * cart.quantity
              }</p>
            </div>
            <div class="action-btns">
              <button data-id="${
                cart.product_id
              }" data-action="increase" data-category="${
          cart.category
        }">+</button>
              <p class="product_quantity">${cart.quantity}</p>
              <button data-id="${
                cart.product_id
              }" data-action="decrease" data-category="${
          cart.category
        }">-</button>
            </div>
            `;
        cartContainer.appendChild(cartItem); //append the cart item to the cart container
      });
  } else {
    let emptyCart = document.createElement("div"); //create a div to display empty cart message
    emptyCart.classList.add("empty-cart"); //add class to the empty cart div
    emptyCart.innerHTML = `
        <div class="empty-cart">
        <h1>Your cart is empty</h1>
        <p>Looks like you haven't added anything to your cart yet.</p>
         <img src="../assets/emptyCart/empty_cart.png" alt="empty cart" />
        </div>
      `; //add the empty cart message to the div
    cartContainer.appendChild(emptyCart); //append the empty cart message to the cart container
  }
}
displayCartItems(); //call the function to display the items in the cart
//add event listener to the cart container to increase and decrease the quantity of the product in the cart

function calculateItemsInCart() {
  let total = 0; //initialize total to 0
  carts.forEach((cart) => {
    total += cart.quantity; //add the quantity of each product to the total
  });
  cartTotal.innerHTML = total; //display the number of items in the cart
}
calculateItemsInCart(); //call the function to display the number of items in the cart
// a function that displays product list on the webpage

function displayProduct() {
  mainDishContainer.innerHTML = "";
  if (mainDishList.length > 0) {
    mainDishList.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("slide");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
            <div class="img-container">
            <img src="${product.image}" alt="Kitfo" />
          </div>
          <div class="slide-text">
            <div class="product-info">
              <p class="product_name">${product.name}</p>
              <div class="price">$${product.price}</div>
            </div>
            <p>
              ${product.description}
            </p>
            <div class="card-footer">
          <p> ${Array.from({ length: product.rating }, (_, i) => "✰").join(
            ""
          )}</p>
              <button class="addCart" data-id="${
                product.id
              }">ADD TO CART</button>
            </div>
          </div>
            `;
      mainDishContainer.appendChild(newProduct);
    });
  }
}

// a function to fetch main dish foods when user visits menu page
function loadMainDishes() {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      mainDishList = data;
      displayProduct(); // a function to display the product on the website
    });

  if (localStorage.getItem("cart")) {
    carts = JSON.parse(localStorage.getItem("cart")); //get the cart from local storage
    // check if there is a cart in the local storage or not
    if(carts.length <=0 || carts == null){
      checkOutButton.style.pointerEvents = "none"; //disable the checkout button if there is no cart in the local storage
      checkOutButton.style.cursor = "no-drop"; //change the cursor to no-drop
      checkOutButton.style.opacity = "0.5"; //change the opacity of the checkout button to 0.5
     }

    displayCartItems(); //call the function to display the items in the cart
    calculateItemsInCart(); //call the function to display the number of items in the cart
  }
}
loadMainDishes();

//function to display drinks
function displayDrinks() {
  drinksContainer.innerHTML = "";
  if (drinkList.length > 0) {
    drinkList.forEach((product) => {
      let newDrink = document.createElement("div");
      newDrink.classList.add("slide");
      newDrink.dataset.id = product.id;
      newDrink.innerHTML = `
            <div class="img-container">
            <img src="${product.image}" alt="Kitfo" />
          </div>
          <div class="slide-text">
            <div class="product-info">
              <p class="product_name">${product.name}</p>
              <div class="price">$${product.price}</div>
            </div>
            <p>
              ${product.description}
            </p>
            <div class="card-footer">
           <p> ${Array.from({ length: product.rating }, (_, i) => "✰").join(
             ""
           )}</p>
              <button class="addCart" data-id="${
                product.id
              }">ADD TO CART</button>
            </div>
          </div>
              `;
      drinksContainer.appendChild(newDrink);
    });
  }
}
// a function to fetch drinks when user visits menu page
function loadDrinks() {
  fetch("drinks.json")
    .then((response) => response.json())
    .then((data) => {
      drinkList = data;
      console.log(data);
      displayDrinks(); // a function to display the drinks on the website
    });
  if (localStorage.getItem("cart")) {
    carts = JSON.parse(localStorage.getItem("cart")); //get the cart from local storage
    displayCartItems(); //call the function to display the items in the cart
    calculateItemsInCart(); //call the function to display the number of items in the cart
  }
}
loadDrinks();

//  a function that displays coffee on the web page

function displayCoffee() {
  coffeeContainer.innerHTML = "";
  if (coffeeList.length > 0) {
    coffeeList.forEach((coffee) => {
      let newCoffee = document.createElement("div");
      newCoffee.classList.add("slide");
      newCoffee.dataset.id = coffee.id;
      newCoffee.innerHTML = `
       <div class="img-container">
            <img src="${coffee.image}" alt="Kitfo" />
          </div>
          <div class="slide-text">
            <div class="product-info">
              <p class="product_name">${coffee.name}</p>
              <div class="price">$${coffee.price}</div>
            </div>
            <p>
             ${coffee.description}
            </p>
            <div class="card-footer">
              <p> ${Array.from({ length: coffee.rating }, (_, i) => "✰").join(
                ""
              )}</p>
              <button class="addCart" data-id="${
                coffee.id
              }">ADD TO CART</button>
            </div>
          </div>
      `;
      coffeeContainer.appendChild(newCoffee);
    });
  }
}

// a function to fetch coffee when user visits menu page
function loadCoffee() {
  fetch("coffee.json")
    .then((response) => response.json())
    .then((data) => {
      coffeeList = data;
      console.log(data);
      displayCoffee(); // a function to display the coffee on the website
    });
  if (localStorage.getItem("cart")) {
    carts = JSON.parse(localStorage.getItem("cart")); //get the cart from local storage
    displayCartItems();
    //call the function to display the items in the cart
    calculateItemsInCart(); //call the function to display the number of items in the cart
  }
}
loadCoffee();

// a function to save the cart to local storage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(carts)); //save the cart to local storage
}

// a function that adds products to the cart

function addToCart(product_id, product_category, category) {
  // find the product inside the product_category
  console.log(product_category);
  let product_idx = product_category.findIndex((prod) => prod.id == product_id);
  if (carts.length <= 0) {
    carts = [
      {
        category: category,
        quantity: 1,
        product: product_category[product_idx],
        product_id: product_id,
      },
    ];
  } else {
    // check if the product is already added before
    let prodIdx = carts.findIndex(
      (prod) => prod.category == category && prod.product_id == product_id
    );
    // if the product is already in the cart, the index will be returned, otherwise
    // it returns -1
    if (prodIdx != -1) {
      carts[prodIdx].quantity = carts[prodIdx].quantity + 1;
    } else {
      carts.push({
        category: category,
        quantity: 1,
        product: product_category[product_idx],
        product_id: product_id,
      });
    }
  }
  calculateItemsInCart(); // call the function to display the number of items in the cart
  displayCartItems(); // call the function to display the items in the cart
  saveCartToLocalStorage(); // call the function to save the cart to local storage
  console.log(carts);
}

// addto cart functionality for food product
mainDishContainer.addEventListener("click", (event) => {
  console.log("clicked");
  let targetPosition = event.target;
  if (targetPosition.classList.contains("addCart")) {
    console.log(targetPosition.parentElement);
    let product_id = targetPosition.dataset.id;
    addToCart(product_id, mainDishList, "foods");
  }
});

// addto cart functionality for drinks
drinksContainer.addEventListener("click", (event) => {
  console.log("clicked");
  let targetPosition = event.target;
  if (targetPosition.classList.contains("addCart")) {
    console.log(targetPosition.parentElement);
    let product_id = targetPosition.dataset.id;

    addToCart(product_id, drinkList, "drinks");
  }
});
// addto cart functionality for coffee
coffeeContainer.addEventListener("click", (event) => {
  console.log("clicked");
  let targetPosition = event.target;
  if (targetPosition.classList.contains("addCart")) {
    console.log(targetPosition.parentElement);
    let product_id = targetPosition.dataset.id;

    addToCart(product_id, coffeeList, "coffee");
  }
});

// a function to increase and decrease the quantity of the product in the cart
function updateCartQuantity(product_id, category, action) {
  let prodIdx = carts.findIndex(
    (prod) => prod.category == category && prod.product_id == product_id
  );
  if (action == "increase") {
    carts[prodIdx].quantity = carts[prodIdx].quantity + 1;
  } else if (action == "decrease") {
    carts[prodIdx].quantity = carts[prodIdx].quantity - 1;
  }
  if (carts[prodIdx].quantity <= 0) {
    carts.splice(prodIdx, 1);
  }
  if (carts.length <= 0) {
    checkOutButton.style.pointerEvents = "none"; //disable the checkout button if there is no cart in the local storage
    checkOutButton.style.cursor = "no-drop"; //change the cursor to no-drop
    checkOutButton.style.opacity = "0.5"; //change the opacity of the checkout button to 0.5
  }
  calculateItemsInCart(); // call the function to display the number of items in the cart
  displayCartItems(); // call the function to display the items in the cart
  saveCartToLocalStorage(); // call the function to save the cart to local storage
}

// cart container event listener to increase and decrease the quantity of the product in the cart
cartContainer.addEventListener("click", (event) => {
  console.log("clicked");
  let targetPosition = event.target;
  if (targetPosition.tagName == "BUTTON") {
    let product_id = targetPosition.dataset.id;
    let action = targetPosition.dataset.action;
    let category = targetPosition.dataset.category;
    if (action == "increase") {
      updateCartQuantity(product_id, category, "increase");
    } else if (action == "decrease") {
      updateCartQuantity(product_id, category, "decrease");
    }
  }
}); // end of cart container event listener

// swiper for testimonials in the menu page

const menuSwiper = new Swiper(".menu-testimonial", {
  // Optional parameters
  direction: "horizontal",
  spaceBetween: 30,
  slidesPerView: 1,
  loop: true,
  centerSlide: true,
  fade: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
}); // end of swiper for testimonials in the menu page
// swiper for menu page

let prevTestimonialBtn = document.getElementById("prev-testimonial");
let nextTestimonialBtn = document.getElementById("next-testimonial");

prevTestimonialBtn.addEventListener("click", () => {
  menuSwiper.slidePrev();
  console.log("CLICKED PREV TESTIMONIAL BUTTON");
});
nextTestimonialBtn.addEventListener("click", () => {
  menuSwiper.slideNext();
  console.log("clicked next testimonial button");
});
