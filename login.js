const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  if(email === "" || password === ""){

    alert("Please fill all fields");
    return;
  }

  // Save User Login State

  localStorage.setItem("sneakerUser", JSON.stringify({
    email,
    loggedIn:true
  }));

  alert("Welcome To SneakerHub 👟");

  // Redirect To Homepage

  window.location.href = "../landingWebpage/index.html";

});