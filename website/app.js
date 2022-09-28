/*jshint esversion:9*/

/* Global Variables */
// Declare the form and the user input fields
const form = document.querySelector('#query');
const zipCode = document.querySelector('#zip');
const userInput = document.querySelector('#feelings');

// Declare UI elements to be updated
const tempDev = document.querySelector('#temp');
const dateDev = document.querySelector('#date');
const contentDev = document.querySelector('#content');

// Define standerd parts of the URL
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const units = ',us&units=imperial';
const appId = '&appid=16224570a9ccfad1925c37bdb68f5edb';

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();


/* Helper Functions */
// Function to ckeck if the zip code is empty and return the completed URL
function ckeckZip(value) {
    if (value.trim().length === 0 || !(parseInt(value))) {
        return false;
    }
    return baseUrl + value + units + appId;
}


/* Global Functions */
// Function to GET weather data from the website
const processZip = async (url = '') => {
    const response = await fetch(url);
    const weatherData = await response.json();
    // Ckeck if there is a city with this zip code or not, or if there is any other problem
    if (weatherData.cod != 200) {
        alert(weatherData.message);
    }
    else {
        // Prepare the object to send to the local server
        weatherDescription = weatherData.name + ', ' + weatherData.main.temp + ' degree, ' + weatherData.weather[0].description;
        reqTime = newDate + ', at ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        content = userInput.value;
        return { weatherDescription, reqTime, content };
    }
};

// Function to send a POST request
const postData = async (url = '', data = {}) => {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
};

// Function to display fetched data into the GUI
const updateUI = async () => {
    // GET data from the local server
    const response = await fetch('/display_data');
    const data = await response.json();
    // Check the returned weather data if the response.json().desc is empty or not
    // to display an appropriate output to the user
    try {
        if (data.desc) {
            tempDev.innerHTML = data.desc;
            dateDev.innerHTML = data.date;
            contentDev.innerHTML = data.userMessage;
        }
        else {
            // Remove tempDev and dateDev vulues to prevent override on them in case of
            // submitting the form twice with a wrong zip code without refreshing the page
            tempDev.innerHTML = '';
            dateDev.innerHTML = '';
            // Desplay a message to inform the user what to do in this case
            contentDev.innerHTML = 'Try another zip code ☺';
        }
    }
    catch(error){
        alert(error);
    }
};

// Add event listener to the form to send our requests
form.addEventListener("submit", (event) => {
    // To prevent submitting the form
    event.preventDefault();
    // Get the zip code entered
    zipValue = zipCode.value;
    // Call our function to concatenate the final URL
    let url = ckeckZip(zipValue);
    // Check the returned value of checkZip()
    if (url === false) {
        alert('Please enter a valid zip code');
    }
    else {
        // Send our requests in the following order:
        // First: send a GET request to WeatherApp Map website to get the weather data
        processZip(String(url)).then((obj) => {
            // Second: send a POST request to the local server to save weather data
            postData('/weather', obj);
        }).then(() => {
            // Third and finally: send a GET request to the local server
            // to get what we POSTed so far and updating the UI with retrieved data
            updateUI();
        });
    }
});
