module DiariesHelper
	def diary_image(diary, clz: nil, id: nil)
		if diary.image.present?
			image_tag diary.image.square.url, id: id, class: clz
		else
			image_tag 'noimage', id: id, class: clz
		end
	end

	def weather_icon icon
		klz = weather_mappings
		content_tag :i, nil, class: ['wi', klz[icon]]
	end
	def weather_mappings
		{'01d': 'wi-day-sunny', '01n': 'wi-night-clear', '02d': 'wi-day-cloudy', '02n': 'wi-night-alt-cloudy', '03d': 'wi-cloud', '03n': 'wi-cloud', '04d':'wi-cloudy', '04n': 'wi-cloudy', '09d': 'wi-hail','09n': 'wi-hail',  '10d': 'wi-rain','10d': 'wi-rain', '11d': 'wi-thunderstorm','11n': 'wi-thunderstorm', '13d': 'wi-snow', '13n':'wi-snow','50d': 'wi-fog', '50n': 'wi-fog' }
	end
end
