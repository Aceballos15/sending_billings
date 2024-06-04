const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config()
const cron = require('node-cron');

// Create a new express app 
const app = express();
const PORT = process.env.PORT || 5000;


//Middleware instalation 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

// Import main service 
const main_service = require('./src/services/main_service')

// Function to execute the cron 
const myScheduleTask = async() => {
    console.log('Executing task');
    const new_service = new main_service
    await new_service.try_billings()
}

// Programing and configuration cron 
cron.schedule('10 * * * *', async () => {
    console.log(`Starting cron`)
    await myScheduleTask();
  });

const allRouters = require('./src/Routers/main_router'); 
app.use("/API", allRouters); 


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
