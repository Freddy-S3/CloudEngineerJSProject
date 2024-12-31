const express = require('express');
const { loadExchangeRates } = require('./csvParser');
const handleResponse = require('./responseHandler');

const app = express();
app.use(express.json());

// Load the exchange rates into memory when the server starts
loadExchangeRates().then(() => {
    console.log('Exchange rates loaded successfully.');
  }).catch((err) => {
    console.error(err);
  });
  

// Define endpoint, using GET
app.get('/', handleResponse);


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});