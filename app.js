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
//		var weatherString = "";
		var currentTemp = response.main.temp;
		var currentForecast = response.weather[0].description;
		var cityName = response.name;
		var currentHumidity = response.main.humidity;
		var currentWind = response.wind.speed;
		//used parantheses to show string is multi-line
		var testString = (`
//			<p> The current temperature in ${cityName} is ${currentTemp} degrees Fahrenheit. </p>
//			<p> The current weather forecast is: ${currentForecast}. </p>
//			<p> The relative humity is ${currentHumidity}% and the wind speed is ${currentWind} miles per hour. </p>
  			`);
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
//used concatenation to make the weather string easier to see
//	weatherString+= "<h3>" + "The current temperature in " + cityName + " is " + currentTemp + " degrees Fahrenheit." + "</h3>"
//	weatherString+= "<h3>" + "The current weather is " + currentForecast + " ." + "</h3>"
//	weatherString+= "<h3>" + "The relative humidity is " + currentHumidity + "% and the wind speed is " + currentWind + " miles per hour." + "</h3>";
	$(".js-weather").append(weatherTable)
})
}

