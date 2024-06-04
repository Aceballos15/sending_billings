const axios = require("axios");
const base_url = process.env.URL_ZOHO;
const base_soenac = process.env.URL_SOENAC;

// Import get billing service
const get_service = require("./get_billings");

class main_service {
  constructor() {}

  async try_billings() {
    try {
      const billing_service = new get_service();
      const findBillings = await billing_service.get_billings();

      // Validate array length
      if (findBillings.length > 0) {
        for (let billing = 0; billing < findBillings.length; billing++) {
          const element = findBillings[billing];

          console.log(`Sending billing: ${element.DocumentoNumero}`);
          const new_billing = {
            billing: element.ID,
          };

          try {
            // Try to send Billing
            const response = await axios.post(
              `${base_url}/serverBilling`,
              new_billing
            );

            if (response.data) {
              console.log(
                `Billing created successfully ${JSON.stringify(
                  response.data,
                  null,
                  2
                )}`
              );
            }
          } catch (error) {
            console.error(
              `Error sending billing ${element.DocumentoNumero}: `,
              error.message
            );
            // Optionally, you can add more error handling logic here, like retrying the request
          }
        }
      }
    } catch (error) {
      console.error("Error fetching billings:", error.message);
    }
  }

  async resend_billings(data) {
    try {

        console.log(`Processing billings: ${data.idFactura}`);

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.private_token,
        },
      };

      const response_soenac = await axios.post(`${base_soenac}/invoice`, data.json, config);
      if (response_soenac.data && response_soenac.status === 200) {

        if (response_soenac.data.is_valid === true) {
            try {
                const new_billing = {
                    billing: data.idFactura,
                  };

                // Try to send Billing
                const response = await axios.post(
                  `${base_url}/serverBilling`,
                  new_billing
                );
    
                if (response.data) {
                  console.log(
                    `Billing created successfully ${JSON.stringify(
                      response.data.status_message,
                      null,
                      2
                    )}`
                  );
                }
              } catch (error) {
                console.error(
                  `Error sending billing ${data.idFactura}: `,
                  error.message
                );
              }
        }
      }
    } catch (error) {
        console.error(
            `Error sending billing ${data.idFactura}: `,
            error.message
          );
    }
  }
}

module.exports = main_service;
