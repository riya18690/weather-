// API key to access the weather API
const API_KEY = "d572926af3b0439c90a123513241806";

// Get the input element where the user will type the city name
const searchBox = document.getElementById("cityInput");

// Get the button element that the user will click to fetch the weather
const searchButton = document.getElementById("fetchWeatherBtn");

// Get the element where the weather information will be displayed
const display = document.getElementById("weatherDisplay");

// Construct the base API address, with the API key included in the URL
const API_address = "http://api.weatherapi.com/v1/current.json?key=" + API_KEY + "&q=";

// Function to initialize the application
function init() {
    // Add an event listener to the button so that when it is clicked, the fetchWeather function is called
    searchButton.addEventListener('click', fetchWeather);
}

// Asynchronous function to fetch weather data based on the city input
async function fetchWeather() {
    // Get the value of the input field and remove any extra spaces
    const city = searchBox.value.trim();

    // If the input is empty, throw an error and stop further execution
    if (city === '') {
        throw "Please enter a city name";
        return;
    }

    // Create the full API URL by appending the city name to the base API address
    const API_Url = API_address + city;

    try {
        // Fetch the weather data from the API
        const response = await fetch(API_Url);

        // If the response is not okay (e.g., if the city is not found), throw an error
        if (!response.ok) {
            throw new Error('City not found');
        }

        // Convert the response data to JSON format
        const data = await response.json();

        // Call the function to display the weather data on the web page
        displayWeather(data);
    } catch (error) {
        // If an error occurs (e.g., network error or city not found), log an error message
        console.log("An error occurred");
    }
}

// Function to display the weather data on the web page
function displayWeather(data) {
    // Set the inner HTML of the display element to show the weather information
    display.innerHTML = `<h2>${data.location.name}</h2>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Feels like: ${data.current.feelslike_c}°C</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind Speed: ${data.current.wind_kph} m/s</p>
    `;
}

// Add an event listener to the document to run the init function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);