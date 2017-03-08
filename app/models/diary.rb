class Diary < ApplicationRecord
  belongs_to :user
  validates :image, presence: true
  validates :post_date, presence: true
  validates :word, presence: true
	mount_uploader :image, ImageUploader

  def post_date
    d = read_attribute(:post_date)
    d.strftime('%a,%b %d,%Y') if d.present?
  end

  def materialize_font_path font: 'Roboto-Bold'
    File.join(Gem.loaded_specs['materialize-sass'].full_gem_path, 'app/assets/fonts/roboto/', "#{font}.ttf")
  end

  def genshin_font_path font: 'GenShinGothic-P-Heavy'
    static_font_path font
  end

  def weather_font_path
    static_font_path 'weathericons-regular-webfont' 
  end

  def weather_icon_letter
    if weather_icon.present?
      code = Diary.weather_mappings[weather_icon.to_sym][:letter] 
      [code].pack("U*")
    end
  end
  def self.weather_mappings
		{
      '01d': { icon: 'wi-day-sunny', letter: 0xf00d}, 
      '01n': { icon: 'wi-night-clear', letter: 0xf02e},
      '02d': { icon: 'wi-day-cloudy', letter: 0xf002}, 
      '02n': { icon: 'wi-night-alt-cloudy', letter: 0xf086},
      '03d': { icon: 'wi-cloud', letter: 0xf041},
      '03n': { icon: 'wi-cloud', letter: 0xf041},
      '04d': { icon: 'wi-cloudy', letter: 0xf013},
      '04n': { icon: 'wi-cloudy', letter: 0xf013}, 
      '09d': { icon: 'wi-hail', letter: 0xf015},
      '09n': { icon: 'wi-hail', letter: 0xf015},
      '10d': { icon: 'wi-rain', letter: 0xf019}, 
      '10n': { icon: 'wi-rain', letter: 0xf019},
      '11d': { icon: 'wi-thunderstorm', letter: 0xf01e},
      '11n': { icon: 'wi-thunderstorm', letter: 0xf01e},
      '13d': { icon: 'wi-snow', letter: 0xf01b},
      '13n': { icon: 'wi-snow', letter: 0xf01b},
      '50d': { icon: 'wi-fog', letter: 0xf014},
      '50n': { icon: 'wi-fog', letter: 0xf014 }
    }
  end

  private
  def static_font_path font
    File.join(Rails.root, 'public/font', "#{font}.ttf")
  end
end
