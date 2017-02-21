class AddImageToDiaries < ActiveRecord::Migration[5.0]
  def change
    add_column :diaries, :image, :string
  end
end
