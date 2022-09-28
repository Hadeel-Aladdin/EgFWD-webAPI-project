/*jshint esversion: 9*/

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8022;
app.listen(port, ()=> {
  console.log('Hi from the server!☺');
});

weatherInfo = {};
app.post('/weather', (request, response) => {
    weatherInfo.desc = request.body.weatherDescription;
    weatherInfo.date = request.body.reqTime;
    weatherInfo.userMessage = request.body.content;
    console.log('POST request has been handeled succesfuly!!☻ thanks God ♥');
    console.log(weatherInfo);
    response.send(weatherInfo);
});

app.get('/display_data', (req, res) => {
  res.send(weatherInfo);
});
