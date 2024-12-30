// Import required modules
const csv = require('jquery-csv');
const fs = require('fs');

// Path to the CSV file
const filePath = './exchange_rates.csv';

// Read the CSV file
fs.readFile(filePath, 'utf8', (err, fileData) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  // Remove BOM if it exists
  const cleanData = fileData.replace(/^\uFEFF/, ''); // Removes the BOM

  // Configure parser options
  const options = {
    separator: ',', // Default separator (adjust if needed)
    delimiter: '"', // Default quote character
    skipEmptyLines: true, // Skip empty lines
    trim: true // Remove leading/trailing whitespace
  };

  try {
    // Parse CSV data to objects
    const parsedData = csv.toObjects(cleanData, options);

    // Output all objects
    //console.log('Parsed Data:', parsedData);

    // Print a single line (e.g., the first line of data)
    const singleLine = parsedData[0]; 
    console.log('Single Line:', singleLine);

  } catch (parseError) {
    console.error('Error parsing CSV:', parseError.message);
  }

  
})
/*
  const cleanCSV = fileData.replace(/(\r\n|\r|\n)/g, '\n').trim();
  // Parse CSV data to objects
  const parsedData = csv.toObjects(cleanCSV, fileData);

  // Example: Output all objects
  console.log('Parsed Data:', parsedData);

  // Example: Extracting specific data
  const getExchangeRate = (currency) =>
    parsedData.find((row) => row.Currency === currency)?.Rate || null;

  console.log('Exchange rate for USD:', getExchangeRate('USD'));
  console.log('Exchange rate for EUR:', getExchangeRate('EUR'));

  });

*/