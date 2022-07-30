var apiKey = "2dee45951d3010a3a0e002fc582e7cc5";

var cityInput = document.querySelector('#city');

var submitBtn = document.querySelector('#submit');


var citySubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityInput.value.trim();

    if (cityName) {
        getCityRepos(cityName);
    }
}

// function that fetches the weather api
var getCityRepos = function(city){
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput.value.trim() +'&appid=' + apiKey;

    fetch(apiUrl)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
}

submitBtn.addEventListener('click', citySubmitHandler)