const axios = require("axios");
const base_url = process.env.URL_ZOHO;

class get_billing_pending {
  constructor() {}

  // Method to get all pending billings
  async get_billings() {
    const billings = await axios.get(`${base_url}/billingTry`);
    return billings.data;
  }
}

module.exports = get_billing_pending;
