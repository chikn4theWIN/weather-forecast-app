// List for history.
var searchHistory = [];
// Returns the local storage search history back to user.
function getItems() {
    var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedCities !== null) {
        searchHistory = storedCities;
    };
    for (i = 0; i < searchHistory.length; i++) {
        if (i == 8) {
            break;
          }

        cityListButton = $("<a>").attr({
            class: "list-group-item list-group-item-action",
            href: "#"
        });
        
        cityListButton.text(searchHistory[i]);
        $(".list-group").append(cityListButton);
    }
};


var city;
var mainCard = $(".card-body");
// Run getItems.
getItems();
// Main card.
function getData() { 
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=3e899aecdec7294393c72ce659cd2b48" 
    mainCard.empty();
    $("#weeklyForecast").empty();
    // Request the API.
    $.ajax({
        url: queryURL,
        method: "GET"
        // Response function.
    }).then(function (response) {
        var date = moment().format(" MM/DD/YYYY");
        
        var iconCode = response.weather[0].icon;
    
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

        var name = $("<h3>").html(city + date);
 
        mainCard.prepend(name);
   
        mainCard.append($("<img>").attr("src", iconURL));
      
        var temp = Math.round((response.main.temp - 273.15) * 1.80 + 32);
        mainCard.append($("<p>").html("Temperature: " + temp + " &#8457")); 
        var humidity = response.main.humidity;
        mainCard.append($("<p>").html("Humidity: " + humidity)); 
        var windSpeed = response.wind.speed;
        mainCard.append($("<p>").html("Wind Speed: " + windSpeed)); 
       
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        
        // Call for the 5 day forecast.
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=3e899aecdec7294393c72ce659cd2b48", 
            method: "GET"
        // Display 5 separate columns in each day card.
        }).then(function (response) {
            for (i = 0; i < 5; i++) {
              
                var newCard = $("<div>").attr("class", "col fiveDay bg-primary text-white rounded-lg p-2");
                $("#weeklyForecast").append(newCard);
             
                var myDate = new Date(response.list[i * 8].dt * 1000);
   
                newCard.append($("<h4>").html(myDate.toLocaleDateString()));
    
                var iconCode = response.list[i * 8].weather[0].icon;
  
                var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

                newCard.append($("<img>").attr("src", iconURL));
   
                var temp = Math.round((response.list[i * 8].main.temp - 273.15) * 1.80 + 32);
     
                newCard.append($("<p>").html("Temp: " + temp + " &#8457")); 
       
                var humidity = response.list[i * 8].main.humidity;
 
                newCard.append($("<p>").html("Humidity: " + humidity));
            }
        })
    })
};