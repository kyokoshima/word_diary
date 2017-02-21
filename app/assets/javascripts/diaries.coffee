# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
	readURL = (input) ->
		if input.files && input.files[0]
			reader = new FileReader()
			
			reader.onload = (e) ->
				$('#preview').attr 'src', e.target.result
			reader.readAsDataURL input.files[0]

	$('#diary_image').change ->
		readURL(this)

	$('#diary_word').on 'keyup', ->
		$('#preview-word').text $(this).val()
	
	[lastLat, lastLon, lastTemp, lastIcon] = ''
	if navigator.geolocation and $('.preview-container')
		url = 'http://api.openweathermap.org/data/2.5/weather'
		key = '317b5b5a2c782dd1b7aab1c82867e90c'
		watchId = navigator.geolocation.watchPosition (position) ->
			lat = position.coords.latitude
			lon = position.coords.longitude
			[lastLat ,lastLon] = [lat, lon]

			$.ajax url,
				type: 'get',
				data: {
					appid: key,
					lat: lat,
					lon: lon,
					units: 'metric'
				}
			.done (response, status, xhr) ->
				console.log response
				$('#preview-place').text response.name
				temp = "#{Math.round response.main.temp}℃"
				$('#preview-temp').text temp
				$('#diary_temperature').val temp
				
				weather = response.weather[0]
				icon = weather.icon
				$('#preview-weather img').attr({src: "http://openweathermap.org/img/w/#{icon}.png"})
				$('#diary_weather').val weather.main
			.fail (xhr, status, error) ->
				console.log error
			.always (data, status, error) ->
				console.log status
		, (error) ->
			console.log error		
  post_date = moment().format("ddd, MMM do YYYY")
  $('#preview-date').text(post_date)
  $('#diary_post_date').val(post_date)
  Materialize.toast $('#notice').text(), 3000 if $('#notice').text()
  Materialize.toast $('#error').text(), 3000 if $('#error').text()
  $('.button-collapse').sideNav({
      menuWidth: 200,
      edge: 'right',
      draggable: true
      })
