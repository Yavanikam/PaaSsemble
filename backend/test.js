const connectDB = require('./config/db');

connectDB().then(() => console.log("Test Successful")).catch(console.error);
