// ---- Step 3 & 4: Response and error handling ----
const { exchangeRates } = require('./csvParser');

// Function to get exchange rate by date and currency
function getExchangeRate(date, currency) {
  const rate = exchangeRates.find(
    (row) => row.date === date && row.currency === currency
  );
  return rate ? rate.rate : null;
}

function handleResponse(req, res) {
  const { date, currency, amount_in_cad } = req.body;

  // Validation for required parameters
  if (!date || !currency || typeof amount_in_cad !== 'number') {
    return res.status(400).send({
      error: 'Missing or invalid parameters. Make sure "date", "currency", and "amount_in_cad" are provided and valid.'
    });
  }

  const exchangeRate = getExchangeRate(date, currency);
  const validDates = exchangeRates.map(row => row.date);
  const validCurrencies = Array.from(new Set(exchangeRates.map(row => row.currency)));

  // Possible error messages
  if (!validDates.includes(date) && !validCurrencies.includes(currency)) {
    return res.status(404).send({
      error: 'Both the provided date and currency are invalid.',
      available_currencies: validCurrencies,
      dates: 'Data only available for the year 2023'
    });
  }

  if (!validDates.includes(date)) {
    return res.status(404).send({
      error: 'The provided date is out of range or invalid.',
      dates: 'Data only available for the year 2023'
    });
  }

  if (!validCurrencies.includes(currency)) {
    return res.status(404).send({
      error: 'The provided currency is invalid or not supported.',
      available_currencies: validCurrencies
    });
  }

  if (!exchangeRate) {
    return res.status(404).send({
      error: 'Exchange rate not found for the given date and currency.'
    });
  }

  const amountInCurrency = parseFloat((amount_in_cad / exchangeRate).toFixed(3));

  res.status(200).send({
    date,
    currency,
    amount_in_cad,
    exchange_rate: exchangeRate,
    amount_in_currency: amountInCurrency
  });
}

module.exports = handleResponse;