class Diary < ApplicationRecord
  validates :image, presence: true
  validates :post_date, presence: true
  validates :word, presence: true
	mount_uploader :image, ImageUploader

  def materialize_font_path font: 'Roboto-Bold'
    File.join(Gem.loaded_specs['materialize-sass'].full_gem_path, 'app/assets/fonts/roboto/', "#{font}.ttf")
  end

  def genshin_font_path font: 'GenShinGothic-P-Bold'
    File.join(Rails.root, 'public/font', "#{font}.ttf")
  end
end
