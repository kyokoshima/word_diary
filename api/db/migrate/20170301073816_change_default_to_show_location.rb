class ChangeDefaultToShowLocation < ActiveRecord::Migration[5.0]
  def change
		change_column_default :diaries, :show_location, from: false, to: true
  end
end
