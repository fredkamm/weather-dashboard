var apiKey = "2dee45951d3010a3a0e002fc582e7cc5";

var cityInput = document.querySelector('#city');

var submitBtn = document.querySelector('#submit');

// function that fetches the weather api
var getCityRepos = function(city){
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Dallas&appid=' + apiKey;

    fetch(apiUrl)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
}

getCityRepos();