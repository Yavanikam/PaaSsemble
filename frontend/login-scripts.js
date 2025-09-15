// Toggle between login and signup forms
document.getElementById("loginBtn").addEventListener("click", function () {
  document.getElementById("loginForm").classList.add("active");
  document.getElementById("signupForm").classList.remove("active");
  this.classList.add("active");
  document.getElementById("signupBtn").classList.remove("active");
});

document.getElementById("signupBtn").addEventListener("click", function () {
  document.getElementById("signupForm").classList.add("active");
  document.getElementById("loginForm").classList.remove("active");
  this.classList.add("active");
  document.getElementById("loginBtn").classList.remove("active");
});

// Show signup form from the message link
document.getElementById("showSignup").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("signupForm").classList.add("active");
  document.getElementById("loginForm").classList.remove("active");
  document.getElementById("signupBtn").classList.add("active");
  document.getElementById("loginBtn").classList.remove("active");
});

// Show login form from the message link
document.getElementById("showLogin").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("loginForm").classList.add("active");
  document.getElementById("signupForm").classList.remove("active");
  document.getElementById("loginBtn").classList.add("active");
  document.getElementById("signupBtn").classList.remove("active");
});

// Handle Signup Form Submission
document
  .getElementById("signupForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const response = await fetch("http://localhost:5000/api/auth/register", {
      // Corrected URL to /api/signup
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    // if (response.status === 201) can also be used as alternative
    if (data.message === "User registered successfully") {
      alert("Signup successful!");
      // Optionally, you can auto-login the user after signup by calling login API
    } else {
      alert("Signup failed: " + data.message);
    }
  });

// Handle Login Form Submission
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("http://localhost:5000/api/auth/login", {
      // Corrected URL to /api/login
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      // Store the JWT token in localStorage for later use
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      window.location.href = "home-index.html"; // Redirect to your dashboard or home page
    } else {
      alert("Login failed: " + data.message);
    }
  });
