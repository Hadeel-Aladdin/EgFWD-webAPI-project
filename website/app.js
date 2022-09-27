/*jshint esversion:9*/

/* Global Variables */
const zipCode = document.querySelector('#zip');
const generateButton = document.querySelector('button');
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const units = ',us&units=metric';
const appId = '&appid=16224570a9ccfad1925c37bdb68f5edb';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
let zipValue = 0;

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
    zipCode.value = '';
    // console.log('what is wrong?!');
    // console.log(zipValue, Number.isInteger(zipValue));
    // console.log(zipValue, parseInt(zipValue));
    let url = ckeckZip(zipValue);
    if (url === false) {
        alert('Please enter a valid zip code');
    }
    else {
        processZip(String(url));
        // sitTimeOut(() => {generateButton.style.backgroundColor = '#3a5a40';},5000);
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
        console.log(weatherData);
        //alert(weatherData);
    }
};
