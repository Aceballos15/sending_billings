const { Router } = require("express");
const router = Router();

const mainService = require("../services/main_service");

router.post('/send_billing', async (req, res) => {
    
    const data = JSON.parse(req.body); 
    const new_service = new mainService();
    await new_service.resend_billings(data); 

    res.status(200).send("Billing received")
    
})



module.exports = router;