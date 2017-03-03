class AddShowLocationToDiary < ActiveRecord::Migration[5.0]
  def change
    add_column :diaries, :show_location, :boolean
  end
end
