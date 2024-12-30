const express = require('express');
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Define the endpoint
app.get('/convert', (req, res) => {
  const { date, currency, amount_in_cad } = req.body;

  // Validation for required parameters
  if (!date || !currency || typeof amount_in_cad !== 'number') {
    return res.status(400).send({
      error: 'Missing or invalid parameters. Ensure "date", "currency", and "amount_in_cad" are provided and valid.'
    });
  }

  // Log the request data (for debugging purposes)
  console.log('Request received:', { date, currency, amount_in_cad });
  


  // Continue processing (e.g., calculating the converted amount)
  
  res.status(200).send({ message: 'Request accepted for processing.' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});