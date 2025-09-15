document.getElementById('registrationForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Collect form data
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const contactNumber = document.getElementById('contactNumber').value;
  const eventSelected = document.getElementById('event').value;

  // Validate that all fields are filled
  if (!fullName || !email || !contactNumber || !eventSelected) {
    alert('Please fill in all fields.');
    return;
  }

  // Send form data to the backend
  try {
    const response = await fetch('http://127.0.0.1:5000/api/events/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        email,
        contactNumber,
        event: eventSelected,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Registration successful:', data);
      // Save the registration ID for later use
      sessionStorage.setItem('registrationId', data.registrationId);
      
      // Simulate redirection to a payment page
      alert('Form submitted successfully! Redirecting to payment...');
      window.location.href = 'payment.html'; // Ensure this page exists
    } else {
      alert(`Error: ${data.message || 'Something went wrong. Please try again.'}`);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('There was an error processing your registration. Please try again.');
  }
});
