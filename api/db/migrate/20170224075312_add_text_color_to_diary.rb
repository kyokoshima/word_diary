class AddTextColorToDiary < ActiveRecord::Migration[5.0]
  def change
    add_column :diaries, :text_color, :string, default: '#ffffff'
  end
end
