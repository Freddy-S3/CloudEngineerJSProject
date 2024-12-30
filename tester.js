// Stub 1: csvParser.js
const csv = require('jquery-csv');
const fs = require('fs');

// Path to the CSV file
const filePath = './exchange_rates.csv';

// Function to load and parse CSV data
let exchangeRates = [];
function loadExchangeRates() {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, fileData) => {
      if (err) {
        return reject('Error reading the file:', err);
      }

      // Remove BOM if it exists
      const cleanData = fileData.replace(/^\uFEFF/, '');

      // Configure parser options
      const options = {
        separator: ',',
        delimiter: '"',
        skipEmptyLines: true,
        trim: true
      };

      try {
        // Parse CSV data to objects
        const parsedData = csv.toObjects(cleanData, options);
        exchangeRates = parsedData.map((row) => ({
          date: row.REF_DATE,
          currency: row['Type of currency'],
          rate: parseFloat(row.VALUE)
        }));
        resolve(exchangeRates);
      } catch (parseError) {
        reject('Error parsing CSV:', parseError.message);
      }
    });
  });
}

// Function to get exchange rate by date and currency
function getExchangeRate(date, currency) {
  const rate = exchangeRates.find(
    (row) => row.date === date && row.currency === currency
  );
  return rate ? rate.rate : null;
}

// Stub 2: APIEndpoint.js
const express = require('express');
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Load the exchange rates into memory when the server starts
loadExchangeRates().then(() => {
  console.log('Exchange rates loaded successfully.');
}).catch((err) => {
  console.error(err);
});

// Define the endpoint
app.get('/convert', (req, res) => {
  const { date, currency, amount_in_cad } = req.body;

  // Validation for required parameters
  if (!date || !currency || typeof amount_in_cad !== 'number') {
    return res.status(400).send({
      error: 'Missing or invalid parameters. Ensure "date", "currency", and "amount_in_cad" are provided and valid.'
    });
  }

  // Fetch exchange rate
  const exchangeRate = getExchangeRate(date, currency);

  if (!exchangeRate) {
    return res.status(404).send({
      error: 'Exchange rate not found for the given date and currency. Data only available for the year 2023'
    });
  }

  // Calculate the converted amount
  const amountInCurrency = parseFloat((amount_in_cad / exchangeRate).toFixed(3));

  // Send response
  res.status(200).send({
    date,
    currency,
    amount_in_cad,
    exchange_rate: exchangeRate,
    amount_in_currency: amountInCurrency
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});