// let signup = document.querySelector("#btnSignup");
let signupFormDiv = document.querySelector("#signup-form");
let loginFormDiv = document.querySelector("#login-form");


function showSignUp(){
  console.log("SignUp bnt clicked.....");
  signupFormDiv.classList.remove("signup-form");
  loginFormDiv.classList.add("hideForm");
  signupFormDiv.classList.add("show-signup");
}

function showLogin(){
  console.log("login bnt clicked.....");
  signupFormDiv.classList.add("hideForm");
  signupFormDiv.classList.remove("show-signup");
  loginFormDiv.classList.add("show-signup");
}