class AddStatusToDiary < ActiveRecord::Migration[5.0]
  def change
    add_column :diaries, :show_weather, :boolean
    add_column :diaries, :show_temp, :boolean
    add_column :diaries, :show_date, :boolean
  end
end
