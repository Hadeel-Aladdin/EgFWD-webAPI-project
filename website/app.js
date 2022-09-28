/*jshint esversion:9*/

/* Global Variables */
const zipCode = document.querySelector('#zip');
const generateButton = document.querySelector('button');
const tempDev = document.querySelector('#temp');
const dateDev = document.querySelector('#date');
const contentDev = document.querySelector('#content');
const userInput = document.querySelector('#feelings');
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const units = ',us&units=metric';
const appId = '&appid=16224570a9ccfad1925c37bdb68f5edb';

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();

// Function to ckeck if the zip code is empty and return the url
function ckeckZip(value) {
    if (value.trim().length === 0 || !(parseInt(value))) {
        return false;
    }
    return baseUrl + value + units + appId;
}

generateButton.addEventListener("click", () => {
    generateButton.style.backgroundColor = 'rgb(81, 115, 79)';
    zipValue = zipCode.value;
    // zipCode.value = '';
    // console.log('what is wrong?!');
    // console.log(zipValue, Number.isInteger(zipValue));
    // console.log(zipValue, parseInt(zipValue));
    let url = ckeckZip(zipValue);
    if (url === false) {
        alert('Please enter a valid zip code');
    }
    else {
        processZip(String(url)).then((obj) => {
            postData('/weather', obj);
        }).then(()=>{
            updateUI();
        });
    }
});

const processZip = async (url = '') => {
    // console.log(url);
    const response = await fetch(url);
    // console.log('what is going on?');
    const weatherData = await response.json();
    // console.log(weatherData);
    if (weatherData.cod != 200){
        alert(weatherData.message);
    }
    else {
        weatherDescription = weatherData.name+', '+ weatherData.main.temp + ' degree, ' + weatherData.weather[0].description;
        reqTime = newDate + ', at ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        content = userInput.value;
        return {weatherDescription, reqTime, content};
    }
};




const postData = async ( url = '', data = {})=>{

      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  };

// Function to display input into the GUI
const updateUI = async () => {
  const response = await fetch('/display_data');
  const data = await response.json();
  tempDev.innerHTML = data.desc;
  dateDev.innerHTML = data.date;
  contentDev.innerHTML = data.userMessage;
};
