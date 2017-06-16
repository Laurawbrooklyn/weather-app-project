$("form").on("submit", function(event) {

	event.preventDefault()
	var query = $("input").val();
	var getForecast = $("#forecast").is(":checked");
	search(query); 

	if (getForecast) {
		// add in separate search for other query here
		searchForecast(query);
			function searchForecast(query) {
				var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + query + "&units=imperial&cnt=10&appid=bcfbfcaf752dc3dc0f4547e42bd0d35b";
				var forecastOutput = 'loading...';
				$(".js-weather").html(forecastOutput)
				$.getJSON(forecastUrl, function(response) {
					var dateOne = new Date(response.list[0].dt * 1000).toLocaleDateString();
					var dateTwo = new Date(response.list[1].dt * 1000).toLocaleDateString();
					var dateThree = new Date(response.list[2].dt * 1000).toLocaleDateString();
					var dateFour = new Date(response.list[3].dt * 1000).toLocaleDateString();
					var dateFive = new Date(response.list[4].dt * 1000).toLocaleDateString();
					var dateSix = new Date(response.list[5].dt * 1000).toLocaleDateString();
					var dateSeven = new Date(response.list[6].dt * 1000).toLocaleDateString();
					var tempOne = response.list[0].temp.day;
					var tempTwo = response.list[1].temp.day;
					var tempThree = response.list[2].temp.day;
					var tempFour = reponse.list[3].temp.day;
					var tempFive = response.list[4].temp.day;
					var tempSix = response.list[5].temp.day;
					var tempSeven = response.list[6].temp.day;
					console.log(tempOne)
					var forecastOne = response.list[0].weather.description;
					var forecastTwo = response.list[1].weather.description;
					var forecastThree = response.list[2].weather.description;
					var forecastFour = response.list[3].weather.description;
					var forecastFive = response.list[4].weather.description;
					var forecastSix = response.list[5].weather.description;
					var forecastSeven = response.list[6].weather.description;

					forecastOutput = (`
						<table> 
							<tr>
    							<th>Date</th>
    							<th>Day Temperature (F)</th>
   		 						<th>Weather Forecast</th>
  							</tr>
  							<tr>
    							<td>${dateOne}</td>
    							<td>${tempOne}</td>
    							<td>${forecastOne}</td>
  							</tr>
  							<tr>
    							<td>${dateTwo}</td>
    							<td>${tempTwo}</td>
    							<td>${forecastTwo}</td>
  							</tr>
  							<tr>
    							<td>${dateThree}</td>
    							<td>${tempThree}</td>
    							<td>${forecastThree}</td>
  							</tr>
  							<tr>
    							<td>${dateFour}</td>
    							<td>${tempFour}</td>
    							<td>${forecastFour}</td>
  							</tr>
  							<tr>
    							<td>${dateFive}</td>
    							<td>${tempFive}</td>
    							<td>${forecastFive}</td>
  							</tr>
  							<tr>
    							<td>${dateSix}</td>
    							<td>${tempSix}</td>
    							<td>${forecastSix}</td>
  							</tr>
  							<tr>
    							<td>${dateSeven}</td>
    							<td>${tempSeven}</td>
    							<td>${forecastSeven}</td>
  							</tr>
  				`)
				})
			}
	}
	$("input").val('')
})

function search(query) {
	var url = "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=imperial&appid=bcfbfcaf752dc3dc0f4547e42bd0d35b";
	var output = 'loading...';
	$(".js-weather").html(output)

	$.getJSON(url, function(response) {

		var currentTemp = response.main.temp;
		var currentForecast = response.weather[0].main;
		var cityName = response.name;
		var currentHumidity = response.main.humidity;
		var currentWind = response.wind.speed;
		output = (`
			<table> 
				<tr>
    				<th>City Name</th>
    				<th>Current Temperature (F)</th>
   		 			<th>Current Weather Forecast</th>
   		 			<th>Relative Humidity (%)</th>
   		 			<th>Wind Speed (mph)</th>
  				</tr>
  				<tr>
    				<td>${cityName}</td>
    				<td>${currentTemp}</td>
    				<td>${currentForecast}</td>
    				<td>${currentHumidity}</td>
    				<td>${currentWind}</td>
  				</tr>
  				`)
	
}).fail(function() {
//TODO Working on a more robust error response to handle when a city name is bad
		output = "Sorry we couldn't find that city, please try again!";
  }).always(function () {
  	$(".js-weather").html('') 
  	$(".js-weather").append(output)
 
  })
}

//Need to implement change to api to test out the 10 day forecast data
//New URL needs to be added
//Variables need to be changed to match new URL responses for extended forecast data
//Decide How to handle 10 day data (i.e. add a new button and new table
//How to handle unix date code conversion for 10 day forecast
