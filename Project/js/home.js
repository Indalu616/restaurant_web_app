
let userData = {};
// toggling mobile menu
let mobile = document.getElementById("mobile");
let links = document.getElementById("links");
mobile.addEventListener("click", () => {
  links.classList.toggle("open");
  console.log("clicked");
});

// opening cart summary functionality

let openCart = document.getElementById("open-cart");
let cartSummary = document.getElementById("cart-summary");
let closeCart = document.getElementById("close-cart");
openCart.addEventListener("click", () => {
  cartSummary.classList.add("open-cart");
  console.log("clicked");
});
closeCart.addEventListener("click", () => {
  cartSummary.classList.remove("open-cart");
});


// javascript code for swiper or product list slider
const swiper = new Swiper(".slider-container", {
  // Optional parameters
  direction: "horizontal",
  slidesPerView: 4,
  spaceBetween: 20,
  centerSlide: "true",
  fade: "true",
  loop: "true",

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: "true",
    dynamicBullets: "true",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    400: {
      slidesPerView: 2,
    },

    520: {
      slidesPerView: 3,
    },
    920: {
      slidesPerView: 4,
    },
  },
});

// custom next and prev button implimentation

let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");

prevBtn.addEventListener("click", () => {
  swiper.slidePrev();
});
nextBtn.addEventListener("click", () => {
  swiper.slideNext();
});

// sliding effect for testimonial section
const testimonialSwiper = new Swiper(".testimonial-container", {
  // Optional parameters
  direction: "horizontal",
  effect: "coverflow",
  slidesPerView: 4,
  spaceBetween: 20,
  centerSlide: "true",
  fade: "true",
  loop: "true",

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: "true",
    dynamicBullets: "true",
  },
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 200,
    modifier: 1.5,
    slideShadows: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    400: {
      slidesPerView: 2,
    },

    520: {
      slidesPerView: 3,
    },
    920: {
      slidesPerView: 4,
    },
  },
});

let prevTestimony = document.getElementById("prevBtn");
let nextTestimony = document.getElementById("nextBtn");

prevTestimony.addEventListener("click", () => {
  testimonialSwiper.slidePrev();
});
nextTestimony.addEventListener("click", () => {
  testimonialSwiper.slideNext();
});

// open login modal functionality
let loginBtn = document.querySelector(".login-btn");
let loginModal = document.querySelector(".login-container");

let closeLogin = document.getElementById("close-login");

loginBtn.addEventListener("click", () => {
  loginModal.classList.add("open-login");
  console.log("clicked");
});
closeLogin.addEventListener("click", () => {
  loginModal.classList.remove("open-login");
  console.log("clicked");
});
// close login modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target == loginModal) {
    loginModal.classList.remove("open-login");
  }
});

// validate user credentials and store them in local storage
// check if user is logged in or not
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let submitBtn = document.getElementById("signin-btn");

function validateUser(event) {
  event.preventDefault();
  // prevent the default action of the form
  let email = emailInput.value;
  let password = passwordInput.value;
  let storedData = JSON.parse(localStorage.getItem("userData"));
  if (storedData == null) {
    alert("No user found, please register first");
    return;
  }
  if (storedData.email == email && storedData.password == password) {
    console.log("Login successful");
    alert("Login successful");
    loginModal.classList.remove("open-login");
    emailInput.value = "";
    passwordInput.value = "";
    loginBtn.classList.add("hidden");
  } else {
    alert("Invalid credentials");
  }
}
submitBtn.addEventListener("click", validateUser);

// open register modal functionality
let registerBtn = document.getElementById("register-btn");
let registerModal = document.querySelector(".register-modal");
let gotoLogin = document.getElementById("reg-login-btn");

registerBtn.addEventListener("click", () => {
  registerModal.classList.add("open-register");
  console.log("clicked");
});
gotoLogin.addEventListener("click", () => {
  registerModal.classList.remove("open-register");
  loginModal.classList.add("open-login");
  console.log("clicked");
});

// register the user and store the data in local storage
let regEmailInput = document.getElementById("userEmail");
let regPasswordInput = document.getElementById("userPassword");
let nameInput = document.getElementById("userName");
let regSubmitBtn = document.getElementById("submit-btn");

regSubmitBtn.addEventListener("click", (event) => {
  console.log("clicked register button");
  event.preventDefault();
  // prevent the default action of the form
  let email = regEmailInput.value;
  let password = regPasswordInput.value;
  let name = nameInput.value;
  userData = { email, password, name };
  localStorage.setItem("userData", JSON.stringify(userData));
  console.log(userData);
  alert("Registration successful");
  registerModal.classList.remove("open-register");
  regEmailInput.value = "";
  regPasswordInput.value = "";
  nameInput.value = "";
  loginModal.classList.add("open-login");
});

// once the user visits the page, check if the user is logged in or not
// if the user is logged in, and clicks on checkout button, redirect to checkout page
let checkoutBtn = document.getElementById("goto-checkout");
// first check there is a cart in the local storage or not
const initApp = () => {
  // check if user is logged in or not
  let storedData = JSON.parse(localStorage.getItem("userData"));
  if (storedData != null) {
    userData = storedData;
    console.log("User is logged in");
    loginBtn.style.display = "none";
    loginBtn.classList.add("hidden");
  } else {
    console.log("User is not logged in");
  }
  // check if there is a cart in the local storage or not
  let cartData = JSON.parse(localStorage.getItem("cart"));
  if (cartData.length <= 0) {
    checkoutBtn.style.pointerEvents = "none";
    checkoutBtn.style.cursor = "no-drop";
    checkoutBtn.style.opacity = "0.5";
  }
};
initApp();

checkoutBtn.addEventListener("click", () => {
  let storedData = JSON.parse(localStorage.getItem("userData"));
  if (storedData != null) {
    window.location.href = "checkout.html";
  } else {
    alert("Please login first");
    loginModal.classList.add("open-login");
  }
});
// update the quantity of the cart items in the cart summary
// a function to increase and decrease the quantity of the product in the cart