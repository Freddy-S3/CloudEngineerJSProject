// ---- Step 1: Parse the CSV File ---- 
const csv = require('jquery-csv');
const fs = require('fs');

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

        // Update global array
        exchangeRates.length = 0;
        parsedData.forEach((row) => {
          exchangeRates.push({
            date: row.REF_DATE,
            currency: row['Type of currency'],
            rate: parseFloat(row.VALUE)
          });
        });

        //console.log('Parsed exchange rates:', exchangeRates); // Debugging to see data
        resolve(exchangeRates);
      } catch (parseError) {
        reject('Error parsing CSV:', parseError.message);
      }
    });
  });
}

module.exports = { loadExchangeRates, exchangeRates };