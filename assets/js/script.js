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

// variables for the 1 day out block
var dateOneD = document.querySelector('#onedayDate')
var wIconOneD = document.querySelector('#onedayWicon');
var tempOneD = document.querySelector('#onedayTemp');
var windOneD = document.querySelector('#onedayWind');
var humOneD = document.querySelector('#onedayHum');
// variable for the 2 day out block
var dateTwoD = document.querySelector('#twodayDate')
var wIconTwoD = document.querySelector('#twodayWicon');
var tempTwoD = document.querySelector('#twodayTemp');
var windTwoD = document.querySelector('#twodayWind');
var humTwoD = document.querySelector('#twodayHum');
// variable for the 3 day out block
var dateThreeD = document.querySelector('#threedayDate')
var wIconThreeD = document.querySelector('#threedayWicon');
var tempThreeD = document.querySelector('#threedayTemp');
var windThreeD = document.querySelector('#threedayWind');
var humThreeD = document.querySelector('#threedayHum');
// variable for the 4 day out block
var dateFourD = document.querySelector('#fourdayDate')
var wIconFourD = document.querySelector('#fourdayWicon');
var tempFourD = document.querySelector('#fourdayTemp');
var windFourD = document.querySelector('#fourdayWind');
var humFourD = document.querySelector('#fourdayHum');
// variable for the 5 day out block
var dateFiveD = document.querySelector('#fivedayDate')
var wIconFiveD = document.querySelector('#fivedayWicon');
var tempFiveD = document.querySelector('#fivedayTemp');
var windFiveD = document.querySelector('#fivedayWind');
var humFiveD = document.querySelector('#fivedayHum');


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
            return response.json();
        })
        .then(function (data) {
            var icon = data.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
            var rightNow = moment().format('L');
            // creating elements for the today research block
            var displayCity = document.createElement('h2');
            // whats being displayed in the today block
            displayCity.textContent = data.name + ' (' + rightNow + ')';
            cityResults.append(displayCity);
            wIcon.setAttribute('src', iconUrl);
            cityResults.setAttribute('style', "border: 1px solid black;");

            // setting up the new api that can retrieve 5-day
            var lat = data.coord.lat;
            var lon = data.coord.lon
            console.log(lat, lon)
            var newApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey;
            // fetching the new api
            fetch(newApi)
                .then(function (newresponse) {
                    console.log(newresponse);
                    return newresponse.json();
                })
                .then(function (newdata) {
                    console.log(newdata);
                    var displayTemp = document.createElement('p');
                    var displayHumid = document.createElement('p');
                    var displayWind = document.createElement('p');
                    var displayUVI = document.createElement('p');
                    displayTemp.textContent = "Temp: " + newdata.current.temp + ' F';
                    displayWind.textContent = "Wind: " + newdata.current.wind_speed + ' MPH';
                    displayHumid.textContent = "Humidity: " + newdata.current.humidity + ' %';
                    displayUVI.textContent = "UV Index: " + newdata.current.uvi;
                    cityResults.append(displayTemp);
                    cityResults.append(displayWind);
                    cityResults.append(displayHumid);
                    cityResults.append(displayUVI);
                    // display one day out results
                    var onedayOut = newdata.daily[1]
                    var oneDayIcon = onedayOut.weather[0].icon;
                    var oneUrl = "http://openweathermap.org/img/w/" + oneDayIcon + ".png";
                    tempOneD.textContent = "Temp " + onedayOut.temp.day + 'F';
                    windOneD.textContent  = "Wind " + onedayOut.wind_speed + 'MPH';
                    humOneD.textContent = "Humidity " + onedayOut.humidity + "%"
                    wIconOneD.setAttribute('src', oneUrl);
                    // display two day out results
                    var twodayOut = newdata.daily[2]
                    var twoDayIcon = twodayOut.weather[0].icon;
                    var twoUrl = "http://openweathermap.org/img/w/" + oneDayIcon + ".png";
                    tempTwoD.textContent = "Temp " + twodayOut.temp.day + 'F';
                    windTwoD.textContent  = "Wind " + twodayOut.wind_speed + 'MPH';
                    humTwoD.textContent = "Humidity " + twodayOut.humidity + "%"
                    wIconTwoD.setAttribute('src', twoUrl);
                    // display three day out results
                    var threedayOut = newdata.daily[3]
                    var threeDayIcon = threedayOut.weather[0].icon;
                    var threeUrl = "http://openweathermap.org/img/w/" + threeDayIcon + ".png";
                    tempThreeD.textContent = "Temp " + threedayOut.temp.day + 'F';
                    windThreeD.textContent  = "Wind " + threedayOut.wind_speed + 'MPH';
                    humThreeD.textContent = "Humidity " + threedayOut.humidity + "%"
                    wIconThreeD.setAttribute('src', threeUrl);
                    // display four day out results
                    var fourdayOut = newdata.daily[4]
                    var fourDayIcon = threedayOut.weather[0].icon;
                    var fourUrl = "http://openweathermap.org/img/w/" + fourDayIcon + ".png";
                    tempFourD.textContent = "Temp " + fourdayOut.temp.day + 'F';
                    windFourD.textContent  = "Wind " + fourdayOut.wind_speed + 'MPH';
                    humFourD.textContent = "Humidity " + fourdayOut.humidity + "%"
                    wIconFourD.setAttribute('src', fourUrl);
                    // display five day out results
                    var fivedayOut = newdata.daily[5]
                    var fiveDayIcon = fivedayOut.weather[0].icon;
                    var fiveUrl = "http://openweathermap.org/img/w/" + fiveDayIcon + ".png";
                    tempFiveD.textContent = "Temp " + fivedayOut.temp.day + 'F';
                    windFiveD.textContent  = "Wind " + fivedayOut.wind_speed + 'MPH';
                    humFiveD.textContent = "Humidity " + fivedayOut.humidity + "%"
                    wIconFiveD.setAttribute('src', fiveUrl);
                })
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
