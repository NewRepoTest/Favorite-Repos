class AddMoreColumnsToFavorites < ActiveRecord::Migration[5.2]
  def change
  	add_column :favorites, :language, :string
  	remove_column :favorites, :text
  	remove_column :favorites, :title
  end
end
