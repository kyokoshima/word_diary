class ChangeDefaultToShows < ActiveRecord::Migration[5.0]
  def change
    change_column :diaries, :show_weather, :boolean, default: true
    change_column :diaries, :show_temp, :boolean, default: true
    change_column :diaries, :show_date, :boolean, default: true
    
  end
end
