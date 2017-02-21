class AddPostDateToDiary < ActiveRecord::Migration[5.0]
  def change
    add_column :diaries, :post_date, :datetime
  end
end
