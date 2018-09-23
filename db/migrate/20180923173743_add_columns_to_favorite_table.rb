class AddColumnsToFavoriteTable < ActiveRecord::Migration[5.2]
  def change
  	add_column :favorites, :full_name, :string
  	add_column :favorites, :url, :string
  	add_column :favorites, :version, :string 
  end
end
