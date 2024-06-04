const axios = require('axios');
const base_url = process.env.URL_ZOHO

// Import get billing service 
const get_service = require('./get_billings')

class main_service {

    constructor() {}

    async try_billings() 
    {
        try {
            const billing_service = new get_service(); 
            const findBillings = await billing_service.get_billings();
            
            // validate array length 
            if(findBillings.length > 0) 
            {
                for (let billing = 0; billing < findBillings.length; billing++) {
                    const element = findBillings[billing];

                    console.log(`Sending billing: ${element.DocumentoNumero}`)
                    const new_billing = {
                        "billing": element.ID
                    }

                    // Try to send Billing 
                    const response = await axios.post(`${base_url}/serverBilling`, new_billing)

                    if (response.data) {
                        console.log(`Billing created successfully ${JSON.stringify(response.data, null, 2)}`) 
                    }
                }

            }   
        } catch (error) {
            
            console.error(error); 

        }

    }
}

module.exports = main_service
