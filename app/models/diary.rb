class Diary < ApplicationRecord
  validates :image, presence: true
  validates :post_date, presence: true
  validates :word, presence: true
	mount_uploader :image, ImageUploader

  def post_date
    d = read_attribute(:post_date)
    d.strftime('%a,%b %e,%Y') if d.present?
  end

  def materialize_font_path font: 'Roboto-Bold'
    File.join(Gem.loaded_specs['materialize-sass'].full_gem_path, 'app/assets/fonts/roboto/', "#{font}.ttf")
  end

  def genshin_font_path font: 'GenShinGothic-P-Bold'
    static_font_path font
  end

  def weather_font_path
    static_font_path 'weathericons-regular-webfont' 
  end

  def self.weather_mappings
		{
      '01d': { icon: 'wi-day-sunny', letter: '\f00d'}, 
      '01n': { icon: 'wi-night-clear', letter: '\f02e'},
      '02d': { icon: 'wi-day-cloudy', letter: '\f002'}, 
      '02n': { icon: 'wi-night-alt-cloudy', letter: '\f086'},
      '03d': { icon: 'wi-cloud', letter: '\f041'},
      '03n': { icon: 'wi-cloud', letter: '\f041'},
      '04d': { icon: 'wi-cloudy', letter: '\f013'},
      '04n': { icon: 'wi-cloudy', letter: '\f013'}, 
      '09d': { icon: 'wi-hail', letter: '\f015'},
      '09n': { icon: 'wi-hail', letter: '\f015'},
      '10d': { icon: 'wi-rain', letter: '\f019'}, 
      '10n': { icon: 'wi-rain', letter: '\f019'},
      '11d': { icon: 'wi-thunderstorm', letter: '\f01e'},
      '11n': { icon: 'wi-thunderstorm', letter: '\f01e'},
      '13d': { icon: 'wi-snow', letter: '\f01b'},
      '13n': { icon: 'wi-snow', letter: '\f01b'},
      '50d': { icon: 'wi-fog', letter: '\f014'},
      '50n': { icon: 'wi-fog', letter: '\f014' }
    }
  end

  private
  def static_font_path font
    File.join(Rails.root, 'public/font', "#{font}.ttf")
  end
end
