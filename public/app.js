$(".search-button").on("click", function(event) {
	event.preventDefault()
	var query = $("input").val();
	search(query);
})

function search(query) {
	var url = "/data/2.5/weather?q=" + query + "&units=imperial&appid=bcfbfcaf752dc3dc0f4547e42bd0d35b";

	$.getJSON(url, function(response) {
		var currentTemp = Math.round(response.main.temp);
		var currentForecast = response.weather[0].main;
		var cityName = response.name;
		var currentHumidity = response.main.humidity;

		$("#location").append(cityName)
		$("#current-temp").append(currentTemp)
		$("#current-forecast").append(currentForecast)
		$("#current-humidity").append(currentHumidity)

		var headerText;
		var image;
		if (currentForecast==="Rain"){
			headerText = 'Stay Dry!';
			image="rain.jpg";
		} else if (currentForecast==="Snow"){
			headerText = 'Enjoy the snow!';
			image="snowman.jpg";
		} else if (currentTemp <= 69 && "Clear" && currentTemp >= 40){
			headerText = 'Time to go outside!';
			image="clear.jpg";
		} else if (currentTemp >= 70 && currentForecast==="Clear") {
			headerText = 'Enjoy the sunshine!';
			image="sunshine.jpg";
		} else if (currentTemp < 40) {
			headerText = 'It is cold outside!';
			image="cold.jpg";
		} else {
			headerText = 'Enjoy the weather!';
			image="sky.jpg";
		}

		$("#top-text").text(headerText)
		$('.weather-image').css("background-image", `url(/images/${image})`)
		$(".weather-page").removeClass("hidden")
		$(".index-page").addClass("hidden")

// TRYING TO GET NEW BUTTON TO WORK BY CLICKING TO MAKE WEATHER PAGE HIDDEN & ADD INDEX PAGE BACK"
		// $(".search-button").click(function() {
		// 		$(".weather-page").addClass("hidden")
		// 		$(".index-page").removeClass("hidden")
		// 	});

	}).fail(function() {
		$("#home-text-bottom").text("Sorry please try another location!")
	})
}
