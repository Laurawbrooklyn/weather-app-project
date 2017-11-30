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

		$(".rain-page").removeClass("hidden")
		$(".index-page").addClass("hidden")
		$("#location").append(cityName)
		$("#current-temp").append(currentTemp)
		$("#current-forecast").append(currentForecast)
		$("#current-humidity").append(currentHumidity)

		if (response.weather[0].main==="Clear"){
			$("#top-text").text('Go Outside')
			$('.rain-image').css("background-image", "url(/clear.png)");

		} else if (response.weather[0].main==="Rain"){
			$("#top-text").text('Stay Dry!')
			$('.rain-image').css("background-image", "url(/rain.jpg)");
		} else if (response.weather[0].main==="Snow"){
			$("#top-text").text('It is cold outside!')
			$('.rain-image').css("background-image", "url(/snowman.jpg)");
		}

			}).fail(function() {
				//output = "Sorry we couldn't find that city, please try again!";
			}).always(function () {
				//$(".js-weather").html('')
				//$(".js-weather").append(output)

			})
		}
