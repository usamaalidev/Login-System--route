// Selecting form Inputs
const firstName = document.querySelector(".first-name input");
const lastName = document.querySelector(".last-name input");
const emailInput = document.querySelector(".email input");
const passwordInput = document.querySelector(".password-input input");

// Reqular Expressions for Form validation
const regexName = /^\w{3,}$/;
const regexEmail = /^[a-zA-Z0-9\.]{3,}@\w{2,}\.com$/;
const regexPass = /^\S{8,}$/;
const eyeIcon = document.querySelector(".show-hide-password");
const newAccountBtn = document.querySelector(".btn-new-account");

const haveAccountBtn = document.getElementById("haveAccount");
const loginSuccessBox = document.querySelector(".login-success");
const loginBtnSuccessBox = document.querySelector(
  ".login-success .btn-sign-in"
);
const loginFailedBox = document.querySelector(".login-failed");
const tryAgainBtn = document.querySelector(".login-failed .btn-sign-in");

const signInBtn = document.querySelector(".login-buttons .btn-sign-in");
const welcomeMessage = document.querySelector(".welcome");
const logOutBtn = document.querySelector(".btn-logout");

let users = [];

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}

// Declaring Functions

function validate(element, regex) {
  let hint = element.parentElement.nextElementSibling;
  if (regex.test(element.value)) {
    hint.classList.remove("visible");
    hint.classList.add("invisible");
  } else {
    hint.classList.remove("invisible");
    hint.classList.add("visible");
  }

  return regex.test(element.value);
}

function showPassword() {
  if (eyeIcon.classList.contains("fa-eye")) {
    passwordInput.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else if (eyeIcon.classList.contains("fa-eye-slash")) {
    passwordInput.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
}

function emptyInputFields() {
  firstName.value = "";
  lastName.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}

// Form Validation
if (location.pathname == "/sign-up.html") {
  firstName.addEventListener("blur", function () {
    validate(firstName, regexName);
  });

  lastName.addEventListener("blur", function () {
    validate(lastName, regexName);
  });

  emailInput.addEventListener("blur", function () {
    validate(emailInput, regexEmail);
  });
  passwordInput.addEventListener("blur", function () {
    validate(passwordInput, regexPass);
  });
}

if (
  location.pathname == "/sign-up.html" ||
  location.pathname == "/index.html"
) {
  passwordInput.addEventListener("input", function () {
    if (passwordInput.value.length > 4) {
      eyeIcon.classList.remove("d-none");
    }
  });

  passwordInput.addEventListener("blur", function () {
    if (passwordInput.value != "") {
      eyeIcon.classList.remove("d-none");
    } else if (passwordInput.value == "") {
      eyeIcon.classList.add("d-none");
    }
  });
  // Show Password By Clicking on eye icon
  eyeIcon.addEventListener("click", showPassword);
  newAccountBtn.addEventListener("click", createAccount);
}

// Create a new account
function createAccount() {
  let page = location.pathname;
  if (page == "/index.html") {
    location.pathname = "/sign-up.html";
  } else if (page == "/sign-up.html") {
    if (
      validate(firstName, regexName) &&
      validate(lastName, regexName) &&
      validate(emailInput, regexEmail) &&
      validate(passwordInput, regexPass)
    ) {
      const user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: emailInput.value,
        password: passwordInput.value,
      };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      loginSuccessBox.classList.remove("d-none");
      emptyInputFields();
    }
  }
}

if (location.pathname == "/sign-up.html") {
  loginBtnSuccessBox.addEventListener("click", function () {
    location.pathname = "/index.html";
  });

  haveAccountBtn.addEventListener("click", function () {
    location.pathname = "/index.html";
  });
}

function closeLoginSuccessBox() {
  loginSuccessBox.classList.add("d-none");
}

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeLoginSuccessBox();
  }
});

// Sign in Page
function signIn() {
  let userFound = false;
  if (location.pathname == "/index.html" || location.pathname == "/") {
    for (let i = 0; i < users.length; i++) {
      if (
        emailInput.value == users[i].email &&
        passwordInput.value == users[i].password
      ) {
        userFound = true;
        sessionStorage.setItem("currentUser", JSON.stringify(users[i]));
        location.pathname = "/home.html";
      }
    }
    if (userFound == false) {
      loginFailedBox.classList.remove("d-none");
    }
  }
}

if (location.pathname == "/index.html" || location.pathname == "/") {
  signInBtn.addEventListener("click", signIn);
  tryAgainBtn.addEventListener("click", function () {
    loginFailedBox.classList.add("d-none");
  });
}

if (location.pathname == "/home.html") {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  console.log(currentUser);
  welcomeMessage.innerHTML = `
  <h2 class="mb-4">${currentUser.firstName} ${currentUser.lastName}</h2>
  <ul class="user-data list-unstyled text-start mx-auto d-flex flex-column gap-2">
          <li class="fs-5"><i class="fa-solid fa-user me-2 fa-fw"></i>Full Name: <span> ${currentUser.firstName} ${currentUser.lastName}</span></li>
          <li class="fs-5"><i class="fa-solid fa-envelope me-2 fa-fw"></i>Email Address: <span>${currentUser.email}</span></li>
          <li class="fs-5"><i class="fa-solid fa-lock me-2 fa-fw"></i>Your Password: <span>${currentUser.password}</span></li>
        </ul>
  `;

  logOutBtn.addEventListener("click", function () {
    location.pathname = "/index.html";
  });
}
