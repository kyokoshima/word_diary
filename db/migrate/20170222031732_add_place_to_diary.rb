class AddPlaceToDiary < ActiveRecord::Migration[5.0]
  def change
    add_column :diaries, :place, :string
  end
end
