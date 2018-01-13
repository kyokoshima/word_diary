class AddUserIdToDiaries < ActiveRecord::Migration[5.0]
  def change
    add_reference :diaries, :user, foreign_key: true
  end
end
