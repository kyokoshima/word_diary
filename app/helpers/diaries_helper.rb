module DiariesHelper
	def diary_image(diary, clz: nil, id: nil)
		if diary.image.present?
			image_tag diary.image.url, id: id, class: clz
		else
			image_tag 'noimage', id: id, class: clz
		end
	end
end
