class Diary < ApplicationRecord
  validates :image, presence: true
  validates :post_date, presence: true
  validates :word, presence: true
	mount_uploader :image, ImageUploader
end
