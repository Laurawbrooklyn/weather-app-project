$("form").on("submit", function(event) {

	event.preventDefault()
	var query = $("input").val()
	search(query)
	$("input").val('')
})

function search(query) {

	var url = "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=imperial&appid=bcfbfcaf752dc3dc0f4547e42bd0d35b"
	$(".js-weather").html('loading weather...')
	$.getJSON(url, function(response) {
		$(".js-weather").html('')
		var currentTemp = response.main.temp;
		var currentForecast = response.weather[0].main;
		var cityName = response.name;
		var currentHumidity = response.main.humidity;
		var currentWind = response.wind.speed;
		var weatherTable = (`
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
	$(".js-weather").append(weatherTable)
})
}

