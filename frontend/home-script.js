const backendURL = "https://paassembles.onrender.com"; // Update to your actual backend URL

document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      } else {
        console.warn(`Target section '${targetId}' not found.`);
      }
    });
  });

  // Fetch data from the backend
  fetch(`${backendURL}/api/events`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Data from backend:", data);
      // Use this data to update your frontend
    })
    .catch(error => {
      console.error("Error connecting to backend:", error);
      alert("Unable to fetch event data. Please try again later.");
    });
});
