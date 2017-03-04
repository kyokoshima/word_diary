module DiariesHelper
	def diary_image(diary, origin: false, clz: nil, id: nil)
		if diary.image.present?
      url = origin ? diary.image.url : diary.image.square.url
      image_tag url, id: id, class: clz
		else
			image_tag 'noimage', id: id, class: clz
		end
	end

	def weather_icon icon
		klz = ['wi']
    klz <<  weather_mappings[icon.to_sym][:icon] if icon.present?
		content_tag :i, nil, class: ['wi', klz]
	end
	def weather_mappings
    Diary.weather_mappings
	end
end
