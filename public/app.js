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

			output = (``)
			$(".rain-page").removeClass("hidden")
			$(".index-page").addClass("hidden")
			}).fail(function() {
				output = "Sorry we couldn't find that city, please try again!";
			}).always(function () {
				$(".js-weather").html('')
				$(".js-weather").append(output)

			})
		}
