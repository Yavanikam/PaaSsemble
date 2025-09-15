const mongoose = require('mongoose');
const QRCode = require('qrcode'); // Library for generating QR codes

const paymentSchema = new mongoose.Schema({
  registrationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
  },
  paymentMethod: { type: String, enum: ['UPI', 'Cash'], required: true },
  amount: { type: Number, required: true, min: 1 }, // Amount must be a positive number
  upiId: { type: String, required: true },
  qrCode: { type: String }, // For storing generated QR code
  paymentDate: { type: Date, default: Date.now }, // Timestamp for payment
  paymentStatus: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' }, // Payment status field
});
// Middleware: Generate QR Code for UPI payments
paymentSchema.pre('save', async function (next) {
  try {
    if (this.paymentMethod === 'UPI') {
       //Create a dynamic UPI string (Replace YOUR_UPI_ID with an actual UPI ID)
      const upiString = `upi://pay?pa=mashritha4@okaxis&am=10.00&cu=INR`;
      this.qrCode = await QRCode.toDataURL(upiString);
    } else {
      this.qrCode = null; // No QR code for Cash payments
    }
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware or the save process
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
