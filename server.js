/*jshint esversion: 9*/

// Setup empty JS object to act as endpoint for all routes
weatherInfo = {};

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
app.listen(port, () => {
    // Feedback to test that the server is running
    console.log('Hello from the server!☺');
});

// Handel GET requests
app.get('/display_data', (req, res) => {
    // Test the GET method is working
    console.log('Ther is a GET request');
    res.send(weatherInfo);
});

// Handel POST requests
app.post('/weather', (request, response) => {
    // Check the request weather data if it 'undefined' (in case of there is no city with
    // this zip code) or not to handel this case before it gose to the
    // client-side as weatherInfo.desc = 'undefined'
    if (request.body.weatherDescription) {
        weatherInfo.desc = request.body.weatherDescription;
    }
    else {
        weatherInfo.desc = '';
    }
    weatherInfo.date = request.body.reqTime;
    weatherInfo.userMessage = request.body.content;
    // Test the POST method is working
    console.log('There is a sPOST request has been handeled succesfuly!!☻ thanks God ♥');
    console.log(weatherInfo);
    response.send(weatherInfo);
});
