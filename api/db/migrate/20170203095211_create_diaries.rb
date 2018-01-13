class CreateDiaries < ActiveRecord::Migration[5.0]
  def change
    create_table :diaries do |t|
      t.string :word
      t.string :weather
      t.decimal :temperature

      t.timestamps
    end
  end
end
