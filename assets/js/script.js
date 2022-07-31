// Psuedocode 
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var apiKey = "2dee45951d3010a3a0e002fc582e7cc5";

// sections from the document
var cityInput = document.querySelector('#city');
var submitBtn = document.querySelector('#submit');
var cityResults = document.querySelector('#repos-container');
var searchHistory = document.querySelector('#search-history');
var wIcon = document.querySelector('#wicon');


// function that handles the users input in the input box
var citySubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityInput.value.trim();

    if (cityName) {
        getCityRepos(cityName);

    }
}

// function that fetches the weather api
var getCityRepos = function () {

    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput.value.trim() + '&units=imperial&exclude=current&appid=' + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log("data^^^^^^^")
            var icon = data.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
            var rightNow = moment().format('L');
            // creating elements for the today research block
            var displayCity = document.createElement('h2');
            var displayTemp = document.createElement('p');
            var displayHumid = document.createElement('p');
            var displayWind = document.createElement('p');
            var displayUVI = document.createElement('p');
            // whats being displayed in the today block
            displayCity.textContent = data.name + ' (' + rightNow + ')';
            displayTemp.textContent = "Temp: " + data.main.temp + ' F';
            displayWind.textContent = "Wind: " + data.wind.speed + ' MPH';
            displayHumid.textContent = "Humidity: " + data.main.humidity + ' %';
            displayUVI.textContent = "UV Index: " + data.uvi;
            cityResults.append(displayCity);
            cityResults.append(displayTemp);
            cityResults.append(displayWind);
            cityResults.append(displayHumid);
            cityResults.append(displayUVI);
            cityResults.setAttribute('style', "border: 1px solid black;");
            wIcon.setAttribute('src', iconUrl); 
        })
        // saves the city to local storage
        .then(function (save) {
            localStorage.setItem('city', JSON.stringify(cityInput.value.trim()));
        })
    // .then(function (get) {
    //     var getHistory = localStorage.getItem('city');
    //     var displayHistory = document.createElement('p');


    //     displayHistory.textContent(getHistory);
    //     searchHistory.append(displayHistory);

    // })
}

// thought this would work for the 5 day forecast no luck, error codes 
// var get5Day = function () {

//     var multiDayApi = 'api.openweathermap.org/data/2.5/forecast?' + cityInput.value.trim() + '&appid=' + apiKey;

//     fetch(multiDayApi)
//         .then(function (response) {
//             console.log(response);
//             return response.json();
//         })
//         .then(data)
//         console.log(data);
// }

submitBtn.addEventListener('click', citySubmitHandler)
