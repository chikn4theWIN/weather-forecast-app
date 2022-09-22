var getCityInfo = "http://api.openweathermap.org/geo/1.0/direct?q=london&limit=1&appid=3e899aecdec7294393c72ce659cd2b48";
var displayCityName = document.querySelector("#display-city");
// Search function //
var displayMain = function() {
    var searchedCity = "#city".val().trim();
    
};

var city;
var cityInfo = [];

var getLatLong = function() {
    fetch(getCityInfo)
        .then((response) => response.json())
        .then(function(response) {
            var lat = response[0].lat;
            var lon = response[0].lon;   
            
            var latLon = {
                latitude: lat,
                longitude: lon
        }
            localStorage.setItem("city", JSON.stringify(latLon));
    })
}

  var getWeatherData = function() {
    var getInfo = localStorage.getItem("city");
    var getLatLon = JSON.parse(getInfo);
    var infoArray = [(getLatLon)];

    var cityURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + infoArray[0].latitude + "&lon=" + infoArray[0].longitude + "&appid=3e899aecdec7294393c72ce659cd2b48"
    fetch(cityURL)
        .then((response) => response.json())
        .then(function(response) {
            var temp = response.list[0].main.temp
            var wind = response.list[0].wind.speed
            var humidity = response.list[0].main.humidity
            var city = response.city.name

            var weatherInfo = {
                name: city,
                temprature: temp,
                wind: wind,
                humidity: humidity
            }

            localStorage.setItem("city", JSON.stringify(weatherInfo));
            console.log(weatherInfo);
        })    
    }

    var displayWeatherData = function () {
        
           var getName = localStorage.getItem("city");
           var getNameArr = (getName.name);
           (displayCityName).innerHTML = getNameArr;
    }

getLatLong();
getWeatherData();
displayWeatherData();

