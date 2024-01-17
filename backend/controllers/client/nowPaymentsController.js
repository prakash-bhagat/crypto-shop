const NowPaymentsApi = require('@nowpaymentsio/nowpayments-api-js');
const axios = require('axios');

const config = {
  method: 'get',
maxBodyLength: Infinity,
  url: `${process.env.NOW_URL}merchant/coins`,
  headers: { 
    'x-api-key': `${process.env.NOW_PAYMENTS}`
  }
};

const api = new NowPaymentsApi({ apiKey: process.env.NOW_PAYMENTS }) // your api key
async function getCurrencies() {
  const { currencies } = await api.getCurrencies()
  .then(currency=>{
    return currency;
  })
}


module.exports = {getCurrencies}