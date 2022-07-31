var apiKey = "2dee45951d3010a3a0e002fc582e7cc5";

var cityInput = document.querySelector('#city');
var submitBtn = document.querySelector('#submit');
var cityResults = document.querySelector('#repos-container');


var citySubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityInput.value.trim();

    if (cityName) {
        getCityRepos(cityName);
    }
}

// function that fetches the weather api
var getCityRepos = function(){

    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput.value.trim() + '&units=imperial&exclude=current&appid=' + apiKey;

    fetch(apiUrl)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log("data \n ---------")
        console.log(data);
        // for (var i = 0; i < data.length; i++) {
            var displayCity = document.createElement('h2');
            var displayTemp = document.createElement('p');
            var displayHumid = document.createElement('p');
            var displayWind = document.createElement('p');
            var displayUVI = document.createElement('p');
            displayCity.textContent = data.name;
            displayTemp.textContent = "Temp: " + data.main.temp + ' F';
            displayWind.textContent = "Wind: " + data.wind.speed + ' MPH';
            displayHumid.textContent = "Humidity: " + data.main.humidity + ' %';
            displayUVI.textContent = "UV Index: " + data.uvi;
            cityResults.append(displayCity);
            cityResults.append(displayTemp);
            cityResults.append(displayHumid);
            cityResults.append(displayWind);
            cityResults.append(displayUVI);
        // }
    })
}

submitBtn.addEventListener('click', citySubmitHandler)

// function displayTime() {
//     var rightNow = moment().format('L');
//     var displayDate = document.createElement('h2');
//     displayDate.textContent(rightNow);
//     cityResults.append(displayDate);
//   }