document.addEventListener('DOMContentLoaded', function () {
  const paymentMethod = document.getElementById('payment-method');
  const upiDetails = document.getElementById('upi-details');
  const upiIdInput = document.getElementById('upi-id');
  const amountInput = document.getElementById('amount');
  const qrCodeContainer = document.getElementById('qr-code-container');
  const qrCodeImg = document.getElementById('upi-qr-code');
  const paymentStatusDiv = document.createElement('div');
  paymentStatusDiv.id = 'payment-status';
  paymentStatusDiv.innerText = 'Payment Status: pending';
  
  // Check if payment status div exists, if not append it
  if (!document.getElementById('payment-status')) {
    document.querySelector('.payment-container').appendChild(paymentStatusDiv);
  }

  const upiId = 'mashritha4@okaxis'; // Pre-filled UPI ID
  const amount = 10; // Pre-filled amount

  // Show UPI input field when UPI is selected as payment method
  if (paymentMethod && upiDetails) {
    paymentMethod.addEventListener('change', function () {
      handlePaymentMethodChange(paymentMethod.value);
    });
  }

  function handlePaymentMethodChange(method) {
    if (method === 'upi') {
      showUPIDetails();
      generateQRCode(); // Generate the QR code when UPI is selected
    } else if (method === 'cash') {
      alert('You have selected Cash. Please proceed to the cashier.');
      hideUPIDetails();
    } else {
      hideUPIDetails();
    }
  }

  function showUPIDetails() {
    upiDetails.style.display = 'block';
    paymentStatusDiv.innerText = 'Payment Status: pending';
  }

  function hideUPIDetails() {
    upiDetails.style.display = 'none';
    qrCodeContainer.style.display = 'none';
    paymentStatusDiv.innerText = '';
    resetUPIInputs();
  }

  function resetUPIInputs() {
    upiIdInput.value = '';
  }

  let paymentId = ''; // Store the payment ID

  // Function to generate QR code
  function generateQRCode() {
    const paymentDetails = {
      upiId: upiId,
      amount: amount,
      paymentMethod: 'UPI',   // Include paymentMethod in the request
      paymentStatus: 'success'  // Set payment status to 'pending' initially
    };

    fetch('http://localhost:5000/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethod: 'UPI',
        upiId: 'mashritha4@okaxis',
        amount: 10
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const qrCodeImage = document.getElementById('upi-qr-code');
        qrCodeImage.src = data.data.qrCode; // Display the QR code from the response
        document.getElementById('qr-code-container').style.display = 'block'; // Show QR code container
        paymentId = data.data.paymentId;
        startPolling(paymentId);  // Start polling for payment status
      } else {
        alert('Error generating QR code.');
      }
    })
    .catch(error => {
      console.error('Error generating QR code:', error);
      alert('An error occurred while generating the QR code.');
    });
  }

  // Polling function
  function startPolling(paymentId) {
    const interval = setInterval(() => {
      checkPaymentStatus(paymentId, interval);
    }, 5000); // Poll every 5 seconds
  }

  // Function to check payment status periodically
  function checkPaymentStatus(paymentId, interval) {
    fetch(`http://localhost:5000/api/payment-status/${paymentId}`)
      .then(response => response.json())
      .then(data => {
        const paymentStatusElement = document.getElementById('payment-status');
        if (data.paymentStatus === 'success') {
          paymentStatusElement.innerText = 'Payment Successful!';
          paymentStatusElement.style.color = '#27ae60'; // Green for success
          clearInterval(interval); // Stop polling after success
        //} else if (data.paymentStatus === 'failed') {
          //paymentStatusElement.innerText = 'Payment Failed!';
          //paymentStatusElement.style.color = '#e74c3c'; // Red for failure
          //clearInterval(interval); // Stop polling after failure
       // } else {
          //paymentStatusElement.innerText = 'Payment Pending...';
          //paymentStatusElement.style.color = '#f1c40f'; // Yellow for pending
        }
      //})
     // .catch(error => {
        //console.error('Error checking payment status:', error);
        //clearInterval(interval); // Stop polling on error
      });
 }
});
