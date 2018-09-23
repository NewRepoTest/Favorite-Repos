Rails.application.routes.draw do
  get 'favorites/index'

  post 'github/:username' => 'favorites#github_request'
  post 'addfavorite/' => 'favorites#add_favorite'
  delete 'removefavorite/' => 'favorites#remove_favorite'
  root 'favorites#index'  
end
