const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Registration = require('../models/Registration'); // Assuming you have a Registration model
const QRCode = require('qrcode');

// Route to handle payment creation and QR code generation
router.post('/api/payments', async (req, res) => {
  const { paymentMethod, upiId, amount } = req.body;

  try {
    // Validate the payment method and amount
    if (!paymentMethod || !['UPI', 'Cash'].includes(paymentMethod)) {
      return res.status(400).json({ success: false, message: 'Invalid payment method' });
    }
    if (paymentMethod === 'UPI' && (!upiId || !/^[\w.-]+@[\w]+$/.test(upiId))) {
      return res.status(400).json({ success: false, message: 'Invalid UPI ID' });
    }
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    // Simulating QR code generation and saving the payment
    const upiString = `upi://pay?pa=${upiId}&am=${amount}&cu=INR`;
    const qrCode = await QRCode.toDataURL(upiString);
    const registrationId = '64a8f1e2c32b27e85e4eab6f'; // Placeholder registration ID

    // Save payment to the database
    const payment = new Payment({
      registrationId, 
      paymentMethod, 
      amount, 
      upiId, 
      qrCode, 
      paymentStatus: 'success',
    });

    const savedPayment = await payment.save();

    // Send response with payment data and QR code
    res.status(201).json({
      success: true,
      message: 'Payment processed successfully',
      data: {
        registrationId,
        paymentMethod,
        amount,
        upiId,
        qrCode // This contains the base64-encoded QR code
      }
    });
  } catch (error) {
    console.error('Error processing payment:', error.message || error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Route to confirm the payment (update the payment status after confirmation)
router.post('/api/payments/confirm', async (req, res) => {
  try {
    const { registrationId, paymentStatus } = req.body;

    // Validate input
    if (!paymentStatus || !['success', 'failed'].includes(paymentStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid payment status' });
    }

    // Find the existing payment record
    const payment = await Payment.findOne({ registrationId });

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    // Update the payment status
    payment.paymentStatus = paymentStatus;
    await payment.save();

    res.status(201).json({
      success: true,
      message: `Payment ${paymentStatus} and saved successfully`,
      data: payment,
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Route to simulate checking payment status
router.get('/api/payment-status/:paymentId', async (req, res) => {
  const { paymentId } = req.params;

  // Simulate a payment status check
  const payment = await Payment.findById(paymentId);

  if (payment) {
    res.json({ paymentStatus: payment.paymentStatus });
  } else {
    res.json({ paymentStatus: 'failed' });
  }
});

module.exports = router;

