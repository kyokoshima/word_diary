class AddWeatherIconToDiary < ActiveRecord::Migration[5.0]
  def change
    add_column :diaries, :weather_icon, :string
  end
end
