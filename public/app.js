$(".search-button").on("click", function(event) {
	event.preventDefault()
	var query = $("input").val();
	search(query);
})

function search(query) {
	var url = "/data/2.5/weather?q=" + query + "&units=imperial&appid=bcfbfcaf752dc3dc0f4547e42bd0d35b";
	var output = 'loading...';
	$(".js-weather").html(output)

	$.getJSON(url, function(response) {

		console.log(response)
		var currentTemp = Math.round(response.main.temp);
		var currentForecast = response.weather[0].main;
		var cityName = response.name;
		var currentHumidity = response.main.humidity;

		$("#location").append(cityName)
		$("#current-temp").append(currentTemp)
		$("#current-forecast").append(currentForecast)
		$("#current-humidity").append(currentHumidity)

		if (currentForecast==="Rain"){
			$("#top-text").text('Stay Dry!')
			$('.weather-image').css("background-image", "url(/rain.jpg)");
		} else if (currentForecast==="Snow"){
			$("#top-text").text('Enjoy the snow!')
			$('.weather-image').css("background-image", "url(/snowman.jpg)");
		} else if (currentTemp <= 69 && "Clear" && currentTemp >= 40){
			$("#top-text").text('Time to go outside!')
			$('.weather-image').css("background-image", "url(/clear.png)")
		} else if (currentTemp >= 70 && "Clear") {
			$("#top-text").text('Enjoy the sunshine!')
			$('.weather-image').css("background-image", "url(/sunshine.jpg)")
		} else if (currentTemp < 40) {
			$("#top-text").text('It is cold outside!')
			$('.weather-image').css("background-image", "url(/cold.jpg)")
		} else {
			$("#top-text").text('Enjoy the weather!')
			$(".weather-image").css("background-image", "url(/sky.jpg)");
		}

		$(".weather-page").removeClass("hidden")
		$(".index-page").addClass("hidden")

	}).fail(function() {
		//output = "Sorry we couldn't find that city, please try again!";
	}).always(function () {
		//$(".js-weather").html('')
		//$(".js-weather").append(output)

	})
}
